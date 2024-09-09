import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';
import backendUrl from '../config/bcakendUrl';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Sign In First!');
      navigate('/signin');
    } else {
      try {
        const response = await fetch(`${backendUrl}/api/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: 1,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Item added to cart successfully!');
        } else {
          toast.error(data.error || 'Failed to add item to cart');
        }
      } catch (error) {
        console.log('error is ', error);
        toast.error('An error occurred while adding item to cart');
      }
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div 
      className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
       
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-teal-600">₹{product.price.toLocaleString()}</p>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-white text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
