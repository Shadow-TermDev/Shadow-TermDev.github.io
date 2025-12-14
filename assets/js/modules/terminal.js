export const initTerminal = () => {
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('#init-line .cursor');
  const terminalOutput = document.getElementById('terminal-output');

  if (!typingText || !cursor || !terminalOutput) {
    console.error('Error: No se encontraron los elementos de la terminal.');
    return;
  }

  const mensaje = "Iniciando terminal...";
  let index = 0;

  // Mostrar cursor después de un momento
  setTimeout(() => {
    cursor.classList.remove('hidden');
  }, 500);

  // Función para escribir el mensaje letra por letra
  const escribirMensaje = () => {
    if (index < mensaje.length) {
      typingText.textContent += mensaje.charAt(index);
      index++;
      setTimeout(escribirMensaje, 100);
    } else {
      // Cuando termine de escribir, ocultar el cursor y mostrar prompt en nueva línea
      setTimeout(() => {
        cursor.classList.add('hidden');
        mostrarPrompt();
      }, 800);
    }
  };

  // Función para mostrar el prompt final en NUEVA LÍNEA
  const mostrarPrompt = () => {
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line prompt-line';
    promptLine.innerHTML = '<span class="prompt-symbol">➜</span><span class="prompt-path">~</span><span class="cursor">█</span>';
    
    terminalOutput.appendChild(promptLine);
  };

  // Iniciar la animación
  setTimeout(escribirMensaje, 500);
};
