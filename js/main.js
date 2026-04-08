/**
 * ECOTECH - Inovação Sustentável
 * JavaScript principal - validações e interações
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSearchForm();
  initNewsletter();
  initSmoothScroll();
  initTextAnimations();
  initContactForm();
});

/* ---------- Menu Mobile ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    const expanded = nav.classList.contains('active');
    toggle.setAttribute('aria-expanded', expanded);
    toggle.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

/* ---------- Busca ---------- */
function initSearchForm() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');

  if (!form || !input) return;

  const btn = form.querySelector('.header__search-btn');
  if (!btn) return;

  const originalIcon = btn.innerHTML;

  const iconSpinner = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
  const iconNotFound = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8.5" y1="8.5" x2="13.5" y2="13.5"/><line x1="13.5" y1="8.5" x2="8.5" y2="13.5"/></svg>`;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (btn.disabled) return;

    const query = input.value.trim();

    if (query.length < 2) {
      showMessage(input, 'Digite pelo menos 2 caracteres para buscar.');
      return;
    }

    // Estado: buscando
    btn.innerHTML = iconSpinner;
    btn.classList.add('header__search-btn--searching');
    btn.disabled = true;

    setTimeout(() => {
      // Estado: sem resultados
      btn.classList.remove('header__search-btn--searching');
      btn.classList.add('header__search-btn--no-results');
      btn.innerHTML = iconNotFound;

      const rect = form.getBoundingClientRect();
      const tooltip = document.createElement('span');
      tooltip.className = 'header__search-no-results';
      tooltip.textContent = 'Nenhum resultado encontrado';
      tooltip.style.top = (rect.bottom + 6) + 'px';
      tooltip.style.left = (rect.left + rect.width / 2) + 'px';
      document.body.appendChild(tooltip);

      setTimeout(() => {
        btn.classList.remove('header__search-btn--no-results');
        btn.innerHTML = originalIcon;
        btn.disabled = false;
        tooltip.remove();
      }, 2500);
    }, 1500);
  });
}

/* ---------- Newsletter ---------- */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');

  if (!form || !emailInput) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Validação de e-mail
    if (!email) {
      showMessage(emailInput, 'Por favor, informe seu e-mail.');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage(emailInput, 'Por favor, informe um e-mail válido.');
      return;
    }

    // Simulação de envio bem-sucedido
    showMessage(emailInput, 'E-mail cadastrado com sucesso!', 'success');
    emailInput.value = '';
  });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---------- Animações de texto (Intersection Observer) ---------- */
function initTextAnimations() {
  const elements = document.querySelectorAll('.anim-text');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('is-visible'), Number(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  elements.forEach(el => observer.observe(el));
}

/* ---------- Formulário de Contato ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  // Máscara de telefone
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      e.target.value = value;
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value;
    const message = messageInput.value.trim();

    if (!name || name.length < 3) {
      showMessage(nameInput, 'Por favor, informe seu nome completo.');
      nameInput.focus();
      return;
    }

    if (!email || !isValidEmail(email)) {
      showMessage(emailInput, 'Por favor, informe um e-mail válido.');
      emailInput.focus();
      return;
    }

    if (!subject) {
      showMessage(subjectInput, 'Por favor, selecione um assunto.');
      subjectInput.focus();
      return;
    }

    if (!message || message.length < 10) {
      showMessage(messageInput, 'A mensagem deve ter pelo menos 10 caracteres.');
      messageInput.focus();
      return;
    }

    // Simulação de envio
    showMessage(form.querySelector('.contato__submit'), 'Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    form.reset();
  });
}

/* ---------- Utilitários ---------- */

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showMessage(inputEl, message, type = 'error') {
  // Remove mensagem anterior se existir
  const existingMsg = inputEl.parentElement.querySelector('.form-message');
  if (existingMsg) existingMsg.remove();

  const msgEl = document.createElement('span');
  msgEl.className = `form-message form-message--${type}`;
  msgEl.textContent = message;
  msgEl.style.cssText = `
    display: block;
    font-size: 0.78rem;
    margin-top: 6px;
    color: ${type === 'error' ? '#e74c3c' : '#2ecc71'};
    position: absolute;
    bottom: -22px;
    left: 0;
  `;

  inputEl.parentElement.style.position = 'relative';
  inputEl.parentElement.appendChild(msgEl);

  // Remove a mensagem após 4 segundos
  setTimeout(() => {
    if (msgEl.parentElement) {
      msgEl.remove();
    }
  }, 4000);
}
