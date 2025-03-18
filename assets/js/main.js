import * as Menu from './modules/menu.js';
import * as Animations from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    Menu.initMenu();
    Animations.initAnimations();
    console.log('Scripts cargados correctamente.');
  } catch (error) {
    console.error('Error al inicializar la página:', error);
  }
});

