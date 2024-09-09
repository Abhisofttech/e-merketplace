import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchUserDetails, updateUserInfo } from '../api/userApi';
import Navbar from '../components/Navbar';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    gender: '',
    phoneNumber: '',
    role: '',
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        if (userDetails) {
          setUserInfo(userDetails);
        }
      } catch (error) {
        toast.error('Failed to load user details');
      }
    };

    loadUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserInfo({ name: userInfo.name, phoneNumber: userInfo.phoneNumber });
      toast.success('User information updated successfully');
    } catch (error) {
      toast.error('Failed to update user information');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 ">
      
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-6 sm:p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                value={userInfo.email}
                className="block w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Cannot be edited</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <input
                type="text"
                value={userInfo.gender}
                className="block w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Cannot be edited</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={userInfo.role}
                className="block w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Cannot be edited</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;



