/* ════════════════════════════════════════════════
   MOHID RAMZAN — FLUTTER DEVELOPER PORTFOLIO JS
   ════════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════════
// 1. CURSOR GLOW
// ══════════════════════════════════════════════════
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

// ══════════════════════════════════════════════════
// 2. NAVBAR — scroll effect + hamburger
// ══════════════════════════════════════════════════
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('mobile-nav-open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('mobile-nav-open');
    });
  });
}

// ══════════════════════════════════════════════════
// 3. TYPING EFFECT — hero role text
// ══════════════════════════════════════════════════
const typedEl = document.getElementById('typed-role');

const roles = [
  'Flutter Developer',
  'Dart Programmer',
  'Mobile App Builder',
  'UI/UX Enthusiast',
  'Clean Code Advocate',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 120;

function typeRole() {
  if (!typedEl) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 60;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 120;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    typingDelay = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingDelay = 400;
  }

  setTimeout(typeRole, typingDelay);
}

// Start typing after short delay
setTimeout(typeRole, 800);

// ══════════════════════════════════════════════════
// 4. SCROLL REVEAL ANIMATIONS
// ══════════════════════════════════════════════════
function addRevealClasses() {
  // Section labels and headings
  document.querySelectorAll('.section-label:not(.hero *)').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.section-heading:not(.hero *)').forEach(el => el.classList.add('reveal'));

  // About
  const aboutLeft  = document.querySelector('.about-left');
  const aboutRight = document.querySelector('.about-right');
  if (aboutLeft)  aboutLeft.classList.add('reveal-left');
  if (aboutRight) aboutRight.classList.add('reveal-right');

  // Skill cards — staggered
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // Project cards — staggered
  document.querySelectorAll('.proj-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.12}s`;
  });

  // Experience items
  document.querySelectorAll('.exp-item').forEach((item, i) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${i * 0.15}s`;
  });

  // Contact
  const contactLeft  = document.querySelector('.contact-left');
  const contactRight = document.querySelector('.contact-right');
  if (contactLeft)  contactLeft.classList.add('reveal-left');
  if (contactRight) contactRight.classList.add('reveal-right');
}

function checkReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const windowH   = window.innerHeight;

  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowH - 80) {
      el.classList.add('visible');
    }
  });
}

addRevealClasses();
window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('resize', checkReveal, { passive: true });
// Initial check
setTimeout(checkReveal, 100);

// ══════════════════════════════════════════════════
// 5. SKILL BAR ANIMATION — triggered on scroll
// ══════════════════════════════════════════════════
function animateSkillBars() {
  const bars = document.querySelectorAll('.sc-fill');
  bars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      // The CSS animation handles the fill via @keyframes fillBar
      // We re-trigger by cloning trick
      bar.style.animationPlayState = 'running';
    }
  });
}

// Pause on load, resume when in viewport
document.querySelectorAll('.sc-fill').forEach(bar => {
  bar.style.animationPlayState = 'paused';
});

window.addEventListener('scroll', animateSkillBars, { passive: true });
setTimeout(animateSkillBars, 100);

// ══════════════════════════════════════════════════
// 6. SMOOTH ACTIVE NAV LINK on scroll
// ══════════════════════════════════════════════════
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top    = section.offsetTop - 120;
    const height = section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.id;
    }
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    const href = a.getAttribute('href');
    if (href === `#${current}`) {
      a.style.color = 'var(--text)';
    }
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });

// ══════════════════════════════════════════════════
// 7. COUNTER ANIMATION — stat numbers
// ══════════════════════════════════════════════════
function animateCounter(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const val = parseInt(counter.textContent, 10);
      if (!isNaN(val) && !counter.dataset.counted) {
        counter.dataset.counted = 'true';
        animateCounter(counter, val, 1200);
      }
    }
  });
}

window.addEventListener('scroll', initCounters, { passive: true });
setTimeout(initCounters, 500);

// ══════════════════════════════════════════════════
// 8. PROJECT CARD — tilt effect on hover
// ══════════════════════════════════════════════════
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    const cx   = rect.width  / 2;
    const cy   = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) *  6;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s cubic-bezier(.175,.885,.32,1.275)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .1s ease';
  });
});

// ══════════════════════════════════════════════════
// 9. CONTACT FORM — submit handler
// ══════════════════════════════════════════════════
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;

    // Loading state
    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
    btn.disabled  = true;

    setTimeout(() => {
      // Success state
      btn.innerHTML = '<i class="fa fa-check-circle"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #059669, #34d399)';
      btn.style.boxShadow  = '0 8px 30px rgba(5,150,105,.3)';

      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled  = false;
        btn.style.background = '';
        btn.style.boxShadow  = '';
      }, 3500);
    }, 1600);
  });
}

// ══════════════════════════════════════════════════
// 10. HERO PARALLAX — subtle depth on scroll
// ══════════════════════════════════════════════════
const heroOrb1 = document.querySelector('.orb-1');
const heroOrb2 = document.querySelector('.orb-2');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (heroOrb1) heroOrb1.style.transform = `translateY(${sy * 0.18}px)`;
  if (heroOrb2) heroOrb2.style.transform = `translateY(${sy * -0.12}px)`;
}, { passive: true });

// ══════════════════════════════════════════════════
// 11. FOOTER YEAR
// ══════════════════════════════════════════════════
const yrEl = document.querySelector('.footer-copy');
if (yrEl) {
  yrEl.textContent = yrEl.textContent.replace('2025', new Date().getFullYear());
}

// ══════════════════════════════════════════════════
// 12. INIT LOG
// ══════════════════════════════════════════════════
console.log(
  '%c{ Mohid Ramzan } Flutter Developer Portfolio',
  'background:#7c3aed;color:#fff;padding:8px 16px;border-radius:6px;font-family:monospace;font-size:14px'
);
