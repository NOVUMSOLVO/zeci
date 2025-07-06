import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  DollarSign,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import { usePersona } from '../PersonaContext';

const Store = () => {
  const { persona } = usePersona();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Garden' },
  ];

  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy A54 5G',
      category: 'electronics',
      price: 299.99,
      stock: 24,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      sales: 45,
    },
    {
      id: 2,
      name: 'Nivea Body Lotion Set',
      category: 'beauty',
      price: 29.99,
      stock: 156,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3735679/pexels-photo-3735679.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      sales: 89,
    },
    {
      id: 3,
      name: 'iPhone 14 Pro',
      category: 'electronics',
      price: 959.99,
      stock: 8,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      sales: 23,
    },
    {
      id: 4,
      name: 'African Print Dress',
      category: 'fashion',
      price: 45.00,
      stock: 32,
      rating: 4.3,
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      sales: 67,
    },
    {
      id: 5,
      name: 'Maybelline Makeup Kit',
      category: 'beauty',
      price: 49.99,
      stock: 0,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'out_of_stock',
      sales: 34,
    },
    {
      id: 6,
      name: 'Ceramic Dinner Set',
      category: 'home',
      price: 89.99,
      stock: 15,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      sales: 12,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
            <p className="mt-2 text-gray-600">Manage your product catalog and inventory</p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            <button 
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
              onClick={() => setShowAddProductModal(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zim-green-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{filteredProducts.length} products</span>
            <span>•</span>
            <span>{products.filter(p => p.status === 'active').length} active</span>
            <span>•</span>
            <span>{products.filter(p => p.status === 'out_of_stock').length} out of stock</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 'active' ? 'Active' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 capitalize mb-2">{product.category}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-600">{product.sales} sales</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="font-semibold text-lg text-gray-900">${product.price}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Package className="w-4 h-4 mr-1" />
                        <span className="text-sm">{product.stock} in stock</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button 
                      className="flex-1 bg-zim-green-600 text-white px-3 py-2 rounded-lg hover:bg-zim-green-700 transition-colors text-sm font-medium"
                      onClick={() => {
                        console.log('Edit product:', product.id);
                        // Handle edit product
                      }}
                    >
                      <Edit className="w-4 h-4 inline mr-1" />
                      Edit
                    </button>
                    <button 
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      onClick={() => {
                        console.log('View product:', product.id);
                        // Handle view product
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this product?')) {
                          console.log('Delete product:', product.id);
                          // Handle delete product
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button 
            className="inline-flex items-center px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
            onClick={() => setShowAddProductModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Product
          </button>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Product</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-zim-green-500 focus:border-transparent">
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="beauty">Beauty & Personal Care</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Garden</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => setShowAddProductModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-zim-green-600 text-white rounded-lg hover:bg-zim-green-700 transition-colors"
                  onClick={() => {
                    console.log('Product added');
                    setShowAddProductModal(false);
                  }}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;