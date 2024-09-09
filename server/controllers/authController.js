// controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  const { name, email, password, gender, phoneNumber, role } = req.body; // Added role to request body
 

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ name, email, password, gender, phoneNumber, role });
    
    await user.save();
    const token = user.generateAuthToken();
    
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    // const userId = user._id;
    res.json({ message: 'Login successful', token, role: user.role }); // Added role to response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  console.log(idToken)

  if (!idToken) {
    return res.status(400).json({ error: 'ID token is required' });
  }

  try {
    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload.sub; // Google user ID
    const userEmail = payload.email;

    // Check if user already exists in the database
    let user = await User.findOne({ email: userEmail });
    if (!user) {
      // If user doesn't exist, create a new one
      user = new User({
        email: userEmail,
        googleId: userId,
        gender :'male',
        phoneNumber:"0000000000",
        name: payload.name,
        role: 'buyer', // Default role or based on your logic
      });
      await user.save();
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Send response with token and user role
    res.json({
      token,
      role: user.role,
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'An error occurred during Google Sign-In' });
  }
};