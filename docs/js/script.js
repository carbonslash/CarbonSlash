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

    // Grid/List view toggle
    const viewToggle = document.querySelector('.view-toggle');
    if (viewToggle) {
        const gridButton = viewToggle.querySelector('.toggle-button[data-view="grid"]');
        const listButton = viewToggle.querySelector('.toggle-button[data-view="list"]');
        const gridContainer = document.querySelector('.grid-swiss');
        const featuredCards = document.querySelectorAll('.featured-card');

        gridButton.addEventListener('click', function() {
            gridContainer.classList.remove('list-view');
            gridButton.classList.add('active');
            listButton.classList.remove('active');
            
            // Reset featured cards to grid layout
            featuredCards.forEach(card => {
                card.style.gridColumn = 'span 2';
            });
            
            localStorage.setItem('preferredView', 'grid');
        });

        listButton.addEventListener('click', function() {
            gridContainer.classList.add('list-view');
            listButton.classList.add('active');
            gridButton.classList.remove('active');
            
            // Ensure featured cards work in list view
            featuredCards.forEach(card => {
                card.style.gridColumn = 'span 1';
            });
            
            localStorage.setItem('preferredView', 'list');
        });

        // Set initial view from localStorage
        const preferredView = localStorage.getItem('preferredView') || 'grid';
        if (preferredView === 'list') {
            gridContainer.classList.add('list-view');
            listButton.classList.add('active');
            gridButton.classList.remove('active');
            
            // Ensure featured cards work in list view
            featuredCards.forEach(card => {
                card.style.gridColumn = 'span 1';
            });
        } else {
            gridButton.classList.add('active');
            featuredCards.forEach(card => {
                card.style.gridColumn = 'span 2';
            });
        }
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
