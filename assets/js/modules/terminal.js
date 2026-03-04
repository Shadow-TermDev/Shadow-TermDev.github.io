export const initTerminal = () => {
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('#init-line .cursor');
  const terminalOutput = document.getElementById('terminal-output');

  if (!typingText || !cursor || !terminalOutput) {
    console.error('Error: No se encontraron los elementos de la terminal.');
    return;
  }

  const mensaje = "Iniciando terminal...";
  const chars = [];

  setTimeout(() => {
    cursor.classList.remove('hidden');
  }, 500);

const escribirMensaje = () => {
    if (chars.length < mensaje.length) {
      chars.push(mensaje[chars.length]);
      typingText.textContent = chars.join('');
      setTimeout(() => requestAnimationFrame(escribirMensaje), 100);
    } else {
      setTimeout(() => {
        cursor.classList.add('hidden');
        const promptLine = document.createElement('div');
        promptLine.className = 'terminal-line prompt-line';
        promptLine.innerHTML = '<span class="prompt-symbol">➜</span><span class="prompt-path">~</span><span class="cursor">█</span>';
        terminalOutput.appendChild(promptLine);
      }, 800);
    }
  };

  setTimeout(escribirMensaje, 500);
};
