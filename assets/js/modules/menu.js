export const initMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const menuContainer = document.querySelector('.menu-container');

  if (!menuButton || !navOverlay || !menuContainer) {
    console.error('Error: No se encontraron los elementos del menú.');
    return;
  }

  let isMenuOpen = false;
  let lastFocusedElement = null;

  // Abrir menú
  const openMenu = () => {
    isMenuOpen = true;
    lastFocusedElement = document.activeElement;
    navOverlay.classList.add('show', 'menu-overlay-open');
    navOverlay.setAttribute('aria-hidden', 'false');
    menuButton.classList.add('active', 'menu-opened');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-no-scroll');

    // Mover el foco al primer enlace del menú
    const firstLink = menuContainer.querySelector('.menu-link');
    if (firstLink) firstLink.focus();
  };

  // Cerrar menú
  const closeMenu = () => {
    isMenuOpen = false;
    navOverlay.classList.remove('show');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    navOverlay.setAttribute('aria-hidden', 'true');

    // Remover clases tras la transición
    setTimeout(() => {
      if (!isMenuOpen) {
        navOverlay.classList.remove('menu-overlay-open');
        menuButton.classList.remove('menu-opened');
        document.body.classList.remove('menu-no-scroll');
      }
    }, 400);

    // Devolver el foco al elemento que abrió el menú
    if (lastFocusedElement && lastFocusedElement !== document.body) {
      lastFocusedElement.focus();
    }
  };

  // Handler para el botón hamburguesa
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Handler para clicks en el overlay (fuera del menú)
  const handleOverlayClick = (e) => {
    if (e.target === navOverlay) {
      closeMenu();
    }
  };

  // Handler para el contenedor: cerrar al pulsar un enlace
  const handleContainerClick = (e) => {
    if (e.target.closest('.menu-link')) {
      closeMenu();
    }
  };

  // Handler para teclado: Escape y focus trap
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

  // Agregar event listeners
  menuButton.addEventListener('click', handleButtonClick);
  navOverlay.addEventListener('click', handleOverlayClick);
  menuContainer.addEventListener('click', handleContainerClick);
  document.addEventListener('keydown', handleKeyDown);
};