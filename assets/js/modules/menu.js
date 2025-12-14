export const initMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const menuLinks = document.querySelectorAll('.menu-link');

  if (!menuButton || !navOverlay) {
    console.error('Error: No se encontraron los elementos del menú.');
    return;
  }

  console.log('✓ Elementos del menú encontrados');

  // Variable para rastrear el estado
  let isMenuOpen = false;

  // Toggle menú
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  // Abrir menú
  const openMenu = () => {
    navOverlay.classList.add('show');
    menuButton.classList.add('active');
    isMenuOpen = true;

    console.log('Menú: ABIERTO');

    // Forzar estilos críticos mediante JavaScript
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
    
    console.log('✓ Estilos forzados aplicados');

    // Agregar listener para cerrar al hacer clic fuera (con delay)
    setTimeout(() => {
      document.addEventListener('click', closeMenuOutside);
    }, 100);
  };

  // Cerrar menú
  const closeMenu = () => {
    navOverlay.classList.remove('show');
    menuButton.classList.remove('active');
    isMenuOpen = false;
    
    document.body.style.overflow = '';
    navOverlay.style.pointerEvents = 'none';
    document.removeEventListener('click', closeMenuOutside);
    
    console.log('✓ Menú cerrado');
  };

  // Cerrar menú al hacer clic fuera
  const closeMenuOutside = (e) => {
    // Si el clic no fue en el overlay, en el menú container, ni en el botón
    const menuContainer = navOverlay.querySelector('.menu-container');
    
    if (!menuContainer.contains(e.target) && !menuButton.contains(e.target)) {
      console.log('Clic fuera detectado, cerrando menú');
      closeMenu();
    }
  };

  // Event listener del botón (con toggle completo)
  menuButton.addEventListener('click', toggleMenu);
  console.log('✓ Event listener del botón agregado');

  // Cerrar menú al hacer clic en un enlace
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Click en enlace del menú');
      // Pequeño delay para la animación antes de navegar
      setTimeout(() => {
        closeMenu();
      }, 150);
    });
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      console.log('Tecla Escape presionada');
      closeMenu();
    }
  });

  console.log('✓ Menú completamente inicializado');
};
