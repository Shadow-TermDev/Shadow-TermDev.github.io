document.addEventListener("DOMContentLoaded", function() {
  // Animación del eslogan
  const esloganTexto = "Innovando en Termux y desarrollo.";
  const elementoEslogan = document.getElementById("eslogan");
  let indice = 0;
  
  function escribirEslogan() {
    if (indice < esloganTexto.length) {
      elementoEslogan.textContent += esloganTexto.charAt(indice);
      indice++;
      setTimeout(escribirEslogan, 100);
    } else {
      elementoEslogan.style.textShadow = "0 0 10px #00ffff";
    }
  }
  
  escribirEslogan();

  // Cerrar menú al hacer clic fuera
document.addEventListener("click", function(e) {
  const menu = document.getElementById("menu");
  const botonMenu = document.getElementById("menu-toggle");
  
  if (!menu.contains(e.target) && !botonMenu.contains(e.target)) {
    menu.classList.remove("show");
    botonMenu.classList.remove("active");
  }
});
