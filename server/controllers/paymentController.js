import Stripe from 'stripe';


const stripeSecretKey =process.env.STRIPE_SECRET_KEY
const frontendURL =process.env.FRONTEND_URL
const stripe = Stripe(stripeSecretKey);

export const createCheckoutSession = async (req, res) => {
  const { cartItems } = req.body;

 
  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.product.name,
      },
      unit_amount: item.product.price * 100, // Stripe uses amounts in the smallest currency unit (e.g., paise for INR)
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `https://e-merketplace-frontend.onrender.com/buyer-dashboard/payment/order-confirmation`,
      cancel_url: `${frontendURL}/`,
    });

  
      res.json({ id: session.id });
  } catch (error) {
    console.log('Error creating Stripe session', error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
};
