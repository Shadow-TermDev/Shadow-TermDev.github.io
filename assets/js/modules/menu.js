export const initMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const menuLinks = document.querySelectorAll('.menu-link');

  if (!menuButton || !navOverlay) {
    console.error('Error: No se encontraron los elementos del menú.');
    return;
  }

  console.log('✓ Elementos del menú encontrados');

  // Toggle menú
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = navOverlay.classList.toggle('show');
    menuButton.classList.toggle('active', isOpen);

    console.log('Menú:', isOpen ? 'ABIERTO' : 'CERRADO');

    // Forzar estilos críticos mediante JavaScript
    if (isOpen) {
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
    } else {
      document.body.style.overflow = '';
      navOverlay.style.pointerEvents = 'none';
    }

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('click', closeMenuOutside);
      }, 100);
    } else {
      document.removeEventListener('click', closeMenuOutside);
    }
  };

  // Cerrar menú al hacer clic fuera
  const closeMenuOutside = (e) => {
    if (!navOverlay.contains(e.target) && !menuButton.contains(e.target)) {
      console.log('Clic fuera detectado, cerrando menú');
      closeMenu();
    }
  };

  // Cerrar menú
  const closeMenu = () => {
    navOverlay.classList.remove('show');
    menuButton.classList.remove('active');
    document.body.style.overflow = '';
    navOverlay.style.pointerEvents = 'none';
    document.removeEventListener('click', closeMenuOutside);
    console.log('✓ Menú cerrado');
  };

  // Event listeners
  menuButton.addEventListener('click', toggleMenu);
  console.log('✓ Event listener del botón agregado');

  // Cerrar menú al hacer clic en un enlace
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      console.log('Click en enlace del menú');
      closeMenu();
    });
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('show')) {
      console.log('Tecla Escape presionada');
      closeMenu();
    }
  });

  console.log('✓ Menú completamente inicializado');
};
