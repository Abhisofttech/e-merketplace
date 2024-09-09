import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backendUrl from '../config/bcakendUrl';

const DeleteProduct = ({ productId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Product deleted successfully');
        navigate('/products'); // Redirect to product list or home
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Product</h1>
      <p className="mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete Product
      </button>
    </div>
  );
};

export default DeleteProduct;
