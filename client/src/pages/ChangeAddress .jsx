import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
import { fetchUserDetails, updateAddress } from '../api/userApi';

const ChangeAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    houseNumber: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        if (userDetails) {
          const { addresses } = userDetails;
          if (addresses.length > 0) {
            setAddress(addresses[0]); // Set the first address if multiple exist
          }
        }
      } catch (error) {
        toast.error('Failed to load user details');
      }
    };

    loadUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAddress(address);
      toast.success('Address updated successfully');
    } catch (error) {
      toast.error('Failed to update address');
    }
  };

  return (
    <div className="min-h-screen bg-signup-bg bg-cover bg-center py-16 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Change Address</h2>
            <form onSubmit={handleSubmit} className="space-y-6 -z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.keys(address).map((key) => (
                  <div key={key} className="relative">
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </label>
                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={address[key]}
                      onChange={handleChange}
                      className="block w-full pl-3 py-2 border  border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      required
                    />
                  </div>
                ))}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Address
                </button>
              </div>
            </form>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAddress;
