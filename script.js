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
