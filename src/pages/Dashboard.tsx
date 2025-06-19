import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Truck
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      name: 'Total Revenue',
      value: '$12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'Orders',
      value: '247',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      name: 'Customers',
      value: '1,429',
      change: '+15.1%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Products',
      value: '89',
      change: '-2.1%',
      changeType: 'negative',
      icon: Package,
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Mukamuri', amount: '$125.00', status: 'delivered', payment: 'EcoCash' },
    { id: 'ORD-002', customer: 'Mary Chikwanha', amount: '$89.50', status: 'processing', payment: 'OneMoney' },
    { id: 'ORD-003', customer: 'David Moyo', amount: '$245.00', status: 'shipped', payment: 'EcoCash' },
    { id: 'ORD-004', customer: 'Grace Sithole', amount: '$67.25', status: 'pending', payment: 'Cash' },
  ];

  const topProducts = [
    { name: 'Samsung Galaxy A54', sales: 45, revenue: '$13,500' },
    { name: 'Nivea Body Lotion Set', sales: 89, revenue: '$2,670' },
    { name: 'iPhone 14 Pro', sales: 23, revenue: '$22,080' },
    { name: 'Maybelline Makeup Kit', sales: 67, revenue: '$3,350' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
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
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`ml-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
                <span className="ml-1 text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-zim-green-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-zim-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-500">{order.payment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-zim-gold-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-zim-gold-800">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-zim-green-500 to-zim-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Payment Gateway</h3>
              <p className="text-sm opacity-90">EcoCash & OneMoney Integration</p>
            </div>
            <CreditCard className="w-8 h-8" />
          </div>
          <div className="mt-4">
            <button 
              className="bg-white text-zim-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              onClick={() => navigate('/payments')}
            >
              View Transactions
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zim-gold-500 to-zim-gold-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Delivery Tracking</h3>
              <p className="text-sm opacity-90">Real-time logistics updates</p>
            </div>
            <Truck className="w-8 h-8" />
          </div>
          <div className="mt-4">
            <button 
              className="bg-white text-zim-gold-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              onClick={() => navigate('/orders')}
            >
              Track Orders
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Customer Insights</h3>
              <p className="text-sm opacity-90">CRM & Analytics Dashboard</p>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="mt-4">
            <button 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              onClick={() => navigate('/analytics')}
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">System Update Available</h4>
            <p className="text-sm text-yellow-700">New features for mobile money integration are ready for deployment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;