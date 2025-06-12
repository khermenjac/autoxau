const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com", "https://s3.tradingview.com"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            frameSrc: ["https://js.stripe.com", "https://www.tradingview.com"],
            connectSrc: ["'self'", "https://api.stripe.com"],
        },
    },
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stripe webhook handling (raw body needed)
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment successful for session:', session.id);
            // TODO: Provision access to your service
            break;
        case 'customer.subscription.deleted':
            const subscription = event.data.object;
            console.log('Subscription cancelled:', subscription.id);
            // TODO: Revoke access to your service
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
});

// Parse JSON for other routes
app.use(express.json());

// Create Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { planType } = req.body;
        
        // Map plan types to Stripe price IDs
        const priceMap = {
            'basic': process.env.STRIPE_BASIC_PRICE_ID,
            'professional': process.env.STRIPE_PROFESSIONAL_PRICE_ID,
            'premium': process.env.STRIPE_PREMIUM_PRICE_ID
        };

        const priceId = priceMap[planType];
        
        if (!priceId) {
            throw new Error('Invalid plan type');
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${process.env.DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.DOMAIN}/#pricing`,
            metadata: {
                planType: planType
            }
        });

        res.json({ 
            sessionId: session.id,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY 
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get Stripe publishable key
app.get('/api/stripe-key', (req, res) => {
    res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// Serve static files
app.use(express.static('public'));

// Main page route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Success page route
app.get('/success.html', (req, res) => {
    res.sendFile(__dirname + '/public/success.html');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ AutoXAU Payment Server running on port ${PORT}`);
    console.log(`🔐 Stripe integration active (LIVE MODE)`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🌐 Domain: ${process.env.DOMAIN}`);
});
