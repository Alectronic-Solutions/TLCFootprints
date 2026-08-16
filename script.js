const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.innerHTML = open ? 'Close <span>×</span>' : 'Menu <span>☰</span>';
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    const symbol = item.querySelector('summary span');
    if (symbol) symbol.textContent = item.open ? '−' : '+';
  });
});

const heroVideo = document.querySelector('.hero-video');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (heroVideo && !reduceMotion.matches) {
  let ticking = false;
  const updateHeroParallax = () => {
    const offset = Math.max(-36, Math.min(36, window.scrollY * -0.09));
    heroVideo.style.setProperty('--hero-parallax', `${offset}px`);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateHeroParallax); ticking = true; }
  }, { passive: true });
  updateHeroParallax();
} else if (heroVideo) {
  heroVideo.pause();
}
