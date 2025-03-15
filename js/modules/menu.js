export const initMenu = () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  // Función para mostrar/ocultar menú
  const toggleMenu = (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
    menuToggle.classList.toggle("active");
  };

  // Cerrar menú al hacer clic fuera
  const closeMenu = (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
      menu.classList.remove("show");
      menuToggle.classList.remove("active");
    }
  };

  // Navegación suave
  const handleNavigation = (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Activar sección
      document.querySelectorAll('.main').forEach(section => {
        section.classList.remove('active');
      });
      targetSection.classList.add('active');
      
      // Scroll suave
      targetSection.scrollIntoView({ behavior: "smooth" });
      closeMenu(e);
    }
  }
};

  // Event listeners
  menuToggle.addEventListener("click", toggleMenu);
  document.addEventListener("click", closeMenu);
  menu.addEventListener("click", handleNavigation);
};
