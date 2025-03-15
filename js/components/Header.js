export const renderHeader = () => {
  const headerHTML = `
    <header>
      <div class="header-content">
        <h1 class="animated-title">Shadow-TermDev</h1>
        <p id="eslogan" class="eslogan"></p>
      </div>
      <nav>
        <button id="menu-toggle">☰</button>
        <ul id="menu">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#links">Links</a></li>
        </ul>
      </nav>
    </header>
  `;
  document.getElementById('app').insertAdjacentHTML('afterbegin', headerHTML);
};
