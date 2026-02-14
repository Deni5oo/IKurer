// ============================================
// ИСХОДНЫЙ КОД БЕЗ КОНФЛИКТА С FORMSFREE
// ============================================

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
  const isExpanded = nav.classList.toggle('active');
  mobileMenuBtn.innerHTML = isExpanded ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const wasActive = q.classList.contains('active');
    
    document.querySelectorAll('.faq-question').forEach(item => {
      if (item !== q) {
        item.classList.remove('active');
        item.nextElementSibling.classList.remove('show');
      }
    });
    
    q.classList.toggle('active', !wasActive);
    answer.classList.toggle('show', !wasActive);
  });
});

// Scroll animation for elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
      observer.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.feature-card, .step, .review-card').forEach(el => observer.observe(el));

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

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
  };
}

window.addEventListener('scroll', throttle(() => {
  scrollToTopBtn.classList.toggle('active', window.pageYOffset > 300);
}, 100));

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for anchor links
function scrollToElement(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;
  
  const header = document.getElementById('header');
  const headerHeight = header ? header.offsetHeight : 80;
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = targetPosition - headerHeight;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href === '#privacy' || href === '#terms') {
      return;
    }
    
    e.preventDefault();
    
    nav.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    scrollToElement(href);
  });
});

// CTA buttons scroll to form
document.getElementById('headerCtaBtn').addEventListener('click', () => {
  scrollToElement('#leadForm');
});

document.getElementById('heroCtaBtn').addEventListener('click', () => {
  scrollToElement('#leadForm');
});

// Modal functionality
const privacyModal = document.getElementById('privacyModal');
const privacyLink = document.getElementById('privacyLink');
const footerPrivacyLink = document.getElementById('footerPrivacyLink');
const modalClose = document.getElementById('modalClose');

const termsModal = document.getElementById('termsModal');
const termsLink = document.getElementById('termsLink');
const termsModalClose = document.getElementById('termsModalClose');

const paymentModal = document.getElementById('paymentModal');
const paymentNote = document.getElementById('paymentNote');
const paymentModalClose = document.getElementById('paymentModalClose');

function openPrivacyModal(e) {
  e.preventDefault();
  privacyModal.setAttribute('aria-hidden', 'false');
  privacyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const firstFocusable = privacyModal.querySelector('button, [href], input, select, textarea');
  if (firstFocusable) firstFocusable.focus();
}

if (privacyLink) {
  privacyLink.addEventListener('click', openPrivacyModal);
}

if (footerPrivacyLink) {
  footerPrivacyLink.addEventListener('click', openPrivacyModal);
}

modalClose.addEventListener('click', () => {
  privacyModal.setAttribute('aria-hidden', 'true');
  privacyModal.classList.remove('active');
  document.body.style.overflow = '';
});

function openTermsModal(e) {
  e.preventDefault();
  termsModal.setAttribute('aria-hidden', 'false');
  termsModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

if (termsLink) {
  termsLink.addEventListener('click', openTermsModal);
}

termsModalClose.addEventListener('click', () => {
  termsModal.setAttribute('aria-hidden', 'true');
  termsModal.classList.remove('active');
  document.body.style.overflow = '';
});

paymentNote.addEventListener('click', () => {
  paymentModal.setAttribute('aria-hidden', 'false');
  paymentModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

paymentModalClose.addEventListener('click', () => {
  paymentModal.setAttribute('aria-hidden', 'true');
  paymentModal.classList.remove('active');
  document.body.style.overflow = '';
});

document.addEventListener('click', (e) => {
  const modals = document.querySelectorAll('.modal-overlay.active');
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal-overlay.active');
    modals.forEach(modal => {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!e.target.closest('#nav') && !e.target.closest('#mobileMenuBtn') && nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// ============================================
// УДАЛЕН ВЕСЬ КОД, СВЯЗАННЫЙ С ВАЛИДАЦИЕЙ ФОРМЫ,
// МАСКОЙ ТЕЛЕФОНА И ОТПРАВКОЙ ЧЕРЕЗ TELEGRAM/EMAIL
// ТЕПЕРЬ ФОРМА РАБОТАЕТ НАТИВНО ЧЕРЕЗ FORMSFREE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  nav.classList.remove('active');
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  
  setTimeout(() => {
    document.querySelectorAll('.feature-card, .step, .review-card').forEach(el => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('animate-fadeInUp');
      }
    });
  }, 300);
  
  document.querySelectorAll('.review-avatar').forEach(img => {
    img.addEventListener('error', function() {
      const altText = this.getAttribute('alt') || 'А';
      const firstLetter = altText.charAt(0);
      this.src = '';
      this.classList.add('fallback');
      this.textContent = firstLetter;
      this.style.display = 'flex';
      this.style.alignItems = 'center';
      this.style.justifyContent = 'center';
      this.style.fontWeight = 'bold';
      this.style.fontSize = '24px';
      this.style.color = 'var(--primary-dark)';
    });
  });
  
  if (window.location.hash && window.location.hash !== '#') {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        scrollToElement(window.location.hash);
      }
    }, 100);
  }
  
  const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionMediaQuery.addEventListener('change', () => {
    if (motionMediaQuery.matches) {
      document.querySelectorAll('.animate-fadeInUp').forEach(el => {
        el.classList.remove('animate-fadeInUp');
      });
    }
  });
});

window.addEventListener('error', (event) => {
  console.error('Ошибка JavaScript:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Необработанное исключение Promise:', event.reason);
});
