export const initAnimations = () => {
  const eslogan = document.getElementById('eslogan');
  const texto = "Innovando en Termux y desarrollo";
  let index = 0;

  // Asegurar que el eslogan esté vacío antes de comenzar
  eslogan.textContent = ""; 

  const typewriter = () => {
    if (index < texto.length) {
      eslogan.textContent += texto.charAt(index);
      index++;
      setTimeout(typewriter, 100);
    }
  };

  typewriter();
};

