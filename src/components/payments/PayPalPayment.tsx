import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PaymentOrder, PayPalService } from '../../services/paymentService';
import { toast } from 'react-toastify';

interface PayPalPaymentProps {
  order: PaymentOrder;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  onCancel?: () => void;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({
  order,
  onSuccess,
  onError,
  onCancel,
}) => {
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async () => {
    try {
      const orderData = await PayPalService.createOrder(order);
      return orderData.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      toast.error('Failed to create PayPal order');
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const details = await PayPalService.captureOrder(data.orderID);
      toast.success('Payment completed successfully!');
      onSuccess(details);
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      toast.error('Payment capture failed');
      onError(error);
    }
  };

  const onErrorHandler = (error: any) => {
    console.error('PayPal error:', error);
    toast.error('PayPal payment failed');
    onError(error);
  };

  const onCancelHandler = () => {
    toast.info('Payment cancelled');
    onCancel?.();
  };

  return (
    <div className="paypal-payment-container">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onErrorHandler}
          onCancel={onCancelHandler}
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;
