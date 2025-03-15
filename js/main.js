import { renderHeader } from './components/Header.js';
import { renderSections } from './components/Sections.js';
import { renderFooter } from './components/Footer.js';
import { initMenu } from './modules/menu.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderSections();
  renderFooter();
  initMenu();
  initAnimations();
});
