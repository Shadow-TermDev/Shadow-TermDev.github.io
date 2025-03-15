import { initMenu } from './modules/menu.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initAnimations();
  
  // Manejar cambios de hash en la URL
  window.addEventListener('hashchange', () => {
    const currentSection = document.querySelector(window.location.hash);
    document.querySelectorAll('.main').forEach(section => {
      section.classList.remove('active');
    });
    if (currentSection) {
      currentSection.classList.add('active');
    }
  });

  // Mostrar sección inicial
  if (window.location.hash) {
    document.querySelector(window.location.hash)?.classList.add('active');
  } else {
    document.querySelector('#inicio').classList.add('active');
  }
});
