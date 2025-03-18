export const initMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const menuList = document.getElementById('menu-list');

  if (!menuButton || !menuList) {
    console.error('Error: No se encontraron los elementos del menú.');
    return;
  }

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isOpen = menuList.classList.toggle('show');
    menuButton.classList.toggle('active', isOpen);

    if (isOpen) {
      document.addEventListener('click', closeMenu);
    } else {
      document.removeEventListener('click', closeMenu);
    }
  };

  const closeMenu = (e) => {
    if (!menuList.contains(e.target) && !menuButton.contains(e.target)) {
      menuList.classList.remove('show');
      menuButton.classList.remove('active');
      document.removeEventListener('click', closeMenu); // Elimina el evento cuando se cierra
    }
  };

  menuButton.addEventListener('click', toggleMenu);
};

