// Daily Coffee Fortune Teller Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initPhoneDemo();
    initFortuneCarousel();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
    
    console.log('🎉 Coffee Fortune website loaded successfully!');
});

// Navigation functionality
function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;
    
    // Handle scroll effects
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show nav on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Phone demo animation
function initPhoneDemo() {
    const demoFrames = document.querySelectorAll('.demo-frame');
    let currentFrame = 0;
    
    function showNextFrame() {
        // Hide current frame
        demoFrames[currentFrame].classList.remove('active');
        
        // Move to next frame
        currentFrame = (currentFrame + 1) % demoFrames.length;
        
        // Show next frame
        demoFrames[currentFrame].classList.add('active');
    }
    
    // Auto-cycle through demo frames
    setInterval(showNextFrame, 3000);
    
    // Add click handler for manual control
    demoFrames.forEach((frame, index) => {
        frame.addEventListener('click', () => {
            demoFrames[currentFrame].classList.remove('active');
            currentFrame = index;
            demoFrames[currentFrame].classList.add('active');
        });
    });
}

// Fortune carousel functionality
function initFortuneCarousel() {
    const fortuneCards = document.querySelectorAll('.fortune-card-large');
    const dots = document.querySelectorAll('.dot');
    let currentFortune = 0;
    
    function showFortune(index) {
        // Hide all fortunes
        fortuneCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected fortune
        fortuneCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentFortune = index;
    }
    
    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showFortune(index));
    });
    
    // Auto-cycle through fortunes
    setInterval(() => {
        const nextFortune = (currentFortune + 1) % fortuneCards.length;
        showFortune(nextFortune);
    }, 5000);
    
    // Add swipe support for mobile
    let startX, startY, distX, distY;
    const threshold = 100;
    
    fortuneCards.forEach(card => {
        card.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        card.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
        
        card.addEventListener('touchend', (e) => {
            distX = e.changedTouches[0].clientX - startX;
            distY = e.changedTouches[0].clientY - startY;
            
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                if (distX > 0) {
                    // Swipe right - previous fortune
                    const prevFortune = currentFortune === 0 ? fortuneCards.length - 1 : currentFortune - 1;
                    showFortune(prevFortune);
                } else {
                    // Swipe left - next fortune
                    const nextFortune = (currentFortune + 1) % fortuneCards.length;
                    showFortune(nextFortune);
                }
            }
        });
    });
}

// Scroll animations (simple implementation)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkAnimations() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Check animations on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Initial check
    checkAnimations();
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navToggle.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Enhanced scroll animations with intersection observer
function initAdvancedScrollAnimations() {
    // Only run if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Add stagger delay for grouped elements
                    const delay = entry.target.dataset.aosDelay || 0;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all animated elements
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }
}

// Coffee cup animation effects
function initCoffeeEffects() {
    const coffeeElements = document.querySelectorAll('.coffee-cup, .nav-icon');
    
    coffeeElements.forEach(element => {
        // Add steam effect on hover
        element.addEventListener('mouseenter', () => {
            element.classList.add('steam-animation');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('steam-animation');
        });
    });
    
    // Add sparkle effects to mystical elements
    const mysticalElements = document.querySelectorAll('.feature-icon, .step-icon');
    mysticalElements.forEach(element => {
        if (element.textContent.includes('🔮') || element.textContent.includes('✨')) {
            element.classList.add('sparkle');
        }
    });
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle scroll events
    const throttledScrollHandler = throttle(() => {
        // Handle scroll-based animations
        initScrollAnimations();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
}

// Error handling and fallbacks
function initErrorHandling() {
    // Handle missing images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.warn('Failed to load image:', img.src);
        });
    });
    
    // Handle JavaScript errors gracefully
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // Optionally report to analytics
    });
}

// App store link handlers
function initAppStoreLinks() {
    const iosButtons = document.querySelectorAll('.ios-btn');
    const androidButtons = document.querySelectorAll('.android-btn');
    
    // iOS App Store links
    iosButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Analytics tracking
            trackEvent('app_store_click', { platform: 'ios' });
            
            // Redirect to App Store (replace with actual URL)
            window.open('https://apps.apple.com/app/coffee-fortune-teller', '_blank');
        });
    });
    
    // Google Play Store links
    androidButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Analytics tracking
            trackEvent('app_store_click', { platform: 'android' });
            
            // Redirect to Google Play (replace with actual URL)
            window.open('https://play.google.com/store/apps/details?id=com.cochinescu.coffeeapp', '_blank');
        });
    });
}

// Simple analytics tracking
function trackEvent(eventName, properties = {}) {
    // Replace with your analytics implementation
    console.log('Event tracked:', eventName, properties);
    
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
}

// Enhanced mobile experience
function initMobileEnhancements() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Optimize touch interactions
        document.addEventListener('touchstart', () => {}, { passive: true });
        
        // Prevent zoom on input focus (if needed)
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features
    initAdvancedScrollAnimations();
    initCoffeeEffects();
    optimizePerformance();
    initErrorHandling();
    initAppStoreLinks();
    initMobileEnhancements();
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 