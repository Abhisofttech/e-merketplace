// routes/password.js
import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { forgetPassword, forgetResetPassword , resetPassword } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/forget-password', forgetPassword);
router.post('/forget-reset-password/:token', forgetResetPassword);
router.post('/reset-password',authenticate, resetPassword);

export default router;
