import './faq-hero.css';

// Every page uses the same primary navigation, even if an older page template
// has a shorter version of the header.
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const primaryNavMarkup = `
  <a href="about.html">Our home</a>
  <a href="programs.html">Care &amp; play</a>
  <a href="faq.html">FAQs</a>
  <a href="safety.html">Safety</a>
  <a href="resources.html">For families</a>
  <a href="enrollment.html">Enrollment</a>
  <a href="contact.html">Contact</a>
  <a class="button button-small" href="contact.html">Schedule a tour <span>→</span></a>
`;

if (nav) {
  nav.id = 'site-navigation';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.innerHTML = primaryNavMarkup;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelector(`a[href="${currentPage}"]`)?.setAttribute('aria-current', 'page');
}

if (menuButton) {
  menuButton.setAttribute('aria-controls', 'site-navigation');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = '<span class="menu-label">Menu</span><span class="menu-icon">☰</span>';
}

// One shared footer keeps the site polished and consistent as pages evolve.
if (!document.querySelector('link[data-footer-styles]') && !document.querySelector('link[href="footer.css"]')) {
  const footerStyles = document.createElement('link');
  footerStyles.rel = 'stylesheet';
  footerStyles.href = 'footer.css';
  footerStyles.dataset.footerStyles = 'true';
  document.head.append(footerStyles);
}

const footerMarkup = `
  <div class="footer-top">
    <a class="brand footer-brand" href="index.html" aria-label="T.L.C. Footprints home"><span class="brand-mark">TLC</span><span>T.L.C. Footprints<small>HOME DAYCARE</small></span></a>
    <p>Where little feet leave<br><em>everlasting footprints.</em></p>
    <a class="button" href="contact.html">Schedule a tour <span>→</span></a>
  </div>
  <div class="footer-grid footer-grid-premium">
    <div><p class="footer-label">Get in touch</p><a href="tel:+19165550148">(916) 555-0148</a><a href="mailto:hello@tlcfootprintsdaycare.com">hello@tlcfootprintsdaycare.com</a><a class="footer-directions" href="https://www.google.com/maps/search/?api=1&amp;query=Elk+Grove%2C+California" target="_blank" rel="noopener noreferrer">Get directions <span>↗</span></a></div>
    <div><p class="footer-label">Visit us</p><p>Elk Grove, California</p><p>Mon–Fri · 7:30 AM–6:00 PM</p><a class="footer-license" href="contact.html">Licensed California family home daycare</a></div>
    <div><p class="footer-label">Explore</p><a href="about.html">Our home</a><a href="programs.html">Care &amp; play</a><a href="enrollment.html">Enrollment info</a><a href="faq.html">Parent FAQs</a></div>
    <a class="footer-map" href="https://www.google.com/maps/search/?api=1&amp;query=Elk+Grove%2C+California" target="_blank" rel="noopener noreferrer" aria-label="Open T.L.C. Footprints service area in Google Maps"><iframe title="T.L.C. Footprints service area in Elk Grove" src="https://www.google.com/maps?q=Elk+Grove,+California&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><span>Elk Grove, CA <b>Open map ↗</b></span></a>
  </div>
  <div class="footer-bottom"><span>© 2026 T.L.C. Footprints Home Daycare</span><nav aria-label="Footer legal links"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="contact.html">Accessibility</a></nav><span>Designed by <a href="https://alectronicsolutions.com" target="_blank" rel="noopener noreferrer">Alectronic Solutions ↗</a></span></div>
`;

document.querySelectorAll('footer').forEach((footer) => {
  footer.className = 'site-footer';
  footer.id = 'contact';
  footer.innerHTML = footerMarkup;
});

// Keep punctuation friendly and consistent across every rendered page.
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const textNodes = [];
while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
textNodes.forEach((node) => {
  if (node.parentElement?.tagName !== 'SCRIPT') {
    node.nodeValue = node.nodeValue.replaceAll('—', ',').replaceAll('–', ' to ');
  }
});

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.innerHTML = open ? '<span class="menu-label">Close</span><span class="menu-icon">×</span>' : '<span class="menu-label">Menu</span><span class="menu-icon">☰</span>';
});

// Let keyboard visitors close the mobile navigation as predictably as pointer visitors.
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !nav?.classList.contains('open')) return;
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.focus();
});

const tourForm = document.querySelector('#tour-form');
tourForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  if (!tourForm.checkValidity()) {
    tourForm.reportValidity();
    if (status) status.textContent = 'Please complete the required fields before sending your request.';
    return;
  }
  const endpoint = tourForm.dataset.endpoint?.trim();
  if (!endpoint) {
    if (status) status.textContent = 'Online tour requests are not connected yet. Please do not enter private information until this form is live.';
    return;
  }
  const button = tourForm.querySelector('button[type="submit"]');
  button?.setAttribute('disabled', '');
  if (status) status.textContent = 'Sending your request…';
  try {
    const response = await fetch(endpoint, { method: 'POST', body: new FormData(tourForm), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Request failed');
    tourForm.reset();
    if (status) status.textContent = 'Thank you—your tour request was sent. We’ll be in touch soon.';
  } catch {
    if (status) status.textContent = 'We could not send your request. Please try again shortly.';
  } finally {
    button?.removeAttribute('disabled');
  }
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    const symbol = item.querySelector('summary span');
    if (symbol) symbol.textContent = item.open ? '−' : '+';
  });
});

const heroVideo = document.querySelector('.hero-video');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Keep the practical family links visible in the primary navigation without
// duplicating the same menu markup across every static document.
const mainNavigation = document.querySelector('.main-nav');
if (mainNavigation && !mainNavigation.querySelector('a[href="safety.html"]')) {
  const safetyLink = document.createElement('a');
  safetyLink.href = 'safety.html';
  safetyLink.textContent = 'Safety';
  safetyLink.dataset.familyLinks = 'true';
  const resourcesLink = document.createElement('a');
  resourcesLink.href = 'resources.html';
  resourcesLink.textContent = 'For families';
  resourcesLink.dataset.familyLinks = 'true';
  const enrollmentLink = document.createElement('a');
  enrollmentLink.href = 'enrollment.html#availability';
  enrollmentLink.textContent = 'Enrollment';
  enrollmentLink.dataset.enrollmentLink = 'true';
  const contactLink = mainNavigation.querySelector('a[href="contact.html"]');
  if (contactLink) contactLink.before(safetyLink, resourcesLink, enrollmentLink);
  else mainNavigation.append(safetyLink, resourcesLink, enrollmentLink);
}

// Keep the About-page backdrop quietly responsive to a mouse without turning
// the section into a distraction. Touch visitors get the composed resting view.
const valuesBand = document.querySelector('.value-band');
const finePointer = window.matchMedia('(pointer: fine)');
if (valuesBand && !reduceMotion.matches && finePointer.matches) {
  let valuesFrame = false;
  let bubbleX = 0;
  let bubbleY = 0;
  const paintValuesBubbles = () => {
    valuesBand.style.setProperty('--bubble-one-x', `${(bubbleX * .5).toFixed(1)}px`);
    valuesBand.style.setProperty('--bubble-one-y', `${(bubbleY * .42).toFixed(1)}px`);
    valuesBand.style.setProperty('--bubble-two-x', `${(bubbleX * -.8).toFixed(1)}px`);
    valuesBand.style.setProperty('--bubble-two-y', `${(bubbleY * -.68).toFixed(1)}px`);
    valuesBand.style.setProperty('--bubble-three-x', `${(bubbleX * .34).toFixed(1)}px`);
    valuesBand.style.setProperty('--bubble-three-y', `${(bubbleY * -.55).toFixed(1)}px`);
    valuesFrame = false;
  };
  valuesBand.addEventListener('pointermove', (event) => {
    const bounds = valuesBand.getBoundingClientRect();
    bubbleX = ((event.clientX - bounds.left) / bounds.width - .5) * 56;
    bubbleY = ((event.clientY - bounds.top) / bounds.height - .5) * 56;
    if (!valuesFrame) { window.requestAnimationFrame(paintValuesBubbles); valuesFrame = true; }
  });
  valuesBand.addEventListener('pointerleave', () => {
    bubbleX = 0; bubbleY = 0;
    if (!valuesFrame) { window.requestAnimationFrame(paintValuesBubbles); valuesFrame = true; }
  });
}

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

// Give the care-programs photograph a quiet sense of depth while its content
// moves through the viewport. The image itself remains still for visitors who
// prefer reduced motion.
const programsSection = document.querySelector('#programs');
if (programsSection && !reduceMotion.matches) {
  let programsTicking = false;
  const updateProgramsParallax = () => {
    const bounds = programsSection.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const offset = Math.max(-38, Math.min(38, (bounds.top + bounds.height / 2 - viewport / 2) * -0.1));
    programsSection.style.setProperty('--programs-parallax', `${offset.toFixed(1)}px`);
    programsTicking = false;
  };
  const requestProgramsUpdate = () => {
    if (!programsTicking) { window.requestAnimationFrame(updateProgramsParallax); programsTicking = true; }
  };
  window.addEventListener('scroll', requestProgramsUpdate, { passive: true });
  window.addEventListener('resize', requestProgramsUpdate, { passive: true });
  updateProgramsParallax();
}

// The About-page classroom image follows the visitor's scroll just enough to
// create depth without competing with the story copy.
const storyHero = document.querySelector('.inner-hero:has(+ .about)');
if (storyHero && !reduceMotion.matches) {
  let storyTicking = false;
  const updateStoryParallax = () => {
    const bounds = storyHero.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const offset = Math.max(-32, Math.min(32, (bounds.top + bounds.height / 2 - viewport / 2) * -0.08));
    storyHero.style.setProperty('--story-parallax', `${offset.toFixed(1)}px`);
    storyTicking = false;
  };
  const requestStoryUpdate = () => {
    if (!storyTicking) { window.requestAnimationFrame(updateStoryParallax); storyTicking = true; }
  };
  window.addEventListener('scroll', requestStoryUpdate, { passive: true });
  window.addEventListener('resize', requestStoryUpdate, { passive: true });
  updateStoryParallax();
}

const faqHero = document.querySelector('body:has(.faq) .inner-hero');
if (faqHero && !reduceMotion.matches) {
  let faqTicking = false;
  const updateFaqParallax = () => {
    const bounds = faqHero.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const offset = Math.max(-30, Math.min(30, (bounds.top + bounds.height / 2 - viewport / 2) * -0.08));
    faqHero.style.setProperty('--faq-parallax', `${offset.toFixed(1)}px`);
    faqTicking = false;
  };
  const requestFaqUpdate = () => {
    if (!faqTicking) { window.requestAnimationFrame(updateFaqParallax); faqTicking = true; }
  };
  window.addEventListener('scroll', requestFaqUpdate, { passive: true });
  window.addEventListener('resize', requestFaqUpdate, { passive: true });
  updateFaqParallax();
}

const enrollmentHero = document.querySelector('.enrollment-hero');
if (enrollmentHero && !reduceMotion.matches) {
  let enrollmentTicking = false;
  const updateEnrollmentParallax = () => {
    const bounds = enrollmentHero.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const offset = Math.max(-32, Math.min(32, (bounds.top + bounds.height / 2 - viewport / 2) * -0.08));
    enrollmentHero.style.setProperty('--enrollment-parallax', `${offset.toFixed(1)}px`);
    enrollmentTicking = false;
  };
  const requestEnrollmentUpdate = () => {
    if (!enrollmentTicking) { window.requestAnimationFrame(updateEnrollmentParallax); enrollmentTicking = true; }
  };
  window.addEventListener('scroll', requestEnrollmentUpdate, { passive: true });
  window.addEventListener('resize', requestEnrollmentUpdate, { passive: true });
  updateEnrollmentParallax();
}

// Move the welcome illustration in layers as it crosses the viewport.
const scrollArtwork = document.querySelector('[data-scroll-art]');
if (scrollArtwork && !reduceMotion.matches) {
  let artTicking = false;
  const updateScrollArtwork = () => {
    const bounds = scrollArtwork.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const centerDistance = (bounds.top + bounds.height / 2 - viewport / 2) / (viewport / 2 + bounds.height / 2);
    const scrollAmount = Math.max(-1, Math.min(1, centerDistance));
    const progress = 1 - Math.min(1, Math.abs(scrollAmount));
    scrollArtwork.style.setProperty('--about-scroll', scrollAmount.toFixed(3));
    scrollArtwork.style.setProperty('--about-progress', progress.toFixed(3));
    artTicking = false;
  };
  const requestArtworkUpdate = () => {
    if (!artTicking) { window.requestAnimationFrame(updateScrollArtwork); artTicking = true; }
  };
  window.addEventListener('scroll', requestArtworkUpdate, { passive: true });
  window.addEventListener('resize', requestArtworkUpdate, { passive: true });
  updateScrollArtwork();
}

// Storybook depth for the tour invitation: scrolling moves its backdrop and
// a fine-pointer visitor can gently nudge the decorative illustration.
const tourSection = document.querySelector('.tour');
const tourArt = document.querySelector('.tour-art');
if (tourSection && !reduceMotion.matches) {
  let tourTicking = false;
  const updateTourDepth = () => {
    const bounds = tourSection.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const offset = Math.max(-30, Math.min(30, (bounds.top + bounds.height / 2 - viewport / 2) * -0.08));
    tourSection.style.setProperty('--tour-scroll', `${offset.toFixed(1)}px`);
    tourTicking = false;
  };
  const requestTourDepth = () => {
    if (!tourTicking) { window.requestAnimationFrame(updateTourDepth); tourTicking = true; }
  };
  window.addEventListener('scroll', requestTourDepth, { passive: true });
  window.addEventListener('resize', requestTourDepth, { passive: true });
  updateTourDepth();
}

// A small, self-contained game adds a human moment to the tour invitation.
const gameBoard = document.querySelector('.game-board');
if (gameBoard) {
  const gameCells = [...gameBoard.querySelectorAll('.game-cell')];
  const gameStatus = document.querySelector('.game-status');
  const newGame = document.querySelector('.new-game');
  const winningLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let board = Array(9).fill('');
  let complete = false;
  let playerTurn = true;
  let gameRound = 0;
  const winner = () => winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
  const render = () => gameCells.forEach((cell, index) => { cell.textContent = board[index]; cell.disabled = Boolean(board[index]) || complete || !playerTurn; cell.setAttribute('aria-label', board[index] ? `Square ${index + 1}: ${board[index]}` : `Square ${index + 1}: empty`); });
  const finishGame = () => {
    const line = winner();
    if (line) { complete = true; render(); line.forEach((index) => gameCells[index].classList.add('is-winning')); gameStatus.textContent = board[line[0]] === 'X' ? 'You won! Nicely played.' : 'O wins this one. Try again?'; return true; }
    if (board.every(Boolean)) { complete = true; render(); gameStatus.textContent = 'A draw, good game!'; return true; }
    return false;
  };
  const computerMove = (round) => {
    if (round !== gameRound) return;
    const openSquares = board.map((value, index) => value ? null : index).filter((index) => index !== null);
    if (!openSquares.length || complete) return;
    const pick = openSquares[Math.floor(Math.random() * openSquares.length)];
    board[pick] = 'O'; playerTurn = true; render();
    if (!finishGame()) gameStatus.textContent = 'Your turn.';
  };
  gameCells.forEach((cell, index) => cell.addEventListener('click', () => {
    if (board[index] || complete) return;
    board[index] = 'X'; playerTurn = false; render();
    if (!finishGame()) { const round = gameRound; gameStatus.textContent = 'O is thinking…'; window.setTimeout(() => computerMove(round), 260); }
  }));
  newGame?.addEventListener('click', () => { gameRound += 1; board = Array(9).fill(''); complete = false; playerTurn = true; gameCells.forEach((cell) => cell.classList.remove('is-winning')); gameStatus.textContent = 'You’re X. Pick a square.'; render(); });
  render();
}

// Let the content arrive as the visitor reaches it, keeping the page calm while
// giving the handmade illustrations and cards a little more presence.
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const animatedGroups = [
    ['.highlights', '.highlights-intro, .highlight-list article'],
    ['.about', '.about-image, .about-copy'],
    ['.programs', '.section-heading, .program-card, .care-points'],
    ['.reasons', '.reason-intro, .reason-grid article'],
    ['.tour', '.tour-content, .tour-art'],
    ['.faq', '.faq-intro, .faq-list details']
  ];

  animatedGroups.forEach(([sectionSelector, itemSelector]) => {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    const items = section.querySelectorAll(itemSelector);
    items.forEach((item, index) => {
      item.classList.add('reveal-on-scroll');
      item.style.setProperty('--reveal-delay', `${Math.min(index * 90, 450)}ms`);
    });
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16 });
    observer.observe(section);
  });
}
