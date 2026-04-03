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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (query.length < 2) {
      showMessage(input, 'Digite pelo menos 2 caracteres para buscar.');
      return;
    }

    // Placeholder para futura implementação de busca
    console.log('Busca realizada:', query);
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
