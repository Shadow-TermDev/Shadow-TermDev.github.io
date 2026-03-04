export const initMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const menuContainer = document.querySelector('.menu-container');
  const menuLinks = document.querySelectorAll('.menu-link');

  if (!menuButton || !navOverlay || !menuContainer) {
    console.error('Error: No se encontraron los elementos del menú.');
    return;
  }

  console.log('✓ Elementos del menú encontrados');

  let isMenuOpen = false;

  // Abrir menú
  const openMenu = () => {
    isMenuOpen = true;
    navOverlay.classList.add('show');
    menuButton.classList.add('active');
    menuButton.setAttribute('aria-expanded', 'true');

// Mover estilos críticos a clases CSS predefinidas
    navOverlay.classList.add('menu-overlay-open');
    menuButton.classList.add('menu-opened');
    document.body.classList.add('menu-no-scroll');
  };

  // Cerrar menú
  const closeMenu = () => {
    isMenuOpen = false;
    navOverlay.classList.remove('show');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    
    // Remover clases CSS predefinidas
    setTimeout(() => {
      if (!isMenuOpen) {
        navOverlay.classList.remove('menu-overlay-open');
        menuButton.classList.remove('menu-opened');
        document.body.classList.remove('menu-no-scroll');
      }
    }, 400);
  };

  // Handler para el botón hamburguesa
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Click en botón, estado actual:', isMenuOpen);
    
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Handler para clicks en el overlay
  const handleOverlayClick = (e) => {
    if (e.target === navOverlay) {
      console.log('Click en overlay (fuera del menú)');
      closeMenu();
    }
  };

  // Handler para prevenir propagación desde el contenedor
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  // Handler SIMPLE para enlaces - funciona en todos los navegadores
  const handleLinkClick = (e) => {
    console.log('Click en enlace del menú');
    
    // Simplemente cerrar el menú
    // El enlace navegará naturalmente
    closeMenu();
  };

  // Handler para teclado
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      console.log('Tecla Escape presionada');
      closeMenu();
    }
  };

  // Agregar event listeners
  menuButton.addEventListener('click', handleButtonClick);
  navOverlay.addEventListener('click', handleOverlayClick);
  menuContainer.addEventListener('click', handleContainerClick);
  
  // Para los enlaces: NO preventDefault, dejar navegación natural
  menuContainer.addEventListener('click', (e) => {
    const target = e.target.closest('.menu-link');
    if (target) {
      console.log('Click detected on menu link');
      closeMenu();
    }
  });
  
  document.addEventListener('keydown', handleKeyDown);

  console.log('✓ Menú completamente inicializado');
};
