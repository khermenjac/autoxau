// AutoXau Pro - Enhanced JavaScript

// Reviews data
const reviewsData = [
    {
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "AutoXau Pro has transformed my trading. Consistent profits with minimal effort!",
        profit: "+$15,420"
    },
    {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c2e6?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Best trading bot I've ever used. The AI predictions are incredibly accurate.",
        profit: "+$22,180"
    },
    {
        name: "David Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "6 months using AutoXau Pro, 89% win rate. Absolutely amazing results!",
        profit: "+$31,750"
    },
    {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Finally, a bot that actually works! My account has grown 300% this year.",
        profit: "+$18,960"
    },
    {
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "The risk management features saved me from major losses. Highly recommended!",
        profit: "+$12,340"
    },
    {
        name: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "AutoXau Pro's customer support is excellent. They helped me optimize my settings.",
        profit: "+$25,670"
    },
    {
        name: "Robert Wilson",
        avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "I've tried many bots, but AutoXau Pro is in a league of its own. Impressive!",
        profit: "+$19,850"
    },
    {
        name: "Lisa Anderson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "The backtesting results were promising, but live trading exceeded expectations!",
        profit: "+$28,920"
    },
    {
        name: "James Taylor",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Set it and forget it! AutoXau Pro handles everything while I focus on other things.",
        profit: "+$16,540"
    },
    {
        name: "Jessica Martinez",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "The real-time notifications keep me informed of every profitable trade. Love it!",
        profit: "+$21,380"
    },
    {
        name: "William Thomas",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "AutoXau Pro's AI is incredibly smart. It adapts to market conditions perfectly.",
        profit: "+$33,210"
    },
    {
        name: "Ashley White",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "As a beginner, AutoXau Pro made trading accessible and profitable for me.",
        profit: "+$14,760"
    },
    {
        name: "Christopher Lee",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "The transparency and detailed reporting make me trust this bot completely.",
        profit: "+$27,540"
    },
    {
        name: "Amanda Rodriguez",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "AutoXau Pro consistently outperforms my manual trading. Highly efficient!",
        profit: "+$20,190"
    },
    {
        name: "Daniel Harris",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "The bot's performance during volatile markets is exceptional. Very impressed!",
        profit: "+$29,680"
    },
    {
        name: "Jennifer Clark",
        avatar: "https://images.unsplash.com/photo-1502767089025-6572583495b9?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "AutoXau Pro has given me financial freedom. I can finally quit my day job!",
        profit: "+$35,420"
    },
    {
        name: "Matthew Lewis",
        avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "The 24/7 trading capability means I never miss profitable opportunities.",
        profit: "+$17,830"
    },
    {
        name: "Nicole Walker",
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "AutoXau Pro's risk management saved my account during market crashes.",
        profit: "+$23,150"
    },
    {
        name: "Kevin Hall",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "The user interface is intuitive and the results speak for themselves.",
        profit: "+$26,970"
    },
    {
        name: "Rachel Young",
        avatar: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "I've recommended AutoXau Pro to all my trading friends. It's that good!",
        profit: "+$32,540"
    }
];

// FAQ data
const faqData = [
    {
        question: "What is AutoXau Pro?",
        answer: "AutoXau Pro is an advanced automated trading bot specifically designed for XAUUSD (Gold) trading. It uses AI and machine learning algorithms to analyze market conditions and execute profitable trades 24/7."
    },
    {
        question: "How much can I expect to earn?",
        answer: "While past performance doesn't guarantee future results, our users typically see returns of 15-35% monthly. Results vary based on market conditions and account size."
    },
    {
        question: "Is AutoXau Pro safe to use?",
        answer: "Yes, AutoXau Pro includes comprehensive risk management features including stop-loss mechanisms, position sizing, and drawdown protection to safeguard your capital."
    },
    {
        question: "What is the minimum deposit required?",
        answer: "We recommend a minimum deposit of $500 to start trading with AutoXau Pro, though the bot can work with accounts as small as $100."
    },
    {
        question: "Do I need trading experience?",
        answer: "No trading experience is required. AutoXau Pro is designed to be user-friendly for beginners while offering advanced features for experienced traders."
    },
    {
        question: "Which brokers are compatible?",
        answer: "AutoXau Pro works with most MetaTrader 4 and MetaTrader 5 brokers. We provide a list of recommended brokers for optimal performance."
    },
    {
        question: "How often does the bot trade?",
        answer: "The bot monitors markets 24/5 and trades based on market opportunities. On average, it executes 5-15 trades per week, depending on market conditions."
    },
    {
        question: "Can I customize the trading settings?",
        answer: "Yes, AutoXau Pro offers customizable risk levels, lot sizes, and trading parameters to match your trading preferences and risk tolerance."
    },
    {
        question: "Is there a money-back guarantee?",
        answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the performance, we'll refund your purchase."
    },
    {
        question: "How do I get support?",
        answer: "We provide 24/7 customer support via live chat, email, and phone. Our team of trading experts is always ready to help you optimize your bot's performance."
    }
];

// Reviews slider functionality
let currentSlide = 0;
const slidesToShow = 3;

function loadReviews() {
    const track = document.getElementById('reviewTrack');
    if (!track) return;
    
    track.innerHTML = reviewsData.map(review => `
        <div class="review-card">
            <div class="review-header">
                <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                <div class="reviewer-info">
                    <h4>${review.name}</h4>
                    <div class="rating">
                        ${'★'.repeat(review.rating)}
                    </div>
                </div>
                <div class="profit-badge">${review.profit}</div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');
}

function moveSlider(direction) {
    const maxSlides = Math.ceil(reviewsData.length / slidesToShow);
    currentSlide += direction;
    
    if (currentSlide < 0) currentSlide = maxSlides - 1;
    if (currentSlide >= maxSlides) currentSlide = 0;
    
    const track = document.getElementById('reviewTrack');
    if (track) {
        const translateX = -currentSlide * (100 / maxSlides);
        track.style.transform = `translateX(${translateX}%)`;
    }
}

// FAQ functionality
function loadFAQ() {
    const container = document.getElementById('faqContainer');
    if (!container) return;
    
    container.innerHTML = faqData.map((faq, index) => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(${index})">
                <h3>${faq.question}</h3>
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer" id="faq-${index}">
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');
}

function toggleFAQ(index) {
    const answer = document.getElementById(`faq-${index}`);
    const toggle = answer.previousElementSibling.querySelector('.faq-toggle');
    
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        toggle.textContent = '+';
    } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.style.display = 'none';
        });
        document.querySelectorAll('.faq-toggle').forEach(item => {
            item.textContent = '+';
        });
        
        // Open clicked FAQ
        answer.style.display = 'block';
        toggle.textContent = '-';
    }
}

// TradingView Chart
function loadTradingViewChart() {
    const chartContainer = document.getElementById('tradingview-chart');
    if (!chartContainer) return;
    
    // Create TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": "OANDA:XAUUSD",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview-chart"
    });
    
    chartContainer.appendChild(script);
}

// Auto-slide reviews
function autoSlideReviews() {
    setInterval(() => {
        moveSlider(1);
    }, 5000);
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    loadFAQ();
    loadTradingViewChart();
    setupSmoothScrolling();
    autoSlideReviews();
    
    console.log('AutoXau Pro website loaded successfully!');
});

// Add some interactive effects
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
