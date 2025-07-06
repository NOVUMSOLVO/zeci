import axios from 'axios';

// PayPal Configuration
export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'your-paypal-client-id';

// Paynow Configuration
export const PAYNOW_INTEGRATION_ID = import.meta.env.VITE_PAYNOW_INTEGRATION_ID || 'your-paynow-integration-id';
export const PAYNOW_INTEGRATION_KEY = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY || 'your-paynow-integration-key';

// Types
export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerPhone?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface PaynowPaymentData {
  reference: string;
  amount: number;
  email: string;
  phone?: string;
  method: 'ecocash' | 'onemoney' | 'telecash';
  returnUrl: string;
  resultUrl: string;
}

export interface WhatsAppMessage {
  phone: string;
  message: string;
  orderId: string;
}

// PayPal Service
export class PayPalService {
  static async createOrder(orderData: PaymentOrder) {
    try {
      const response = await axios.post('/api/paypal/create-order', {
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: orderData.id,
            amount: {
              currency_code: orderData.currency,
              value: orderData.amount.toFixed(2),
            },
            description: orderData.description,
            items: orderData.items.map(item => ({
              name: item.name,
              quantity: item.quantity.toString(),
              unit_amount: {
                currency_code: orderData.currency,
                value: item.price.toFixed(2),
              },
            })),
          },
        ],
      });
      return response.data;
    } catch (error) {
      console.error('PayPal create order error:', error);
      throw error;
    }
  }

  static async captureOrder(orderId: string) {
    try {
      const response = await axios.post(`/api/paypal/capture-order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('PayPal capture order error:', error);
      throw error;
    }
  }
}

// Paynow Service
export class PaynowService {
  static async initiatePayment(paymentData: PaynowPaymentData) {
    try {
      const response = await axios.post('/api/paynow/initiate', {
        integration_id: PAYNOW_INTEGRATION_ID,
        integration_key: PAYNOW_INTEGRATION_KEY,
        reference: paymentData.reference,
        amount: paymentData.amount,
        email: paymentData.email,
        phone: paymentData.phone,
        method: paymentData.method,
        return_url: paymentData.returnUrl,
        result_url: paymentData.resultUrl,
      });
      return response.data;
    } catch (error) {
      console.error('Paynow payment initiation error:', error);
      throw error;
    }
  }

  static async checkPaymentStatus(pollUrl: string) {
    try {
      const response = await axios.get(`/api/paynow/status?poll_url=${encodeURIComponent(pollUrl)}`);
      return response.data;
    } catch (error) {
      console.error('Paynow status check error:', error);
      throw error;
    }
  }
}

// WhatsApp Service
export class WhatsAppService {
  static generateOrderMessage(order: PaymentOrder): string {
    const itemsList = order.items
      .map(item => `• ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    return `
🛍️ *New Order Confirmation*

*Order ID:* ${order.id}
*Total Amount:* $${order.amount.toFixed(2)}

*Items:*
${itemsList}

*Customer Email:* ${order.customerEmail}
${order.customerPhone ? `*Phone:* ${order.customerPhone}` : ''}

🌍 *Serving Zimbabweans Worldwide* 🇿🇼
Thank you for your order! We'll process it shortly.

For any inquiries, please reply to this message.
    `.trim();
  }

  static generatePaymentLink(orderId: string, amount: number): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/checkout/${orderId}?amount=${amount}`;
  }

  static async sendOrderNotification(message: WhatsAppMessage): Promise<void> {
    try {
      // For WhatsApp Business API integration
      await axios.post('/api/whatsapp/send-message', {
        to: message.phone,
        message: message.message,
        orderId: message.orderId,
      });
    } catch (error) {
      console.error('WhatsApp message send error:', error);
      throw error;
    }
  }

  static openWhatsAppChat(phone: string, message: string): void {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}

// Payment Processing Service
export class PaymentProcessor {
  static async processPayment(
    orderData: PaymentOrder,
    paymentMethod: 'paypal' | 'ecocash' | 'onemoney' | 'telecash'
  ) {
    try {
      switch (paymentMethod) {
        case 'paypal':
          return await PayPalService.createOrder(orderData);
        
        case 'ecocash':
        case 'onemoney':
        case 'telecash':
          const paynowData: PaynowPaymentData = {
            reference: orderData.id,
            amount: orderData.amount,
            email: orderData.customerEmail,
            phone: orderData.customerPhone,
            method: paymentMethod,
            returnUrl: `${window.location.origin}/payment-success`,
            resultUrl: `${window.location.origin}/api/paynow/result`,
          };
          return await PaynowService.initiatePayment(paynowData);
        
        default:
          throw new Error('Unsupported payment method');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }
}
