import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import {  Package, CreditCard, User, Phone, Home, Edit } from 'lucide-react'
import backendUrl from '../config/bcakendUrl'

const stripePromise = loadStripe('pk_test_51PvAn609VFdbDWGfHAXjEDPBk2yqMcuGBCPNVEDFcE8zxeNat6DEIbWbFgSwnTVYeNjE8dXUMEhrLfLEyjqihFm900K55oH81z')

export default function PlaceOrder() {
  const [userInfo, setUserInfo] = useState({})
  const { state } = useLocation()
  const navigate = useNavigate()
  const { cartItems, totalPrice } = state || { cartItems: [], totalPrice: 0 }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        toast.error('Sign In First!')
        navigate('/signin')
        return
      }

      try {
        const response = await fetch(`${backendUrl}/api/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user info')
        }

        const data = await response.json()
        setUserInfo(data)
        
      } catch (error) {
        console.log('error', error)
        toast.error(error.message || 'An error occurred while fetching user info')
      }
    }

    fetchUserInfo()
    
  }, [navigate])

  const handlePayNow = async () => {
    const stripe = await stripePromise
    const token = localStorage.getItem('token')
    const formatAddress = (address) => {
      return `${address.houseNumber}, ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`
    }
    
    const userAddress = userInfo.addresses && userInfo.addresses.length > 0 ? formatAddress(userInfo.addresses[0]) : 'No address available'
    
    try {
      const orderResponse = await fetch(`${backendUrl}/api/orders/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItems,
          totalPrice,
          address: userAddress,
        }),
      })
      await fetch(`${backendUrl}/api/cart/remove-cart-item`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const orderData = await orderResponse.json()
  
      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Order creation failed.')
      }
  
      const paymentResponse = await fetch(`${backendUrl}/api/payment/checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, orderId: orderData.orderId }),
      })
  
      const session = await paymentResponse.json()
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })
  
      if (result.error) {
        toast.error(result.error.message)
      } 
    } catch (error) {
      console.log('Error during payment:', error)
      toast.error('Payment failed. Please try again.')
    }
  }

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-9">
      <h1 className="text-3xl font-bold mb-6 text-center">Place Your Order</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            User Information
          </h2>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-semibold">Name:</span> {userInfo.name}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">Phone:</span> {userInfo.phoneNumber}
            </p>
          </div>
          <hr className="my-4 border-gray-200" />
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Addresses
            </h3>
            {userInfo.addresses && userInfo.addresses.length > 0 ? (
              userInfo.addresses.map((address, index) => (
                <div key={index} className="mb-2 pl-6 border-l-2 border-gray-200">
                  <p className="text-sm text-gray-600">
                    {address.houseNumber}, {address.street}, {address.city}, {address.state}, {address.zipCode}, {address.country}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No addresses available</p>
            )}
          </div>
          <Link 
            to="/buyer-dashboard/change-address"
            className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <Edit className="w-4 h-4 mr-2" />
            Change Address
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Summary
          </h2>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="font-semibold">Number of Items:</span>
              <span>{cartItems.length}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Total Quantity:</span>
              <span>{totalQuantity}</span>
            </p>
            <hr className="my-2 border-gray-200" />
            <p className="flex justify-between text-lg font-bold">
              <span>Total Price:</span>
              <span>₹{totalPrice}</span>
            </p>
          </div>
          <button
            onClick={handlePayNow}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  )
}