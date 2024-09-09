import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.js';


const router = express.Router();

// Route to create a Stripe payment session
router.post('/checkout-session', createCheckoutSession);

 export default router;
