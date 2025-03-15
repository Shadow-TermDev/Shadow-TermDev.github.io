export const renderFooter = () => {
  const footerHTML = `
    <footer>
      <p>© 2025 Shadow-TermDev | Todos los derechos reservados.</p>
    </footer>
  `;
  document.getElementById('app').insertAdjacentHTML('beforeend', footerHTML);
};
