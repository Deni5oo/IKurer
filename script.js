// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const a = q.nextElementSibling;
    const isActive = q.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-question').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.faq-answer').forEach(answer => answer.classList.remove('show'));
    
    // Open clicked item if it was closed
    if (!isActive) {
      q.classList.add('active');
      a.classList.add('show');
    }
  });
});

// Scroll animation for elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.feature-card, .step, .review-card').forEach(el => observer.observe(el));

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  scrollToTopBtn.classList.toggle('active', window.pageYOffset > 300);
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's a modal link
    if (href === '#privacy' || href === '#terms') {
      return;
    }
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      // Close mobile menu
      nav.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      
      // Scroll to target
      window.scrollTo({ 
        top: target.offsetTop - 80, 
        behavior: 'smooth' 
      });
    }
  });
});

// CTA buttons scroll to form
document.getElementById('headerCtaBtn').addEventListener('click', () => {
  document.getElementById('leadForm').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
});

document.getElementById('heroCtaBtn').addEventListener('click', () => {
  document.getElementById('leadForm').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
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

// Open Privacy Modal
function openPrivacyModal(e) {
  e.preventDefault();
  privacyModal.setAttribute('aria-hidden', 'false');
  privacyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

if (privacyLink) {
  privacyLink.addEventListener('click', openPrivacyModal);
}

if (footerPrivacyLink) {
  footerPrivacyLink.addEventListener('click', openPrivacyModal);
}

// Close Privacy Modal
modalClose.addEventListener('click', () => {
  privacyModal.setAttribute('aria-hidden', 'true');
  privacyModal.classList.remove('active');
  document.body.style.overflow = '';
});

// Open Terms Modal
function openTermsModal(e) {
  e.preventDefault();
  termsModal.setAttribute('aria-hidden', 'false');
  termsModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

if (termsLink) {
  termsLink.addEventListener('click', openTermsModal);
}

// Close Terms Modal
termsModalClose.addEventListener('click', () => {
  termsModal.setAttribute('aria-hidden', 'true');
  termsModal.classList.remove('active');
  document.body.style.overflow = '';
});

// Open Payment Modal
paymentNote.addEventListener('click', () => {
  paymentModal.setAttribute('aria-hidden', 'false');
  paymentModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Close Payment Modal
paymentModalClose.addEventListener('click', () => {
  paymentModal.setAttribute('aria-hidden', 'true');
  paymentModal.classList.remove('active');
  document.body.style.overflow = '';
});

// Close modals when clicking outside content
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

// Close modals with Escape key
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

// Close mobile menu when clicking outside on mobile
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!e.target.closest('#nav') && !e.target.closest('#mobileMenuBtn') && nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }
});

// Form validation (basic)
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    const name = leadForm.querySelector('input[name="name"]');
    const city = leadForm.querySelector('input[name="city"]');
    const phone = leadForm.querySelector('input[name="phone"]');
    
    let valid = true;
    
    if (!name.value.trim()) {
      name.style.borderColor = 'red';
      valid = false;
    } else {
      name.style.borderColor = '';
    }
    
    if (!city.value.trim()) {
      city.style.borderColor = 'red';
      valid = false;
    } else {
      city.style.borderColor = '';
    }
    
    if (!phone.value.trim() || !/^[\d\s\-\+\(\)]+$/.test(phone.value)) {
      phone.style.borderColor = 'red';
      valid = false;
    } else {
      phone.style.borderColor = '';
    }
    
    if (!valid) {
      e.preventDefault();
      alert('Пожалуйста, заполните все поля корректно');
    }
  });
}

// Handle image loading errors - замена на заглушки
document.addEventListener('DOMContentLoaded', () => {
  // Close mobile menu by default
  nav.classList.remove('active');
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  
  // Add animation classes after a short delay for initial load
  setTimeout(() => {
    document.querySelectorAll('.feature-card, .step, .review-card').forEach(el => {
      el.classList.add('animate-fadeInUp');
    });
  }, 300);
  
  // Handle image errors for review avatars
  document.querySelectorAll('.review-avatar').forEach(img => {
    img.addEventListener('error', function() {
      // Get the first letter of the alt text for the fallback
      const altText = this.getAttribute('alt') || 'А';
      const firstLetter = altText.charAt(0);
      
      // Replace with fallback
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
  
  // Smooth scroll for page load with anchor
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
});
