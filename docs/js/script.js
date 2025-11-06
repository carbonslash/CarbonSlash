// --- FONT LOADING & EXPERIENCE CONTROL ---
// Prevents flash of unstyled text by waiting until fonts are ready.
document.addEventListener('DOMContentLoaded', () => {
  if ('fonts' in document) {
    Promise.all([
      document.fonts.load("400 1em 'Rubik Dirt'"),
      document.fonts.load("400 1em 'DM Serif Display'")
    ])
      .then(() => {
        document.body.classList.remove('loading-fonts');
        console.log('%cCarbon Slash fonts loaded successfully.', 'color:#00CFFF; font-weight:bold;');
      })
      .catch(err => {
        console.error('Font loading failed:', err);
        document.body.classList.remove('loading-fonts');
      });
  } else {
    // Fallback for older browsers
    setTimeout(() => {
      document.body.classList.remove('loading-fonts');
    }, 500);
  }
});

// --- INTERACTIVITY (Optional polish layer) ---
// Smooth header transparency change on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Fade-in reveal on scroll ---
const revealElements = document.querySelectorAll('.section, .card, .feature, .merch-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));
