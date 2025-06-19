import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Phone,
  Calendar,
  X
} from 'lucide-react';

const Orders = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = [
    { id: 'all', name: 'All Orders', count: 247 },
    { id: 'pending', name: 'Pending', count: 23 },
    { id: 'processing', name: 'Processing', count: 45 },
    { id: 'shipped', name: 'Shipped', count: 67 },
    { id: 'delivered', name: 'Delivered', count: 89 },
    { id: 'cancelled', name: 'Cancelled', count: 23 },
  ];

  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Mukamuri',
      email: 'john.mukamuri@gmail.com',
      phone: '+263 77 123 4567',
      total: 125.00,
      status: 'delivered',
      paymentMethod: 'EcoCash',
      paymentStatus: 'paid',
      items: 2,
      date: '2024-01-15',
      address: 'Avondale, Harare',
      trackingNumber: 'ZIM1234567890',
    },
    {
      id: 'ORD-002',
      customer: 'Mary Chikwanha',
      email: 'mary.chikwanha@yahoo.com',
      phone: '+263 71 987 6543',
      total: 89.50,
      status: 'processing',
      paymentMethod: 'OneMoney',
      paymentStatus: 'paid',
      items: 1,
      date: '2024-01-14',
      address: 'Belvedere, Harare',
      trackingNumber: 'ZIM0987654321',
    },
    {
      id: 'ORD-003',
      customer: 'David Moyo',
      email: 'david.moyo@gmail.com',
      phone: '+263 78 456 7890',
      total: 245.00,
      status: 'shipped',
      paymentMethod: 'EcoCash',
      paymentStatus: 'paid',
      items: 3,
      date: '2024-01-13',
      address: 'Mount Pleasant, Harare',
      trackingNumber: 'ZIM1122334455',
    },
    {
      id: 'ORD-004',
      customer: 'Grace Sithole',
      email: 'grace.sithole@outlook.com',
      phone: '+263 71 234 5678',
      total: 67.25,
      status: 'pending',
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'pending',
      items: 1,
      date: '2024-01-12',
      address: 'Marlborough, Harare',
      trackingNumber: null,
    },
    {
      id: 'ORD-005',
      customer: 'Peter Macheka',
      email: 'peter.macheka@gmail.com',
      phone: '+263 77 345 6789',
      total: 189.99,
      status: 'cancelled',
      paymentMethod: 'EcoCash',
      paymentStatus: 'refunded',
      items: 2,
      date: '2024-01-11',
      address: 'Borrowdale, Harare',
      trackingNumber: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="mt-2 text-gray-600">Manage and track all customer orders</p>
      </div>

      {/* Status Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  selectedStatus === status.id
                    ? 'border-zim-green-500 text-zim-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {status.name}
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {status.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders, customers, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zim-green-500 focus:border-transparent w-full sm:w-80"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
              <option>All Payment Methods</option>
              <option>EcoCash</option>
              <option>OneMoney</option>
              <option>Cash on Delivery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.items} items</div>
                      {order.trackingNumber && (
                        <div className="text-xs text-gray-400">Track: {order.trackingNumber}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Phone className="w-3 h-3 mr-1" />
                        {order.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{order.paymentMethod}</div>
                      <div className={`text-xs ${order.paymentStatus === 'paid' ? 'text-green-600' : 
                        order.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {order.paymentStatus}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="text-zim-green-600 hover:text-zim-green-900 p-1 transition-colors"
                        onClick={() => {
                          setSelectedOrder(order);
                          console.log('View order:', order.id);
                        }}
                        title="View Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {order.trackingNumber && (
                        <button 
                          className="text-blue-600 hover:text-blue-900 p-1 transition-colors"
                          onClick={() => {
                            console.log('Track order:', order.trackingNumber);
                            // Handle tracking
                          }}
                          title="Track Order"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal would go here */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Order Details - {selectedOrder.id}</h3>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer</label>
                    <p className="text-sm text-gray-900">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1 capitalize">{selectedOrder.status}</span>
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                    <p className="text-sm text-gray-900">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <p className="text-sm text-gray-900">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                  <p className="text-sm text-gray-900">{selectedOrder.address}</p>
                </div>
                {selectedOrder.trackingNumber && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedOrder.trackingNumber}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
                  onClick={() => {
                    console.log('Update order status');
                    // Handle status update
                  }}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;