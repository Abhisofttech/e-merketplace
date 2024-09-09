import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const addressSchema = new mongoose.Schema({
  houseNumber: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });  // Ensures the address schema does not have its own _id field

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  gender: { type: String, required: true },
  googleId: { type: String }, 
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ['admin', 'seller', 'buyer'], required: true },
  addresses: [addressSchema],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });  // Automatically manage createdAt and updatedAt fields

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Generate JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Check if password matches
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
