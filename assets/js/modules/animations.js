export const initAnimations = () => {
  const eslogan = document.getElementById('eslogan');
  if (!eslogan || eslogan.hasAttribute('data-animated')) return; // Evita ejecución duplicada
  
  eslogan.setAttribute('data-animated', 'true'); // Marca como animado
  
  const texto = "Innovando en Termux y desarrollo";
  const velocidad = 100; // Milisegundos por letra
  let index = 0;

  const escribirTexto = () => {
    if (index < texto.length) {
      eslogan.textContent += texto.charAt(index);
      index++;
      setTimeout(escribirTexto, velocidad);
    }
  };

  eslogan.textContent = ""; // Reinicia el texto antes de escribir
  escribirTexto();
};

