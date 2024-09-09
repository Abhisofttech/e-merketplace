// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors  from 'cors';
import authRoutes from './routes/authRoutes.js';
import passwordRoutes from './routes/passwordRoute.js'
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes  from './routes/paymentRoutes.js';
import orderRoutes  from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { connectDB } from './config/db.js'; // Ensure connectDB is imported correctly

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/product', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
