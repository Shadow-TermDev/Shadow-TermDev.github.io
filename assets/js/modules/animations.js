export const initAnimations = () => {
  const eslogan = document.getElementById('eslogan');
  if (!eslogan || eslogan.dataset.animated) return; // Evita que se ejecute dos veces

  eslogan.dataset.animated = "true"; // Marca que ya se ejecutó
  const texto = "Innovando en Termux y desarrollo";
  let index = 0;

  eslogan.textContent = ""; // Reinicia el texto antes de escribir

  const typewriter = () => {
    if (index < texto.length) {
      eslogan.textContent += texto.charAt(index);
      index++;
      setTimeout(typewriter, 100);
    }
  };

  typewriter();
};

