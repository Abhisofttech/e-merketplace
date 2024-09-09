// controllers/passwordController.js
import User from '../models/User.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
console.log(email)
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email address' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(10).toString('hex');
    // const resetPasswordToken = jwt.sign({ resetToken }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });
console.log(resetToken)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email
    const resetUrl = `${process.env.FRONTEND_URL}/forget-reset-password/${resetToken}`;
    const mailOptions ={
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click the link below to reset your password:</p>
               <p><a href="${resetUrl}">Reset Password</a></p>`
      }
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Error sending email' });
        } else {
          console.log('Email sent:');
          res.status(200).json({ message: 'Password reset link sent to your email' });
        }
      });

    // res.status(200).json({ message: 'Reset password link sent to your email address' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const forgetResetPassword = async (req, res) => {
  const { token } = req.params;
  const {   newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
    const {  prevPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the previous password is correct
      const isMatch = await user.matchPassword(prevPassword);
      if (!isMatch) {
        return res.status(400).json({ error: 'Previous password is incorrect' });
      }
  
      // Set the new password
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };