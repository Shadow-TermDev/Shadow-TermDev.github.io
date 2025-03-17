export const initAnimations = () => {
  // Animación del eslogan
  const eslogan = document.getElementById('eslogan');
  const texto = "Innovando en Termux y desarrollo";
  let index = 0;

  const typewriter = () => {
    if (index < texto.length) {
      eslogan.textContent += texto.charAt(index);
      index++;
      setTimeout(typewriter, 100);
    } else {
      eslogan.classList.add('typewriter');
    }
  };
  
  typewriter();
};
