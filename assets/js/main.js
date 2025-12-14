import * as Menu from './modules/menu.js';
import * as Terminal from './modules/terminal.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Inicializar menú
    Menu.initMenu();
    console.log('✓ Menú inicializado');

    // Inicializar terminal solo en la página de inicio
    if (document.body.classList.contains('homepage')) {
      Terminal.initTerminal();
      console.log('✓ Terminal inicializada');
    }

    console.log('✓ Todos los scripts cargados correctamente');
  } catch (error) {
    console.error('✗ Error al inicializar la página:', error);
  }
});
