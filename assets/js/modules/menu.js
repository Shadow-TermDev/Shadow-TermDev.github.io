export const initMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const menuList = document.getElementById('menu-list');

  const toggleMenu = (e) => {
    e.stopPropagation();
    menuList.classList.toggle('show');
    menuButton.classList.toggle('active');
  };

  const closeMenu = (e) => {
    if (!menuList.contains(e.target) && !menuButton.contains(e.target)) {
      menuList.classList.remove('show');
      menuButton.classList.remove('active');
    }
  };

  menuButton.addEventListener('click', toggleMenu);
  document.addEventListener('click', closeMenu);
};
