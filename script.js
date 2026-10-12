document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menu');
  navigation?.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' });
  revealItems.forEach((item) => observer.observe(item));
}

// Parallax leve por movimento do ponteiro; não adiciona listener de scroll.
const hero = document.querySelector('.hero');
const heroPhoto = document.querySelector('.hero-photo');
if (hero && heroPhoto && !reducedMotion && matchMedia('(pointer:fine)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroPhoto.style.setProperty('--parallax-x', `${-x * 8}px`);
    heroPhoto.style.setProperty('--parallax-y', `${-y * 6}px`);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    heroPhoto.style.setProperty('--parallax-x', '0px');
    heroPhoto.style.setProperty('--parallax-y', '0px');
  }, { passive: true });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
