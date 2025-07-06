import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  CreditCard,
  Globe,
  Smartphone,
  Shield,
  Bell,
  Truck,
  Store,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { usePersona } from '../PersonaContext';

const Settings = () => {
  const { persona } = usePersona();
  const [activeTab, setActiveTab] = useState('business');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = (section) => {
    setSaveStatus('saving');
    // Simulate save operation
    setTimeout(() => {
      setSaveStatus('saved');
      console.log(`${section} settings saved`);
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const tabs = [
    { id: 'business', name: 'Business Profile', icon: Store },
    { id: 'payments', name: 'Payment Settings', icon: CreditCard },
    { id: 'delivery', name: 'Delivery & Logistics', icon: Truck },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Globe },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your business settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-zim-green-100 text-zim-green-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'business' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Business Profile</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      defaultValue="ZimCommerce Store"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      defaultValue="info@zimcommerce.co.zw"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+263 77 123 4567"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Registration Number
                    </label>
                    <input
                      type="text"
                      defaultValue="BP123456"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="123 Business Street, Avondale, Harare, Zimbabwe"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="Leading e-commerce platform serving Zimbabwean customers with quality products and reliable delivery services."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                  />
                </div>

                <button className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors">
                  <Save className="w-4 h-4 mr-2" />
                  <button 
                    className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors disabled:opacity-50"
                    onClick={() => handleSave('business')}
                    disabled={saveStatus === 'saving'}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                  </button>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Settings</h2>
              <div className="space-y-8">
                {/* EcoCash Settings */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">EcoCash Integration</h3>
                        <p className="text-sm text-gray-500">Econet's mobile money platform</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zim-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zim-green-600" />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Merchant Code
                      </label>
                      <input
                        type="text"
                        defaultValue="123456"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          defaultValue="eco_test_key_123456789"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showApiKey ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OneMoney Settings */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">OneMoney Integration</h3>
                        <p className="text-sm text-gray-500">NetOne's mobile money platform</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Merchant ID
                      </label>
                      <input
                        type="text"
                        defaultValue="OM789012"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Secret
                      </label>
                      <input
                        type="password"
                        defaultValue="om_secret_key_987654321"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Transaction Settings */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Auto-confirm payments</label>
                        <p className="text-sm text-gray-500">Automatically confirm successful payments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zim-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zim-green-600" />
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Send payment receipts</label>
                        <p className="text-sm text-gray-500">Email receipts to customers after payment</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zim-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zim-green-600" />
                      </label>
                    </div>
                  </div>
                </div>

                <button className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors">
                  <Save className="w-4 h-4 mr-2" />
                  <button 
                    className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors disabled:opacity-50"
                    onClick={() => handleSave('payments')}
                    disabled={saveStatus === 'saving'}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Payment Settings'}
                  </button>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Delivery & Logistics</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Delivery Fee (Harare)
                    </label>
                    <input
                      type="number"
                      defaultValue="5.00"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Outside Harare Fee
                    </label>
                    <input
                      type="number"
                      defaultValue="15.00"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard Delivery Time
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                      <option>1-2 business days</option>
                      <option>2-3 business days</option>
                      <option>3-5 business days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Free Delivery Threshold
                    </label>
                    <input
                      type="number"
                      defaultValue="50.00"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Areas
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="Harare, Chitungwiza, Norton, Ruwa, Epworth, Kuwadzana, Mbare, Highfield, Glen View, Budiriro"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="Enter delivery areas separated by commas"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Enable pickup points</label>
                      <p className="text-sm text-gray-500">Allow customers to collect from pickup locations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zim-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zim-green-600" />
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">SMS delivery notifications</label>
                      <p className="text-sm text-gray-500">Send SMS updates to customers</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zim-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zim-green-600" />
                    </label>
                  </div>
                </div>

                <button className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors">
                  <Save className="w-4 h-4 mr-2" />
                  <button 
                    className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors disabled:opacity-50"
                    onClick={() => handleSave('delivery')}
                    disabled={saveStatus === 'saving'}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Delivery Settings'}
                  </button>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900">Email Notifications</h3>
                  {[
                    { name: 'New orders', description: 'Get notified when new orders are placed' },
                    { name: 'Payment confirmations', description: 'Receive payment confirmation emails' },
                    { name: 'Inventory alerts', description: 'Low stock and out of stock notifications' },
                    { name: 'Daily sales reports', description: 'Daily summary of sales and performance' },
                    { name: 'Customer messages', description: 'New customer inquiries and messages' },
                  ].map((notification) => (
                    <div key={notification.name} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">{notification.name}</label>
                        <p className="text-sm text-gray-500">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zim-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zim-green-600" />
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900">SMS Notifications</h3>
                  {[
                    { name: 'Urgent order alerts', description: 'Critical order updates via SMS' },
                    { name: 'Payment failures', description: 'Failed payment notifications' },
                    { name: 'System maintenance', description: 'Platform maintenance notifications' },
                  ].map((notification) => (
                    <div key={notification.name} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">{notification.name}</label>
                        <p className="text-sm text-gray-500">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zim-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zim-green-600" />
                      </label>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors">
                  <Save className="w-4 h-4 mr-2" />
                  <button 
                    className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors disabled:opacity-50"
                    onClick={() => handleSave('notifications')}
                    disabled={saveStatus === 'saving'}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Notification Settings'}
                  </button>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900">Security Options</h3>
                  {[
                    { name: 'Two-factor authentication', description: 'Add an extra layer of security to your account' },
                    { name: 'Login notifications', description: 'Get notified of new login attempts' },
                    { name: 'Session timeout', description: 'Automatically log out after 30 minutes of inactivity' },
                  ].map((option) => (
                    <div key={option.name} className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900">{option.name}</label>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zim-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zim-green-600" />
                      </label>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors">
                  <Save className="w-4 h-4 mr-2" />
                  <button 
                    className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors disabled:opacity-50"
                    onClick={() => handleSave('security')}
                    disabled={saveStatus === 'saving'}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Update Security Settings'}
                  </button>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Third-party Integrations</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-md font-medium text-gray-900">WhatsApp Business</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Connected
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Send order updates and customer support via WhatsApp</p>
                    <button 
                      className="text-sm text-zim-green-600 hover:text-zim-green-700 transition-colors"
                      onClick={() => console.log('Configure WhatsApp')}
                    >
                      Configure
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-md font-medium text-gray-900">Google Analytics</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Not Connected
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Track website traffic and customer behavior</p>
                    <button 
                      className="text-sm text-zim-green-600 hover:text-zim-green-700 transition-colors"
                      onClick={() => console.log('Connect Google Analytics')}
                    >
                      Connect
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-md font-medium text-gray-900">Facebook Pixel</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Connected
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Track conversions and optimize Facebook ads</p>
                    <button 
                      className="text-sm text-zim-green-600 hover:text-zim-green-700 transition-colors"
                      onClick={() => console.log('Configure Facebook Pixel')}
                    >
                      Configure
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-md font-medium text-gray-900">Mailchimp</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Not Connected
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Email marketing and customer newsletters</p>
                    <button 
                      className="text-sm text-zim-green-600 hover:text-zim-green-700 transition-colors"
                      onClick={() => console.log('Connect Mailchimp')}
                    >
                      Connect
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">API Access</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">API Key</span>
                      <button 
                        className="text-sm text-zim-green-600 hover:text-zim-green-700 transition-colors"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="font-mono text-sm text-gray-600 bg-white p-2 rounded border">
                      {showApiKey ? 'zim_live_key_1234567890abcdef' : '••••••••••••••••••••••••••••••••'}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Use this key to integrate with our API</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;