// Stripe Integration for AutoXAU
let stripe = null;
let isProcessing = false;

// Initialize Stripe
async function initializeStripe() {
    try {
        const response = await fetch('/api/stripe-key');
        const { publishableKey } = await response.json();
        stripe = Stripe(publishableKey);
    } catch (error) {
        console.error('Failed to initialize Stripe:', error);
    }
}

// Handle checkout button clicks
document.addEventListener('DOMContentLoaded', function() {
    initializeStripe();
    
    // Add click handlers to all checkout buttons
    const checkoutButtons = document.querySelectorAll('.checkout-button');
    checkoutButtons.forEach(button => {
        button.addEventListener('click', handleCheckout);
    });
});

async function handleCheckout(event) {
    if (isProcessing || !stripe) return;
    
    const button = event.target;
    const planType = button.getAttribute('data-plan');
    
    // Disable button and show loading
    isProcessing = true;
    button.disabled = true;
    button.textContent = 'Processing...';
    
    try {
        // Create checkout session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                planType: planType
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        const { sessionId } = await response.json();

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
            sessionId: sessionId
        });

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Something went wrong. Please try again.');
    } finally {
        // Re-enable button
        isProcessing = false;
        button.disabled = false;
        button.textContent = 'Get Started';
    }
}
