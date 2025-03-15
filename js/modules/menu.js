export const initMenu = () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  const toggleMenu = (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
    menuToggle.classList.toggle("active");
  };

  const closeMenu = (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
      menu.classList.remove("show");
      menuToggle.classList.remove("active");
    }
  };

  menuToggle.addEventListener("click", toggleMenu);
  document.addEventListener("click", closeMenu);
};
