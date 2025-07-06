import { useState } from 'react';
import { PaymentOrder, PaynowService, PaynowPaymentData } from '../../services/paymentService';
import { toast } from 'react-toastify';
import { Smartphone, Clock } from 'lucide-react';

interface PaynowPaymentProps {
  order: PaymentOrder;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

const PaynowPayment: React.FC<PaynowPaymentProps> = ({
  order,
  onSuccess,
  onError,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'ecocash' | 'onemoney' | 'telecash'>('ecocash');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'checking'>('idle');

  const paymentMethods = [
    {
      id: 'ecocash' as const,
      name: 'EcoCash',
      icon: Smartphone,
      color: 'bg-green-500',
    },
    {
      id: 'onemoney' as const,
      name: 'OneMoney',
      icon: Smartphone,
      color: 'bg-blue-500',
    },
    {
      id: 'telecash' as const,
      name: 'TeleCash',
      icon: Smartphone,
      color: 'bg-purple-500',
    },
  ];

  const handlePayment = async () => {
    if (!order.customerPhone) {
      toast.error('Phone number is required for mobile payments');
      return;
    }

    setIsLoading(true);
    setPaymentStatus('pending');

    try {
      const paymentData: PaynowPaymentData = {
        reference: order.id,
        amount: order.amount,
        email: order.customerEmail,
        phone: order.customerPhone,
        method: selectedMethod,
        returnUrl: `${window.location.origin}/payment-success`,
        resultUrl: `${window.location.origin}/api/paynow/result`,
      };

      const response = await PaynowService.initiatePayment(paymentData);
      
      if (response.status === 'Ok') {
        // Redirect to payment page
        window.location.href = response.redirectUrl;
        
        // Start polling for payment status
        setTimeout(() => {
          checkPaymentStatus(response.pollUrl);
        }, 5000);
      } else {
        throw new Error(response.error || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment initiation failed');
      setPaymentStatus('idle');
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (pollUrl: string) => {
    setPaymentStatus('checking');
    
    try {
      const statusResponse = await PaynowService.checkPaymentStatus(pollUrl);
      
      if (statusResponse.status === 'Paid') {
        toast.success('Payment completed successfully!');
        onSuccess(statusResponse);
        setPaymentStatus('idle');
      } else if (statusResponse.status === 'Cancelled' || statusResponse.status === 'Failed') {
        toast.error('Payment failed or cancelled');
        onError(statusResponse);
        setPaymentStatus('idle');
      } else {
        // Continue polling
        setTimeout(() => {
          checkPaymentStatus(pollUrl);
        }, 5000);
      }
    } catch (error) {
      console.error('Status check error:', error);
      setTimeout(() => {
        checkPaymentStatus(pollUrl);
      }, 10000); // Retry after 10 seconds
    }
  };

  return (
    <div className="paynow-payment-container space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Pay with Mobile Money
        </h3>
        <p className="text-gray-600">
          Total Amount: <span className="font-bold">${order.amount.toFixed(2)}</span>
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-2 rounded-full ${method.color} text-white`}>
                  <Icon size={24} />
                </div>
                <span className="font-medium text-gray-900">{method.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Payment Status */}
      {paymentStatus !== 'idle' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="text-blue-500 animate-spin" size={20} />
            <div>
              <h4 className="font-medium text-blue-900">
                {paymentStatus === 'pending' ? 'Processing Payment...' : 'Checking Payment Status...'}
              </h4>
              <p className="text-sm text-blue-700">
                {paymentStatus === 'pending' 
                  ? 'You will be redirected to complete the payment.'
                  : 'Please wait while we verify your payment.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={isLoading || paymentStatus !== 'idle'}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isLoading || paymentStatus !== 'idle'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processing...</span>
          </div>
        ) : (
          `Pay with ${paymentMethods.find(m => m.id === selectedMethod)?.name}`
        )}
      </button>

      <div className="text-xs text-gray-500 text-center">
        <p>
          By proceeding, you agree to the terms and conditions of {paymentMethods.find(m => m.id === selectedMethod)?.name}.
        </p>
      </div>
    </div>
  );
};

export default PaynowPayment;
