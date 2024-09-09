import User from '../models/User.js';

// Controller to get user details
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to update user address
export const updateAddress = async (req, res) => {
  const { houseNumber, street, city, state, postalCode, country } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Update address
    user.addresses = [{
      houseNumber,
      street,
      city,
      state,
      postalCode,
      country
    }];
    
    await user.save();
    res.json({ message: 'Address updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to update user information (name and phone number)
export const updateUserInfo = async (req, res) => {
  const { name, phoneNumber } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Update user's name and phone number
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    
    await user.save();
    res.json({ message: 'User information updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
