export const initAnimations = () => {
  const esloganTexto = "Innovando en Termux y desarrollo.";
  const elementoEslogan = document.getElementById("eslogan");
  let indice = 0;

  const escribirEslogan = () => {
    if (indice < esloganTexto.length) {
      elementoEslogan.textContent += esloganTexto.charAt(indice);
      indice++;
      setTimeout(escribirEslogan, 100);
    } else {
      elementoEslogan.style.textShadow = "0 0 10px var(--neon-cyan)";
    }
  };

  escribirEslogan();
};
