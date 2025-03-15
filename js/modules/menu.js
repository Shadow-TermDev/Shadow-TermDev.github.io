export const initMenu = () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  
  // Nuevo: Smooth scroll para los anchors
  const handleAnchorClick = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      
      // Cerrar menú después de la navegación
      menu.classList.remove("show");
      menuToggle.classList.remove("active");
    }
  };

  // Agregar event listeners a los links del menú
  document.querySelectorAll("#menu a[href^='#']").forEach(link => {
    link.addEventListener("click", handleAnchorClick);
  });

  // Código existente para toggle del menú
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
