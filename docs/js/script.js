// script.js - Carbon Slash Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FOUT Prevention - Wait for fonts to load before showing content
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function() {
            document.body.classList.remove('js-loading');
        });
    } else {
        // Fallback: wait a brief moment then show content
        setTimeout(function() {
            document.body.classList.remove('js-loading');
        }, 100);
    }

    // Header Scroll Effects
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollY = window.scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // Mega Menu Functionality
    const menuTrigger = document.querySelector('.menu-trigger');
    const megaMenu = document.querySelector('.mega-menu');
    
    if (menuTrigger && megaMenu) {
        menuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            megaMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!megaMenu.contains(e.target) && !menuTrigger.contains(e.target)) {
                menuTrigger.classList.remove('active');
                megaMenu.classList.remove('active');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                menuTrigger.classList.remove('active');
                megaMenu.classList.remove('active');
            }
        });
    }

    // Search Functionality
    const searchTrigger = document.querySelector('.search-trigger');
    if (searchTrigger) {
        searchTrigger.addEventListener('click', function() {
            // Implement search functionality here
            alert('Search functionality coming soon!');
        });
    }

    // Smooth scrolling for anchor links
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

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribed!';
            submitButton.disabled = true;
            
            // Reset form
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
    }

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    });
});
