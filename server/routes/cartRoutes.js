// routes/cartRoutes.js
import express from 'express';
import { addItemToCart , getCartItems , deleteCartItem ,updateCartItemQuantity ,clearCart } from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to add item to cart
router.post('/add', authenticate, addItemToCart);
router.get('/get-cart-items', authenticate, getCartItems);
// Route to delete item from cart
router.delete('/delete-cart-item/:itemId', authenticate, deleteCartItem);

// Route to update item quantity in cart
router.patch('/update-cart-item/:itemId', authenticate, updateCartItemQuantity);
router.delete('/remove-cart-item/', authenticate, clearCart);


export default router;
