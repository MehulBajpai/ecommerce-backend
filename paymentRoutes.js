import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/payment', async (req, res) => {
    try {
        const { amount, token } = req.body;

        // Create a charge with the Stripe API
        const charge = await stripe.charges.create({
            amount: amount * 100, // amount in cents
            currency: 'usd',
            description: 'Ecommerce payment',
            source: token,
        });

        res.status(200).json({ success: true, charge });
    } catch (error) {
        console.error('Payment failed:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
