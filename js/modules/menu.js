export const initMenu = () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  const toggleMenu = (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
    menuToggle.classList.toggle("active");
  };

  const closeMenu = () => {
    menu.classList.remove("show");
    menuToggle.classList.remove("active");
  };

  menuToggle.addEventListener("click", toggleMenu);
  document.addEventListener("click", closeMenu);
};
