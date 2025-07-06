import { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Smartphone,
  Banknote,
  RefreshCw
} from 'lucide-react';
import CheckoutComponent from '../components/payments/CheckoutComponent';
import { PaymentOrder } from '../services/paymentService';
import { usePersona } from '../PersonaContext';

const Payments = () => {
  const { persona } = usePersona();
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Demo order data
  const demoOrder: PaymentOrder = {
    id: `ORDER-${Date.now()}`,
    amount: 125.50,
    currency: 'USD',
    description: 'Sample E-commerce Order',
    customerEmail: persona.email,
    customerPhone: persona.phone,
    items: [
      {
        name: 'Premium T-Shirt',
        quantity: 2,
        price: 25.00,
      },
      {
        name: 'Designer Jeans',
        quantity: 1,
        price: 75.50,
      },
    ],
  };

  const paymentStats = [
    {
      name: 'Total Revenue',
      value: '$12,847.50',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'PayPal Payments',
      value: '$4,234.75',
      change: '+22.1%',
      changeType: 'positive',
      icon: CreditCard,
    },
    {
      name: 'EcoCash Payments',
      value: '$6,456.25',
      change: '+18.2%',
      changeType: 'positive',
      icon: Smartphone,
    },
    {
      name: 'OneMoney Payments',
      value: '$2,156.50',
      change: '+8.7%',
      changeType: 'positive',
      icon: Smartphone,
    },
  ];

  const handlePaymentSuccess = (details: any, method: string) => {
    console.log('Payment successful:', { details, method });
    setShowCheckout(false);
    // Here you would typically update your backend, show success message, etc.
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    // Handle payment error
  };

  if (showCheckout) {
    return (
      <CheckoutComponent
        order={demoOrder}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  const transactions = [
    {
      id: 'TXN-001',
      orderId: 'ORD-001',
      customer: 'John Mukamuri',
      amount: 125.00,
      method: 'EcoCash',
      status: 'completed',
      date: '2024-01-15T10:30:00',
      reference: 'EC123456789',
      fee: 1.25,
    },
    {
      id: 'TXN-002',
      orderId: 'ORD-002',
      customer: 'Mary Chikwanha',
      amount: 89.50,
      method: 'OneMoney',
      status: 'completed',
      date: '2024-01-14T14:15:00',
      reference: 'OM987654321',
      fee: 0.90,
    },
    {
      id: 'TXN-003',
      orderId: 'ORD-003',
      customer: 'David Moyo',
      amount: 245.00,
      method: 'EcoCash',
      status: 'processing',
      date: '2024-01-13T09:45:00',
      reference: 'EC111222333',
      fee: 2.45,
    },
    {
      id: 'TXN-004',
      orderId: 'ORD-004',
      customer: 'Grace Sithole',
      amount: 67.25,
      method: 'Cash on Delivery',
      status: 'pending',
      date: '2024-01-12T16:20:00',
      reference: 'COD-001',
      fee: 0.00,
    },
    {
      id: 'TXN-005',
      orderId: 'ORD-005',
      customer: 'Peter Macheka',
      amount: 189.99,
      method: 'EcoCash',
      status: 'failed',
      date: '2024-01-11T11:10:00',
      reference: 'EC444555666',
      fee: 0.00,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'EcoCash':
      case 'OneMoney':
        return <Smartphone className="w-4 h-4" />;
      case 'Cash on Delivery':
        return <Banknote className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="mt-2 text-gray-600">Track payments and manage financial transactions</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button
              onClick={() => setShowCheckout(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Demo Checkout
            </button>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            <button 
              className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
              onClick={() => setShowExportModal(true)}
            >
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {paymentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-zim-green-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-zim-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`w-4 h-4 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`ml-1 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className="ml-1 text-sm text-gray-500">vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Methods Integration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">EcoCash Integration</h3>
              <p className="text-sm opacity-90">Econet's Mobile Money</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transaction Fee:</span>
              <span>1.0%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Settlement:</span>
              <span>T+1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">OneMoney Integration</h3>
              <p className="text-sm opacity-90">NetOne's Mobile Money</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transaction Fee:</span>
              <span>1.0%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Settlement:</span>
              <span>T+1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Cash on Delivery</h3>
              <p className="text-sm opacity-90">Traditional Payment</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Banknote className="w-6 h-6" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transaction Fee:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Settlement:</span>
              <span>On Delivery</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                <option>All Methods</option>
                <option>EcoCash</option>
                <option>OneMoney</option>
                <option>Cash on Delivery</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                <option>All Status</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.orderId}</div>
                      <div className="text-xs text-gray-400">{transaction.reference}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${transaction.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMethodIcon(transaction.method)}
                      <span className="ml-2 text-sm text-gray-900">{transaction.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1 capitalize">{transaction.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(transaction.date).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${transaction.fee.toFixed(2)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Export Payment Data</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 3 months</option>
                    <option value="365">Last year</option>
                    <option value="custom">Custom range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-zim-green-600 focus:ring-zim-green-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Transaction details</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-zim-green-600 focus:ring-zim-green-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Customer information</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-zim-green-600 focus:ring-zim-green-500" />
                      <span className="ml-2 text-sm text-gray-700">Fee breakdown</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => setShowExportModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
                  onClick={() => {
                    console.log('Export started');
                    setShowExportModal(false);
                    // Simulate export
                    setTimeout(() => {
                      alert('Export completed! File downloaded.');
                    }, 1000);
                  }}
                >
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;