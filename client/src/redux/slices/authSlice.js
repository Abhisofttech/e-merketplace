// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  console.log(userData);
  
  try {
    const response = await axios.post('/api/auth/register', userData);
    dispatch(setUser({ user: response.data.user, token: response.data.token }));
    toast.success('Registration successful!');
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', credentials);
    dispatch(setUser({ user: response.data.user, token: response.data.token }));
    toast.success('Login successful!');
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// New async action for sending password reset link
export const sendResetPasswordLink = (email) => async (dispatch) => {
  try {
    await axios.post('/api/forgot-password', { email });
    toast.success('Password reset link sent to your email!');
  } catch (error) {
    toast.error('Error sending password reset link. Please try again.');
  }
};

export default authSlice.reducer;
