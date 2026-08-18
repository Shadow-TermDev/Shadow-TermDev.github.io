import * as Menu from './modules/menu.js';
import * as Terminal from './modules/terminal.js';
import * as Projects from './modules/projects.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Inicializar menú
    Menu.initMenu();

    // Inicializar terminal solo en la página de inicio
    if (document.body.classList.contains('homepage')) {
      Terminal.initTerminal();
    }

    // Contador de proyectos (solo actúa en la página de proyectos)
    Projects.initProjects();
  } catch (error) {
    console.error('Error al inicializar la página:', error);
  }
});