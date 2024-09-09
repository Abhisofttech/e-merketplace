import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createOrder , getOrderHistory ,getSellerOrders, updateOrderStatus} from '../controllers/orderController.js';

const router = express.Router();

// Endpoint to create an order and reduce stock
router.post('/create-order', authenticate, createOrder);

router.get('/history', authenticate, getOrderHistory);

router.get('/seller-orders', authenticate, getSellerOrders);
router.put('/update-order-status/:orderId', authenticate, updateOrderStatus);

export default router;
