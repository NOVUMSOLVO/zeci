import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Calendar,
  Eye,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [showExportModal, setShowExportModal] = useState(false);

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$12,847.50',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'vs previous period',
    },
    {
      title: 'Orders',
      value: '247',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      description: 'vs previous period',
    },
    {
      title: 'Customers',
      value: '1,429',
      change: '+15.1%',
      changeType: 'positive',
      icon: Users,
      description: 'active customers',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.3%',
      changeType: 'negative',
      icon: TrendingUp,
      description: 'visitors to customers',
    },
  ];

  const salesData = [
    { month: 'Jan', revenue: 8500, orders: 165 },
    { month: 'Feb', revenue: 9200, orders: 180 },
    { month: 'Mar', revenue: 7800, orders: 152 },
    { month: 'Apr', revenue: 10500, orders: 205 },
    { month: 'May', revenue: 11200, orders: 218 },
    { month: 'Jun', revenue: 12847, orders: 247 },
  ];

  const topProducts = [
    { name: 'Samsung Galaxy A54 5G', revenue: 13500, percentage: 25.2 },
    { name: 'iPhone 14 Pro', revenue: 22080, percentage: 18.5 },
    { name: 'Nivea Body Lotion Set', revenue: 2670, percentage: 15.8 },
    { name: 'Maybelline Makeup Kit', revenue: 3350, percentage: 12.4 },
    { name: 'African Print Dress', revenue: 3015, percentage: 10.1 },
  ];

  const customerSegments = [
    { segment: 'VIP Customers', count: 45, percentage: 15.2, revenue: 8500 },
    { segment: 'Regular Customers', count: 189, percentage: 63.8, revenue: 15200 },
    { segment: 'New Customers', count: 62, percentage: 21.0, revenue: 3400 },
  ];

  const paymentMethods = [
    { method: 'EcoCash', amount: 8456.25, percentage: 65.8, transactions: 162 },
    { method: 'OneMoney', amount: 3234.75, percentage: 25.2, transactions: 68 },
    { method: 'Cash on Delivery', amount: 1156.50, percentage: 9.0, transactions: 17 },
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 1247, percentage: 42.3 },
    { source: 'Social Media', visitors: 856, percentage: 29.1 },
    { source: 'Direct', visitors: 543, percentage: 18.4 },
    { source: 'Referral', visitors: 298, percentage: 10.1 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your business performance and insights</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
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
            <button className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              <button 
                className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
                onClick={() => setShowExportModal(true)}
              >
                <Download className="w-5 h-5 mr-2" />
                Export Report
              </button>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div className="w-12 h-12 bg-zim-green-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-zim-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {kpi.changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`ml-1 text-sm font-medium ${kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.change}
                </span>
                <span className="ml-1 text-sm text-gray-500">{kpi.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Sales Performance</h2>
            <div className="flex items-center space-x-2">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
              >
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
              </select>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {salesData.map((data, index) => {
              const value = selectedMetric === 'revenue' ? data.revenue : data.orders;
              const maxValue = Math.max(...salesData.map(d => selectedMetric === 'revenue' ? d.revenue : d.orders));
              const height = (value / maxValue) * 100;
              
              return (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-zim-green-100 rounded-t-lg relative" style={{ height: '200px' }}>
                    <div
                      className="bg-zim-green-600 rounded-t-lg w-full absolute bottom-0 transition-all duration-300"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{data.month}</div>
                  <div className="text-xs font-medium text-gray-900">
                    {selectedMetric === 'revenue' ? `$${value.toLocaleString()}` : value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-zim-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-zim-green-800">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-zim-green-600 h-2 rounded-full"
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{product.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Segments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Customer Segments</h2>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {customerSegments.map((segment) => (
              <div key={segment.segment} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{segment.segment}</span>
                  <span className="text-sm text-gray-500">{segment.count} customers</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-zim-green-600 h-2 rounded-full"
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{segment.percentage}% of customers</span>
                  <span>${segment.revenue.toLocaleString()} revenue</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.method} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{method.method}</span>
                  <span className="text-sm text-gray-500">{method.transactions} transactions</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-zim-gold-500 h-2 rounded-full"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{method.percentage}% of revenue</span>
                  <span>${method.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Traffic Sources</h2>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{source.source}</span>
                  <span className="text-sm text-gray-500">{source.visitors} visitors</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{source.percentage}% of traffic</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Export Analytics Report</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                    <option value="summary">Executive Summary</option>
                    <option value="detailed">Detailed Analytics</option>
                    <option value="custom">Custom Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                    <option value="pdf">PDF Report</option>
                    <option value="excel">Excel Spreadsheet</option>
                    <option value="csv">CSV Data</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Include Charts</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-zim-green-600 focus:ring-zim-green-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Sales performance</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-zim-green-600 focus:ring-zim-green-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Customer segments</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-zim-green-600 focus:ring-zim-green-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Payment methods</span>
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
                    console.log('Analytics report export started');
                    setShowExportModal(false);
                    // Simulate export
                    setTimeout(() => {
                      alert('Analytics report exported successfully!');
                    }, 1500);
                  }}
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;