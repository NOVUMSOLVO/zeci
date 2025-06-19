import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MessageSquare,
  User,
  Calendar,
  DollarSign,
  ShoppingCart,
  Star,
  MapPin,
  Edit,
  MoreVertical
} from 'lucide-react';

const CRM = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: 1,
      name: 'John Mukamuri',
      email: 'john.mukamuri@gmail.com',
      phone: '+263 77 123 4567',
      location: 'Avondale, Harare',
      totalSpent: 1245.50,
      orders: 8,
      lastOrder: '2024-01-15',
      status: 'vip',
      rating: 5,
      joinDate: '2023-06-15',
      notes: 'Prefers electronics and gadgets. Repeat customer.',
    },
    {
      id: 2,
      name: 'Mary Chikwanha',
      email: 'mary.chikwanha@yahoo.com',
      phone: '+263 71 987 6543',
      location: 'Belvedere, Harare',
      totalSpent: 687.25,
      orders: 12,
      lastOrder: '2024-01-14',
      status: 'regular',
      rating: 4,
      joinDate: '2023-08-22',
      notes: 'Beauty products enthusiast. Frequently orders skincare.',
    },
    {
      id: 3,
      name: 'David Moyo',
      email: 'david.moyo@gmail.com',
      phone: '+263 78 456 7890',
      location: 'Mount Pleasant, Harare',
      totalSpent: 445.00,
      orders: 5,
      lastOrder: '2024-01-13',
      status: 'regular',
      rating: 4,
      joinDate: '2023-11-10',
      notes: 'Interested in fashion and accessories.',
    },
    {
      id: 4,
      name: 'Grace Sithole',
      email: 'grace.sithole@outlook.com',
      phone: '+263 71 234 5678',
      location: 'Marlborough, Harare',
      totalSpent: 156.75,
      orders: 3,
      lastOrder: '2024-01-12',
      status: 'new',
      rating: 5,
      joinDate: '2023-12-05',
      notes: 'New customer, showed interest in home goods.',
    },
  ];

  const communications = [
    {
      id: 1,
      customer: 'John Mukamuri',
      type: 'email',
      subject: 'Order Confirmation - Samsung Galaxy A54',
      message: 'Thank you for your order. Your phone will be delivered tomorrow.',
      date: '2024-01-15',
      status: 'sent',
    },
    {
      id: 2,
      customer: 'Mary Chikwanha',
      type: 'sms',
      subject: 'Delivery Update',
      message: 'Your Nivea lotion set is out for delivery. Tracking: ZIM0987654321',
      date: '2024-01-14',
      status: 'delivered',
    },
    {
      id: 3,
      customer: 'David Moyo',
      type: 'whatsapp',
      subject: 'Product Recommendation',
      message: 'Hi David! Based on your previous purchases, you might like our new African print collection.',
      date: '2024-01-13',
      status: 'read',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'regular':
        return 'bg-blue-100 text-blue-800';
      case 'new':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'whatsapp':
        return <Phone className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Relationship Management</h1>
            <p className="mt-2 text-gray-600">Manage customer relationships and communications</p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            <button 
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
              onClick={() => setShowAddCustomerModal(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Customer
            </button>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('customers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'customers'
                  ? 'border-zim-green-500 text-zim-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab('communications')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'communications'
                  ? 'border-zim-green-500 text-zim-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Communications
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'customers' && (
        <>
          {/* Search and Filters */}
          <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zim-green-500 focus:border-transparent w-full sm:w-80"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                  <option>All Customers</option>
                  <option>VIP Customers</option>
                  <option>Regular Customers</option>
                  <option>New Customers</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-zim-green-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-zim-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">${customer.totalSpent}</div>
                    <div className="text-xs text-gray-500">Total Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <ShoppingCart className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{customer.orders}</div>
                    <div className="text-xs text-gray-500">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{customer.rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">{customer.notes}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Joined: {new Date(customer.joinDate).toLocaleDateString()}</span>
                  <span>Last Order: {new Date(customer.lastOrder).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    className="flex-1 bg-zim-green-600 text-white px-3 py-2 rounded-lg hover:bg-zim-green-700 transition-colors text-sm font-medium"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowMessageModal(true);
                    }}
                  >
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Contact
                  </button>
                  <button 
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      console.log('Edit customer:', customer.id);
                      // Handle edit customer
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'communications' && (
        <>
          {/* Communications List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Communications</h2>
                <button 
                  className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors text-sm"
                  onClick={() => setShowMessageModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Message
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {communications.map((comm) => (
                <div key={comm.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getCommunicationIcon(comm.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{comm.customer}</h4>
                          <p className="text-sm text-gray-600">{comm.subject}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {new Date(comm.date).toLocaleDateString()}
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            comm.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                            comm.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {comm.status}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{comm.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Customer</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="customer@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="+263 77 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="Harare, Zimbabwe"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => setShowAddCustomerModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
                  onClick={() => {
                    console.log('Customer added');
                    setShowAddCustomerModal(false);
                  }}
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {selectedCustomer ? `Message ${selectedCustomer.name}` : 'New Message'}
              </h3>
              <div className="space-y-4">
                {!selectedCustomer && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                      <option value="">Select customer</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="Message subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="Type your message here..."
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => {
                    setShowMessageModal(false);
                    setSelectedCustomer(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
                  onClick={() => {
                    console.log('Message sent');
                    setShowMessageModal(false);
                    setSelectedCustomer(null);
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;