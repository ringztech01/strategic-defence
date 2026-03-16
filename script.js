// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Minimum display time for preloader
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Initialize lazy loading and animations after preloader
      initLazyLoading();
      initScrollAnimations();
      initCounterAnimations();
    }, 500);
  }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScroll > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    });
  }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });
    
    fadeElements.forEach(el => {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback
    fadeElements.forEach(el => {
      el.classList.add('visible');
    });
  }
}

// ============================================
// COUNTER ANIMATIONS
// ============================================
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
          animateCounter(counter, target);
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
  const stepTime = duration / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
}

// ============================================
// SMOOTH REVEAL ON SCROLL
// ============================================
const revealElements = document.querySelectorAll('.product-card, .arch-card, .adv-box, .feature');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ============================================
// MOBILE NAVIGATION
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

function toggleMenu() {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Toggle menu on hamburger click
if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

// Close menu when clicking overlay
if (mobileOverlay) {
  mobileOverlay.addEventListener('click', toggleMenu);
}

// Mobile dropdown toggle
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parent = toggle.closest('.nav-dropdown');
      parent.classList.toggle('active');
    }
  });
});

// Close menu when clicking a link
if (navMenu) {
  navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    toggleMenu();
  }
});


// ============================================
// HERO CAROUSEL (Serve Card)
// ============================================
const carouselImages = [
  { src: 'image/15.png', title: 'We SERVE THOSE WHO SERVE', subtitle: 'Because every hero deserves to come home.' },
  { src: 'image/16.png', title: 'PROTECTING NATIONS', subtitle: 'Advanced security for a safer world.' },
  { src: 'image/7.png', title: 'MISSION-CRITICAL SOLUTIONS', subtitle: 'Reliability when it matters most.' }
];

let carouselIndex = 0;
const serveCard = document.getElementById('serve-card');
const bgSlides = document.querySelectorAll('.bg-slide');
const dots = document.querySelectorAll('.carousel-dot');
const titleEl = serveCard ? serveCard.querySelector('h3') : null;
const subtitleEl = serveCard ? serveCard.querySelector('p') : null;

function updateCarousel(newIndex) {
  if (!serveCard) return;
  
  // Add transitioning class for animation
  serveCard.classList.add('transitioning');
  
  setTimeout(() => {
    // Update background
    bgSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === newIndex);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === newIndex);
    });
    
    // Update text
    if (titleEl && carouselImages[newIndex]) {
      titleEl.textContent = carouselImages[newIndex].title;
    }
    if (subtitleEl && carouselImages[newIndex]) {
      subtitleEl.textContent = carouselImages[newIndex].subtitle;
    }
    
    // Remove transitioning class
    serveCard.classList.remove('transitioning');
  }, 300);
}

function nextSlide() {
  carouselIndex = (carouselIndex + 1) % carouselImages.length;
  updateCarousel(carouselIndex);
}

// Auto-advance carousel
let carouselInterval = setInterval(nextSlide, 5000);

// Dot click handlers
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    // Reset interval on manual interaction
    clearInterval(carouselInterval);
    carouselIndex = index;
    updateCarousel(index);
    carouselInterval = setInterval(nextSlide, 5000);
  });
});

// Pause on hover
if (serveCard) {
  serveCard.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });
  
  serveCard.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
  });
}


// ============================================
// LEAFLET MAP
// ============================================
var map = L.map('map', {
  zoomControl: true
}).setView([10, 20], 2);

L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap'
  }
).addTo(map);

var glowIcon = L.divIcon({
  className: "glow-marker",
  html: "<div class='pulse'></div>",
  iconSize: [20, 20]
});

var abuja = L.marker([9.0765, 7.3986], { icon: glowIcon }).addTo(map);
var beirut = L.marker([33.8938, 35.5018], { icon: glowIcon }).addTo(map);

function flyToLocation(lat, lng) {
  map.flyTo([lat, lng], 6);
}
