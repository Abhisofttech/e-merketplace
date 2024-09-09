import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const createOrder = async (req, res) => {
  const { cartItems, totalPrice, address } = req.body;
  const userId = req.user.id;
  console.log("create order",{cartItems})

  try {
    // Create the order
    const order = new Order({
      user: userId,
      items: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: totalPrice,
      address,
    });

    await order.save();

    // Reduce stock for each product
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Send email to user
    const user = await User.findById(userId);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Order Confirmation',
      text: `Dear ${user.name},\n\nYour order has been placed successfully.\n\nOrder Summary:\n${cartItems.map(item => `Product: ${item.product.name}, Quantity: ${item.quantity}, Price: ₹${item.product.price}`).join('\n')}\nTotal Price: ₹${totalPrice}\n\nThank you for shopping with us!\n\nBest regards,\nMeketPlace`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Error sending email' });
        } else {
          console.log('Email sent:');
          res.status(200).json({ message: 'Password reset link sent to your email' });
        }
      });

    res.status(200).json({ message: 'Order created and stock updated successfully' });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
};

export const getOrderHistory = async (req, res) => {
    try {
      const userId = req.user.id; // User ID from auth middleware
  console.log("user",userId)
      // Find orders for the logged-in user
      const orders = await Order.find({ user: userId }).populate('items.product');
  
      if (!orders.length) {
        return res.status(404).json({ message: 'No order history found' });
      }
  
      // Respond with order history
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


// Get all orders related to the seller's products
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const sellerProducts = await Product.find({ seller: sellerId }).select('_id');
    const productIds = sellerProducts.map(product => product._id);

    const orders = await Order.find({ 'items.product': { $in: productIds } })
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
