// import express  from 'express';
// import { getUserProfile, updateUserProfile, updateUserAddress } from '../controllers/userController';
// import { protect } from '../middlewares/authMiddleware';

// const router  = express.Router();

// // Get and update user profile
// router.route('/profile')
//   .get(protect, getUserProfile)       // GET /api/users/profile
//   .put(protect, updateUserProfile);   // PUT /api/users/profile

// // Update user address
// router.route('/address')
//   .put(protect, updateUserAddress);   // PUT /api/users/address

// module.exports = router;

// routes/userRoutes.js
import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { updateAddress, getUserDetails , updateUserInfo } from '../controllers/userController.js';

const router = express.Router();

// Fetch the currently logged-in user's information
router.get('/me', authenticate, async (req, res) => {
  try {
    // Use req.user to get the current user's data from the token
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Send the user's information
    res.json({ userId: user._id, role: user.role, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user information', error });
  }
});

// Route to get user details
router.get('/profile', authenticate, getUserDetails);

// Route to update user address
router.put('/update-address', authenticate, updateAddress);
router.put('/update-info', authenticate, updateUserInfo);

export default router;

