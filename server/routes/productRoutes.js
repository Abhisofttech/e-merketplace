import express from 'express';
const router = express.Router();
import { authenticate } from '../middleware/authMiddleware.js';
import {createProduct ,updateProduct ,deleteProduct ,getProducts, getProductById ,getAllProducts  } from '../controllers/productController.js';

// Product Routes
router.post('/create-product', createProduct);
router.put('/update-product/:id' , updateProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/get-products', authenticate , getProducts);
router.get('/get-all-products',  getAllProducts);
router.get('/get-product/:id', getProductById);

export default router;
