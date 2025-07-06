import { useState } from 'react';
import { MessageCircle, Send, Phone, Copy } from 'lucide-react';
import { WhatsAppService, PaymentOrder } from '../../services/paymentService';
import { toast } from 'react-toastify';

interface WhatsAppIntegrationProps {
  order: PaymentOrder;
  customerPhone?: string;
}

const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({
  order,
  customerPhone,
}) => {
  const [phone, setPhone] = useState(customerPhone || '');
  const [customMessage, setCustomMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultMessage = WhatsAppService.generateOrderMessage(order);
  const paymentLink = WhatsAppService.generatePaymentLink(order.id, order.amount);

  const handleSendMessage = async () => {
    if (!phone.trim()) {
      toast.error('Please enter a phone number');
      return;
    }

    const message = customMessage.trim() || defaultMessage;
    
    setIsLoading(true);
    try {
      // For development, we'll use the direct WhatsApp link
      // In production, you'd use the WhatsApp Business API
      WhatsAppService.openWhatsAppChat(phone, `${message}\n\n🔗 Payment Link: ${paymentLink}`);
      
      toast.success('WhatsApp chat opened successfully!');
      
      // Optionally, track the message send via API
      // await WhatsAppService.sendOrderNotification({
      //   phone,
      //   message: `${message}\n\n🔗 Payment Link: ${paymentLink}`,
      //   orderId: order.id,
      // });
      
    } catch (error) {
      console.error('WhatsApp send error:', error);
      toast.error('Failed to send WhatsApp message');
    } finally {
      setIsLoading(false);
    }
  };

  const copyPaymentLink = () => {
    navigator.clipboard.writeText(paymentLink);
    toast.success('Payment link copied to clipboard!');
  };

  const copyMessage = () => {
    const message = customMessage.trim() || defaultMessage;
    navigator.clipboard.writeText(`${message}\n\n🔗 Payment Link: ${paymentLink}`);
    toast.success('Message copied to clipboard!');
  };

  const formatPhoneNumber = (value: string) => {
    // Remove non-numeric characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // If it starts with +, keep it as international format
    if (cleaned.startsWith('+')) {
      return cleaned;
    }
    
    // If it's a Zimbabwe number without country code, add 263
    if (cleaned.startsWith('0') && cleaned.length <= 10) {
      return `+263${cleaned.slice(1)}`;
    } else if (!cleaned.startsWith('263') && cleaned.length <= 9) {
      return `+263${cleaned}`;
    } else if (cleaned.startsWith('263')) {
      return `+${cleaned}`;
    }
    
    // For other international numbers, add + if missing
    if (!cleaned.startsWith('+') && cleaned.length > 10) {
      return `+${cleaned}`;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  return (
    <div className="whatsapp-integration bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-green-500 p-2 rounded-full">
          <MessageCircle className="text-white" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          WhatsApp Order Notification
        </h3>
      </div>

      {/* Phone Number Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Phone Number (International Format)
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+263771234567 or +1234567890"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Examples: +263771234567 (Zimbabwe), +1234567890 (USA), +447700900123 (UK)
        </p>
        <p className="text-xs text-blue-600 mt-1">
          ✨ Supporting Zimbabweans worldwide - enter any international number!
        </p>
      </div>

      {/* Message Preview */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message Preview
        </label>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
            {customMessage.trim() || defaultMessage}
          </pre>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-sm text-blue-600">🔗 Payment Link: {paymentLink}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={copyMessage}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
          >
            <Copy size={14} />
            <span>Copy Message</span>
          </button>
          <button
            onClick={copyPaymentLink}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
          >
            <Copy size={14} />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* Custom Message */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Message (Optional)
        </label>
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Enter a custom message or leave blank to use the default"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleSendMessage}
          disabled={!phone.trim() || isLoading}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            !phone.trim() || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Send size={16} />
          )}
          <span>Send via WhatsApp</span>
        </button>
      </div>

      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="text-sm font-medium text-green-800 mb-1">How it works:</h4>
        <ul className="text-xs text-green-700 space-y-1">
          <li>• Click "Send via WhatsApp" to open WhatsApp with the order details</li>
          <li>• Works with any international phone number (Zimbabwe diaspora welcome!)</li>
          <li>• Customer receives order information and payment link</li>
          <li>• They can choose between PayPal or mobile money payments</li>
          <li>• You'll be notified when the payment is completed</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;
