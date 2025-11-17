document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!btn || !menu) return;
  // Toggle open/closed state
  function toggleMenu() {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
      menu.removeAttribute('hidden');
    } else {
      menu.setAttribute('hidden', '');
    }
  }

  // Ensure initial state matches screen size and keep in sync on resize
  const mq = window.matchMedia('(max-width: 880px)');
  function updateForViewport() {
    const isMobile = mq.matches;
    if (isMobile) {
      // mobile: hide menu by default, button collapsed
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      menu.setAttribute('hidden', '');
    } else {
      // desktop: show menu and mark expanded for screen readers
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.remove('open');
      menu.removeAttribute('hidden');
    }
  }
  // run initially
  updateForViewport();
  // update on resize
  mq.addEventListener ? mq.addEventListener('change', updateForViewport) : window.addEventListener('resize', updateForViewport);

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    toggleMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      toggleMenu();
      btn.focus();
    }
  });

  // Close menu when clicking a link (mobile)
  menu.addEventListener('click', function(e) {
    const target = e.target;
    if (target.tagName === 'A') {
      // close the menu to reveal navigation
      if (menu.classList.contains('open')) toggleMenu();
    }
  });
});
