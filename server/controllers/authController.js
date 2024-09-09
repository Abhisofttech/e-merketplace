// controllers/authController.js
import User from '../models/User.js';


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
