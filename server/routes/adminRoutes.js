import express from 'express';
import { getSalesAnalytics, getUserBehaviorAnalytics ,getInventoryManagement ,generateCustomReports} from '../controllers/adminController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Sales analytics
router.get('/sales-analytics', authenticate, getSalesAnalytics);

// User behavior analytics
router.get('/user-behavior', authenticate, getUserBehaviorAnalytics);

// Inventory management
router.get('/inventory-management', authenticate, getInventoryManagement);

// Custom reports
router.post('/custom-reports',  generateCustomReports);

export default router;
