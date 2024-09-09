import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {  Package } from 'lucide-react';
import backendUrl from '../config/bcakendUrl';

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/product/get-products`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch products');
                }
                setProducts(data.products);
            } catch (error) {
                console.error('Error:', error);
                toast.error(error.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [token]);

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${backendUrl}/api/product/delete-product/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to delete product');
                }
                setProducts(products.filter(product => product._id !== productId));
                toast.success('Product deleted successfully');
            } catch (error) {
                console.error('Error:', error);
                toast.error(error.message || 'Failed to delete product');
            }
        }
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-4">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center mt-6">
                    <Package className="mr-4 h-8 w-8 text-blue-600" />
                    My Products
                </h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-600 rounded-full"></div>
                    </div>
                ) : (
                    <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product, index) => (
                                        <tr key={product._id} className="hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">₹{product.price.toFixed(2)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{product.stock}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <Link 
                                                    to={`/seller-dashboard/update-product/${product._id}`} 
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mr-2">
                                                    Update
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(product._id)} 
                                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowProducts;
