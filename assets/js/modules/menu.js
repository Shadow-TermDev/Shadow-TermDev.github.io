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
    
    console.log('✓ Menú abierto');
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
    }, 400); // Esperar a que termine la transición
    
    document.body.style.overflow = '';
    
    console.log('✓ Menú cerrado');
  };

  // Toggle del botón hamburguesa
  menuButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Click en botón, estado actual:', isMenuOpen);
    
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Click en el overlay (fondo oscuro) cierra el menú
  navOverlay.addEventListener('click', (e) => {
    // Si el click fue directamente en el overlay (no en el container)
    if (e.target === navOverlay) {
      console.log('Click en overlay (fuera del menú)');
      closeMenu();
    }
  });

  // Evitar que clicks dentro del container cierren el menú
  menuContainer.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Cerrar menú al hacer clic en un enlace
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Click en enlace del menú');
      closeMenu();
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
