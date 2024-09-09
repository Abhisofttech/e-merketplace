import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ShoppingBag, ArrowRight, Truck } from 'lucide-react'

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700 font-semibold">Order #12345</p>
          <p className="text-green-600">Estimated delivery: 3-5 business days</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            to="/buyer-dashboard/order-history"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            View Order History
          </Link>
          {/* <Link
            to="/buyer-dashboard/track-order"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            <Truck className="w-5 h-5 mr-2" />
            Track Your Order
          </Link> */}
          <Link
            to="/buyer-dashboard"
            className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out flex items-center justify-center"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess