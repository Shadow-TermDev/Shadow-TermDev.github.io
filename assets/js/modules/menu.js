export const initMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const menuContainer = document.querySelector('.menu-container');

  if (!menuButton || !navOverlay || !menuContainer) {
    console.error('Error: Menu elements not found.');
    return;
  }

  let isMenuOpen = false;
  let lastFocusedElement = null;

  // Open menu
  const openMenu = () => {
    isMenuOpen = true;
    lastFocusedElement = document.activeElement;
    navOverlay.classList.add('show', 'menu-overlay-open');
    navOverlay.setAttribute('aria-hidden', 'false');
    menuButton.classList.add('active', 'menu-opened');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-no-scroll');

    // Move focus to the first menu link
    const firstLink = menuContainer.querySelector('.menu-link');
    if (firstLink) firstLink.focus();
  };

  // Close menu
  const closeMenu = () => {
    isMenuOpen = false;
    navOverlay.classList.remove('show');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    navOverlay.setAttribute('aria-hidden', 'true');

    // Remove classes after the transition
    setTimeout(() => {
      if (!isMenuOpen) {
        navOverlay.classList.remove('menu-overlay-open');
        menuButton.classList.remove('menu-opened');
        document.body.classList.remove('menu-no-scroll');
      }
    }, 400);

    // Return focus to the element that opened the menu
    if (lastFocusedElement && lastFocusedElement !== document.body) {
      lastFocusedElement.focus();
    }
  };

  // Handler for the hamburger button
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Handler for clicks on the overlay (outside the menu)
  const handleOverlayClick = (e) => {
    if (e.target === navOverlay) {
      closeMenu();
    }
  };

  // Handler for the container: close when a link is pressed
  const handleContainerClick = (e) => {
    if (e.target.closest('.menu-link')) {
      closeMenu();
    }
  };

  // Keyboard handler: Escape and focus trap
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      e.preventDefault();
      closeMenu();
    }

    if (e.key === 'Tab' && isMenuOpen) {
      const focusable = [...navOverlay.querySelectorAll('a[href], button')].filter(
        (el) => el.offsetParent !== null
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  // Add event listeners
  menuButton.addEventListener('click', handleButtonClick);
  navOverlay.addEventListener('click', handleOverlayClick);
  menuContainer.addEventListener('click', handleContainerClick);
  document.addEventListener('keydown', handleKeyDown);
};