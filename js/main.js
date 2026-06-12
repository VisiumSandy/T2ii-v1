/* ═══════════════════════════════════════════════════════════
   T2II TRANSPORT — MAIN.JS
   Scroll progress · Navbar · Mobile menu · Reveal
   Tracker · Counters · Form validation
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── SCROLL PROGRESS LINE ──────────────────────────────── */
const scrollLine = document.getElementById('scrollLine');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollLine.style.width = pct + '%';
}

/* ─── HERO PARALLAX ─────────────────────────────────────── */
const heroBgImg = document.querySelector('.hero-bg-img');
function updateParallax() {
  if (!heroBgImg || window.innerWidth < 768) return;
  const scrollY = window.scrollY;
  const heroHeight = document.getElementById('hero')?.offsetHeight || window.innerHeight;
  if (scrollY > heroHeight) return;
  heroBgImg.style.transform = `translateY(${scrollY * 0.18}px)`;
}

/* ─── NAVBAR ──────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/* ─── MOBILE MENU ─────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

/* ─── REVEAL ON SCROLL (IntersectionObserver) ─────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── TRACKER WIDGET ANIMATION ────────────────────────────── */
function animateTracker() {
  const steps = document.querySelectorAll('.tracker-step');
  const lines = [
    document.getElementById('line1'),
    document.getElementById('line2'),
    document.getElementById('line3'),
  ];

  // Étape 0 et 1 déjà active, on anime les lignes et complète l'étape 1
  setTimeout(() => {
    if (lines[0]) lines[0].style.width = '100%';
  }, 600);

  setTimeout(() => {
    if (lines[1]) lines[1].style.width = '70%';
    if (steps[1]) steps[1].classList.add('completed');
  }, 1200);
}

/* ─── COUNTER ANIMATION ────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(c => animateCounter(c));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const avantagesSection = document.querySelector('.avantages');
if (avantagesSection) counterObserver.observe(avantagesSection);

/* ─── FORM VALIDATION ──────────────────────────────────────── */
const devisForm = document.getElementById('devisForm');
const formSuccess = document.getElementById('formSuccess');

const validators = {
  nom: { required: true, minLength: 2, error: 'Le nom est requis (minimum 2 caractères).' },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: 'Adresse email invalide.' },
  tel: { required: true, pattern: /^[+\d\s\-().]{7,20}$/, error: 'Numéro de téléphone invalide.' },
  type: { required: true, error: 'Veuillez sélectionner un service.' },
  message: { required: true, minLength: 10, error: 'Décrivez votre demande (minimum 10 caractères).' },
};

function validateField(name, value) {
  const v = validators[name];
  if (!v) return null;
  if (v.required && !value.trim()) return v.error;
  if (v.minLength && value.trim().length < v.minLength) return v.error;
  if (v.pattern && value.trim() && !v.pattern.test(value.trim())) return v.error;
  return null;
}

function setFieldState(name, error) {
  const field = devisForm.querySelector(`[name="${name}"]`);
  const errEl = document.getElementById(name + 'Err');
  if (!field) return;
  field.classList.toggle('error', !!error);
  field.classList.toggle('success', !error && !!field.value.trim());
  if (errEl) errEl.textContent = error || '';
}

// Live validation on blur
Object.keys(validators).forEach(name => {
  const field = devisForm.querySelector(`[name="${name}"]`);
  if (!field) return;
  field.addEventListener('blur', () => {
    const err = validateField(name, field.value);
    setFieldState(name, err);
  });
  field.addEventListener('input', () => {
    if (field.classList.contains('error')) {
      const err = validateField(name, field.value);
      setFieldState(name, err);
    }
  });
});

if (devisForm) {
  devisForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach(name => {
      const field = devisForm.querySelector(`[name="${name}"]`);
      if (!field) return;
      const err = validateField(name, field.value);
      setFieldState(name, err);
      if (err) isValid = false;
    });

    if (!isValid) return;

    // Simulate submission
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.querySelector('.btn-submit-text').textContent = 'Envoi en cours…';

    setTimeout(() => {
      devisForm.style.display = 'none';
      formSuccess.classList.add('visible');
    }, 1200);
  });
}

/* ─── SMOOTH SCROLL FOR NAV LINKS ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── SVG TRUCK ON MAP (MOTIONPATH) ────────────────────────── */
function animateTruckOnMap() {
  const truck = document.getElementById('truckOnMap');
  const route = document.getElementById('routeLine');
  if (!truck || !route) return;

  const pathLength = route.getTotalLength();
  let progress = 0;
  let direction = 1;

  function step() {
    progress += 0.003 * direction;
    if (progress >= 1) { progress = 1; direction = -1; }
    if (progress <= 0) { progress = 0; direction = 1; }

    const pt = route.getPointAtLength(progress * pathLength);
    truck.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ─── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  updateScrollProgress();
  updateParallax();
  animateTracker();

  // Try truck animation (SVG getPointAtLength)
  try { animateTruckOnMap(); } catch(e) { /* silent fail */ }
});

window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateNavbar();
  updateParallax();
}, { passive: true });