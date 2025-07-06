import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CheckoutComponent from '../components/payments/CheckoutComponent';
import { PaymentOrder } from '../services/paymentService';
import { ShoppingCart, CreditCard, Smartphone, MessageCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { personas } from '../personas';

// Demo checkout page component
const DemoCheckout: React.FC = () => {
  const navigate = useNavigate();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);
  
  const demoOrder: PaymentOrder = {
    id: `DEMO-${Date.now()}`,
    amount: 87.50,
    currency: 'USD',
    description: 'Demo E-commerce Order',
    customerEmail: selectedPersona.email,
    customerPhone: selectedPersona.phone,
    items: [
      {
        name: 'Premium Cotton T-Shirt',
        quantity: 2,
        price: 25.00,
      },
      {
        name: 'Designer Denim Jeans',
        quantity: 1,
        price: 37.50,
      },
    ],
  };

  const handlePaymentSuccess = (details: any, method: string) => {
    console.log('Demo payment successful:', { details, method });
    setOrderCompleted(true);
    setTimeout(() => {
      navigate('/payments');
    }, 3000);
  };

  const handlePaymentError = (error: any) => {
    console.error('Demo payment failed:', error);
    // In a real app, you'd show error handling
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your demo payment has been processed successfully.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to payments dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto mb-6">
        <label className="block text-gray-700 font-medium mb-2">Choose a Persona:</label>
        <select
          className="w-full border rounded px-3 py-2 mb-2"
          value={selectedPersona.id}
          onChange={e => setSelectedPersona(personas.find(p => p.id === e.target.value) || personas[0])}
        >
          {personas.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.description})</option>
          ))}
        </select>
      </div>
      <CheckoutComponent
        order={demoOrder}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        onBack={() => navigate('/payments')}
      />
    </div>
  );
};

// Main demo page component
const PaymentDemo: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CreditCard,
      title: 'PayPal Integration',
      description: 'Secure international payments with PayPal\'s trusted platform',
      color: 'bg-blue-500',
    },
    {
      icon: Smartphone,
      title: 'Zimbabwe Mobile Money',
      description: 'EcoCash, OneMoney, and TeleCash payments via Paynow',
      color: 'bg-green-500',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Marketplace',
      description: 'Send orders and payment links directly via WhatsApp',
      color: 'bg-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/payments')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              <span>Back to Payments</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Payment Demo</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Gateway Integration Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our integrated payment solution with PayPal and Paynow (Zimbabwe mobile money), 
            plus WhatsApp marketplace functionality. Designed for Zimbabweans worldwide - from Harare to London, 
            New York to Sydney!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Demo Order Card */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Try the Demo Checkout
          </h2>
          
          <div className="max-w-md mx-auto">
            {/* Sample Order */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Sample Order</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Premium Cotton T-Shirt × 2</span>
                  <span className="font-medium">$50.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Designer Denim Jeans × 1</span>
                  <span className="font-medium">$37.50</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">$87.50</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/demo/checkout')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Start Demo Checkout</span>
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              This is a demo environment. No real payments will be processed.
            </p>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">PayPal Demo</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Uses PayPal Sandbox environment</li>
              <li>• Test with sandbox buyer accounts</li>
              <li>• Secure payment processing</li>
              <li>• Real-time confirmation</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">Paynow Demo</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Zimbabwe mobile money integration</li>
              <li>• Supports EcoCash, OneMoney, TeleCash</li>
              <li>• USSD payment flow simulation</li>
              <li>• Real-time status checking</li>
            </ul>
          </div>
        </div>

        {/* WhatsApp Integration Info */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-3">
            <MessageCircle className="w-6 h-6 text-emerald-600 mt-1" />
            <div>
              <h3 className="font-semibold text-emerald-900 mb-2">WhatsApp Marketplace Integration - Global Reach</h3>
              <p className="text-sm text-emerald-800 mb-3">
                Connect with Zimbabweans worldwide through WhatsApp Business API integration:
              </p>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• 🌍 International phone number support (diaspora-friendly)</li>
                <li>• 📱 Automatic order confirmation messages</li>
                <li>• 🔗 Direct payment links via WhatsApp</li>
                <li>• 💬 Customer support integration</li>
                <li>• 🏪 Mobile-first marketplace approach</li>
                <li>• 🇿🇼 Serving Zimbabweans from Harare to worldwide</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Routes wrapper
const PaymentDemoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PaymentDemo />} />
      <Route path="/checkout" element={<DemoCheckout />} />
    </Routes>
  );
};

export default PaymentDemoRoutes;
