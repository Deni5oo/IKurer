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
    
    // Закрыть все другие элементы
    document.querySelectorAll('.faq-question').forEach(item => {
      if (item !== q) {
        item.classList.remove('active');
        item.nextElementSibling.classList.remove('show');
      }
    });
    
    // Переключить текущий элемент
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

// Throttle function для оптимизации скролла
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
    
    // Skip if it's a modal link
    if (href === '#privacy' || href === '#terms') {
      return;
    }
    
    e.preventDefault();
    
    // Close mobile menu
    nav.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // Scroll to target
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

// Open Privacy Modal
function openPrivacyModal(e) {
  e.preventDefault();
  privacyModal.setAttribute('aria-hidden', 'false');
  privacyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus trap for accessibility
  const firstFocusable = privacyModal.querySelector('button, [href], input, select, textarea');
  if (firstFocusable) firstFocusable.focus();
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
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// ============================================
// ФУНКЦИИ МАСКИ И ВАЛИДАЦИИ ТЕЛЕФОНА
// ============================================

/**
 * Создает маску для телефона в формате: +7 (___) ___-__-__
 */
function createPhoneMask(input) {
  // Устанавливаем начальное значение при фокусе, если поле пустое
  input.addEventListener('focus', function() {
    if (!this.value || this.value.trim() === '') {
      this.value = '+7 (';
      setTimeout(() => {
        this.setSelectionRange(4, 4);
      }, 0);
    }
  });

  input.addEventListener('input', function(e) {
    const cursorPosition = this.selectionStart;
    let value = this.value;
    
    // Удаляем все нецифровые символы кроме плюса в начале
    let digits = value.replace(/\D/g, '');
    
    // Если первый символ 8, заменяем на 7
    if (digits.startsWith('8')) {
      digits = '7' + digits.substring(1);
    }
    
    // Если нет кода страны, добавляем 7
    if (digits.length > 0 && !digits.startsWith('7')) {
      digits = '7' + digits;
    }
    
    // Ограничиваем длину до 11 цифр (код страны + 10 цифр)
    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }
    
    // Форматируем номер
    let formattedValue = '';
    if (digits.length >= 1) {
      formattedValue = '+7';
    }
    
    if (digits.length > 1) {
      formattedValue += ' (' + digits.substring(1, 4);
    }
    
    if (digits.length >= 4) {
      formattedValue += ') ' + digits.substring(4, 7);
    }
    
    if (digits.length >= 7) {
      formattedValue += '-' + digits.substring(7, 9);
    }
    
    if (digits.length >= 9) {
      formattedValue += '-' + digits.substring(9, 11);
    }
    
    // Добавляем подчеркивания для незаполненных позиций
    if (digits.length < 4) {
      formattedValue += '___'.substring(0, 4 - digits.length);
    }
    if (digits.length >= 4 && digits.length < 7) {
      const underscores = 7 - digits.length;
      formattedValue += '___'.substring(0, underscores);
    }
    if (digits.length >= 7 && digits.length < 9) {
      const underscores = 9 - digits.length;
      formattedValue += '__'.substring(0, underscores);
    }
    if (digits.length >= 9 && digits.length < 11) {
      const underscores = 11 - digits.length;
      formattedValue += '__'.substring(0, underscores);
    }
    
    this.value = formattedValue;
    
    // Корректируем позицию курсора
    let newCursorPosition = cursorPosition;
    
    // Если пользователь вводит цифру, продвигаем курсор вперед
    if (value.length < this.value.length) {
      // Находим следующую позицию для цифры
      const currentChar = this.value[newCursorPosition];
      if (currentChar && !/\d/.test(currentChar)) {
        newCursorPosition++;
      }
    }
    
    // Ограничиваем позицию курсора
    newCursorPosition = Math.min(newCursorPosition, this.value.length);
    
    setTimeout(() => {
      this.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  });

  // Обработка клавиш Backspace и Delete
  input.addEventListener('keydown', function(e) {
    const cursorPosition = this.selectionStart;
    
    // Если нажат Backspace и курсор в начале маски
    if (e.key === 'Backspace') {
      if (cursorPosition <= 4) {
        e.preventDefault();
        return false;
      }
      
      // Если курсор перед символом маски, перемещаем его назад
      if (['(', ')', ' ', '-'].includes(this.value[cursorPosition - 1])) {
        e.preventDefault();
        this.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      }
    }
    
    // Если нажат Delete и курсор в начале маски
    if (e.key === 'Delete') {
      if (cursorPosition < 4) {
        e.preventDefault();
        return false;
      }
      
      // Если курсор после символа маски, перемещаем его вперед
      if (['(', ')', ' ', '-'].includes(this.value[cursorPosition])) {
        e.preventDefault();
        this.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      }
    }
  });

  // Валидация при потере фокуса
  input.addEventListener('blur', function() {
    const digits = this.value.replace(/\D/g, '');
    if (digits.length === 11) {
      this.style.borderColor = '';
      this.classList.remove('invalid');
    } else {
      this.style.borderColor = '#ff6b35';
      this.classList.add('invalid');
    }
  });
}

/**
 * Валидация номера телефона
 */
function validatePhone(phoneValue) {
  // Удаляем все нецифровые символы и подчеркивания
  const cleanValue = phoneValue.replace(/[_\s\-()]/g, '');
  const digits = cleanValue.replace(/\D/g, '');
  
  // Проверяем, что номер начинается с +7
  if (!cleanValue.startsWith('+7')) {
    return false;
  }
  
  // Проверяем длину (11 цифр с кодом страны)
  if (digits.length !== 11) {
    return false;
  }
  
  // Проверяем, что все символы после +7 - цифры
  const numberPart = cleanValue.substring(2);
  if (!/^\d+$/.test(numberPart)) {
    return false;
  }
  
  return true;
}

/**
 * Валидация всей формы
 */
function setupFormValidation() {
  const leadForm = document.getElementById('leadForm');
  
  if (!leadForm) return;
  
  // Находим поле телефона
  const phoneInput = leadForm.querySelector('input[name="phone"]');
  
  // Применяем маску к полю телефона
  if (phoneInput) {
    createPhoneMask(phoneInput);
    
    // Добавляем подсказку под полем
    const hint = document.createElement('div');
    hint.className = 'phone-mask-hint';
    hint.textContent = 'Формат: +7 (XXX) XXX-XX-XX';
    phoneInput.parentNode.insertBefore(hint, phoneInput.nextSibling);
  }
  
  // Валидация при отправке формы
  leadForm.addEventListener('submit', (e) => {
    const name = leadForm.querySelector('input[name="name"]');
    const city = leadForm.querySelector('input[name="city"]');
    const phone = leadForm.querySelector('input[name="phone"]');
    
    let valid = true;
    const errors = [];
    
    // Валидация имени
    if (!name.value.trim()) {
      name.style.borderColor = '#ff6b35';
      name.setAttribute('aria-invalid', 'true');
      valid = false;
      errors.push('Введите ваше имя');
    } else if (name.value.trim().length < 2) {
      name.style.borderColor = '#ff6b35';
      name.setAttribute('aria-invalid', 'true');
      valid = false;
      errors.push('Имя должно содержать минимум 2 символа');
    } else {
      name.style.borderColor = '';
      name.setAttribute('aria-invalid', 'false');
    }
    
    // Валидация города
    if (!city.value.trim()) {
      city.style.borderColor = '#ff6b35';
      city.setAttribute('aria-invalid', 'true');
      valid = false;
      errors.push('Введите ваш город');
    } else if (city.value.trim().length < 2) {
      city.style.borderColor = '#ff6b35';
      city.setAttribute('aria-invalid', 'true');
      valid = false;
      errors.push('Название города должно содержать минимум 2 символа');
    } else {
      city.style.borderColor = '';
      city.setAttribute('aria-invalid', 'false');
    }
    
    // Валидация телефона
    if (!phone.value.trim() || phone.value === '+7 (') {
      phone.style.borderColor = '#ff6b35';
      phone.setAttribute('aria-invalid', 'true');
      valid = false;
      errors.push('Введите номер телефона');
    } else if (!validatePhone(phone.value)) {
      phone.style.borderColor = '#ff6b35';
      phone.setAttribute('aria-invalid', 'true');
      valid = false;
      
      const digits = phone.value.replace(/\D/g, '');
      if (digits.length !== 11) {
        errors.push(`Номер телефона должен содержать 11 цифр`);
      } else {
        errors.push('Введите корректный номер телефона');
      }
    } else {
      phone.style.borderColor = '';
      phone.setAttribute('aria-invalid', 'false');
    }
    
    // Если есть ошибки, показываем их и предотвращаем отправку
    if (!valid) {
      e.preventDefault();
      
      // Создаем или находим контейнер для ошибок
      let errorContainer = leadForm.querySelector('.error-container');
      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        errorContainer.setAttribute('role', 'alert');
        leadForm.appendChild(errorContainer);
      }
      
      // Форматируем ошибки в список
      const errorList = errors.map(error => `• ${error}`).join('\n');
      errorContainer.textContent = `Пожалуйста, исправьте следующие ошибки:\n${errorList}`;
      
      // Прокручиваем к ошибкам
      errorContainer.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Фокусируемся на первом поле с ошибкой
      const firstErrorField = leadForm.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.focus();
      }
      
      // Отправляем событие в Яндекс.Метрику
      if (typeof ym !== 'undefined') {
        ym(106218469, 'reachGoal', 'form_validation_error');
      }
    } else {
      // Удаляем контейнер с ошибками, если он есть
      const errorContainer = leadForm.querySelector('.error-container');
      if (errorContainer) {
        errorContainer.remove();
      }
      
      // Отправляем событие в Яндекс.Метрику
      if (typeof ym !== 'undefined') {
        ym(106218469, 'reachGoal', 'form_submitted');
      }
      
      // Форма будет отправлена нормально
      console.log('Форма валидна, отправка данных...');
    }
  });
  
  // Real-time валидация при вводе
  leadForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
      // Сразу убираем красную обводку при начале ввода
      this.style.borderColor = '';
      this.setAttribute('aria-invalid', 'false');
      
      // Удаляем сообщение об ошибке
      const errorContainer = leadForm.querySelector('.error-container');
      if (errorContainer) {
        errorContainer.remove();
      }
    });
  });
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Close mobile menu by default
  nav.classList.remove('active');
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  
  // Настройка валидации формы с маской телефона
  setupFormValidation();
  
  // Add animation classes after a short delay for initial load
  setTimeout(() => {
    document.querySelectorAll('.feature-card, .step, .review-card').forEach(el => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('animate-fadeInUp');
      }
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
    
    // Предзагрузка fallback для изображений, которых может не быть
    if (!img.complete) {
      img.addEventListener('load', function() {
        console.log('Изображение загружено:', this.src);
      });
    }
  });
  
  // Smooth scroll for page load with anchor
  if (window.location.hash && window.location.hash !== '#') {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        scrollToElement(window.location.hash);
      }
    }, 100);
  }
  
  // Добавляем обработчик для prefers-reduced-motion
  const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionMediaQuery.addEventListener('change', () => {
    if (motionMediaQuery.matches) {
      document.querySelectorAll('.animate-fadeInUp').forEach(el => {
        el.classList.remove('animate-fadeInUp');
      });
    }
  });
});

// Глобальный обработчик ошибок
window.addEventListener('error', (event) => {
  console.error('Ошибка JavaScript:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Необработанное исключение Promise:', event.reason);
});
