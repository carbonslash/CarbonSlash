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
// --- DYNAMIC INSIGHTS FEED ---
document.addEventListener('DOMContentLoaded', function() {
    const feedContainer = document.getElementById('insights-feed');
    if (!feedContainer) return;

    const rssURL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.topgear.com/rss';

    fetch(rssURL)
        .then(res => res.json())
        .then(data => {
            const articles = data.items.slice(0, 6); // Top 6 articles
            articles.forEach(article => {
                const card = document.createElement('a');
                card.className = 'hub-card';
                card.href = article.link;
                card.target = '_blank';
                card.innerHTML = `
                    <div class="hub-overlay"></div>
                    <h3 class="hub-title">${article.title}</h3>
                    <p class="hub-subtitle">${article.pubDate.split(' ')[0]}</p>
                    <span class="hub-link-arrow">→</span>
                `;
                feedContainer.appendChild(card);
            });
        })
        .catch(err => {
            console.error('Failed to fetch Insights feed:', err);
            feedContainer.innerHTML = '<p>Unable to load articles at this time.</p>';
        });
});


