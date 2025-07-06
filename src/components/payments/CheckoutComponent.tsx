import { useState } from 'react';
import { CreditCard, Smartphone, MessageCircle, ArrowLeft } from 'lucide-react';
import PayPalPayment from './PayPalPayment';
import PaynowPayment from './PaynowPayment';
import WhatsAppIntegration from './WhatsAppIntegration';
import { PaymentOrder } from '../../services/paymentService';
import { toast } from 'react-toastify';

interface CheckoutComponentProps {
  order: PaymentOrder;
  onPaymentSuccess: (details: any, method: string) => void;
  onPaymentError: (error: any) => void;
  onBack?: () => void;
}

type PaymentMethod = 'paypal' | 'mobile' | 'whatsapp';

const CheckoutComponent: React.FC<CheckoutComponentProps> = ({
  order,
  onPaymentSuccess,
  onPaymentError,
  onBack,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const paymentMethods = [
    {
      id: 'paypal' as const,
      name: 'PayPal',
      description: 'Pay securely with PayPal',
      icon: CreditCard,
      color: 'bg-blue-600',
      available: true,
    },
    {
      id: 'mobile' as const,
      name: 'Mobile Money',
      description: 'EcoCash, OneMoney, TeleCash',
      icon: Smartphone,
      color: 'bg-green-600',
      available: true,
    },
    {
      id: 'whatsapp' as const,
      name: 'WhatsApp Order',
      description: 'Send order via WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600',
      available: true,
    },
  ];

  const handlePaymentSuccess = (details: any, method: string) => {
    toast.success(`Payment completed successfully via ${method}!`);
    onPaymentSuccess(details, method);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    onPaymentError(error);
  };

  const renderPaymentMethod = () => {
    switch (selectedMethod) {
      case 'paypal':
        return (
          <PayPalPayment
            order={order}
            onSuccess={(details) => handlePaymentSuccess(details, 'PayPal')}
            onError={handlePaymentError}
            onCancel={() => setSelectedMethod(null)}
          />
        );
      case 'mobile':
        return (
          <PaynowPayment
            order={order}
            onSuccess={(details) => handlePaymentSuccess(details, 'Mobile Money')}
            onError={handlePaymentError}
          />
        );
      case 'whatsapp':
        return (
          <WhatsAppIntegration
            order={order}
            customerPhone={order.customerPhone}
          />
        );
      default:
        return null;
    }
  };

  if (selectedMethod) {
    return (
      <div className="checkout-container max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedMethod(null)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {paymentMethods.find(m => m.id === selectedMethod)?.name} Payment
          </h2>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>${order.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Component */}
        {renderPaymentMethod()}
      </div>
    );
  }

  return (
    <div className="checkout-container max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-0 top-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Total</h3>
              <p className="text-lg font-bold text-gray-900">
                ${order.amount.toFixed(2)} {order.currency}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => method.available && setSelectedMethod(method.id)}
              disabled={!method.available}
              className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                method.available
                  ? 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  : 'border-gray-100 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${method.color} text-white`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{method.name}</h3>
                  <p className="text-gray-600">{method.description}</p>
                  {!method.available && (
                    <p className="text-sm text-red-500 mt-1">Coming Soon</p>
                  )}
                </div>
                <div className="text-gray-400">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Customer Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Customer Information</h3>
        <div className="text-sm text-blue-800">
          <p><strong>Email:</strong> {order.customerEmail}</p>
          {order.customerPhone && (
            <p><strong>Phone:</strong> {order.customerPhone}</p>
          )}
          <p><strong>Order ID:</strong> {order.id}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
