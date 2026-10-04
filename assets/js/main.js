import * as Menu from './modules/menu.js';
import * as Terminal from './modules/terminal.js';
import * as Projects from './modules/projects.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize menu
    Menu.initMenu();

    // Initialize terminal only on the homepage
    if (document.body.classList.contains('homepage')) {
      Terminal.initTerminal();
    }

    // Projects counter (only acts on the projects page)
    Projects.initProjects();
  } catch (error) {
    console.error('Error initializing the page:', error);
  }
});