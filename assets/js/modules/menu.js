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

    console.log('Menú: ABIERTO');

    // Forzar estilos críticos
    navOverlay.style.zIndex = '999998';
    navOverlay.style.position = 'fixed';
    navOverlay.style.top = '0';
    navOverlay.style.left = '0';
    navOverlay.style.width = '100vw';
    navOverlay.style.height = '100vh';
    navOverlay.style.display = 'flex';
    navOverlay.style.opacity = '1';
    navOverlay.style.visibility = 'visible';
    navOverlay.style.pointerEvents = 'auto';
    
    menuButton.style.zIndex = '999999';
    document.body.style.overflow = 'hidden';
  };

  // Cerrar menú
  const closeMenu = () => {
    isMenuOpen = false;
    navOverlay.classList.remove('show');
    menuButton.classList.remove('active');
    
    // Remover estilos forzados para que las transiciones CSS funcionen
    setTimeout(() => {
      if (!isMenuOpen) {
        navOverlay.style.opacity = '';
        navOverlay.style.visibility = '';
        navOverlay.style.pointerEvents = '';
      }
    }, 400);
    
    document.body.style.overflow = '';
    
    console.log('✓ Menú cerrado');
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
  menuLinks.forEach((link) => {
    link.addEventListener('click', handleLinkClick);
  });
  
  document.addEventListener('keydown', handleKeyDown);

  console.log('✓ Menú completamente inicializado');
};
