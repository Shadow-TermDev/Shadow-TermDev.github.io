export const initTerminal = () => {
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('#init-line .cursor');
  const terminalOutput = document.getElementById('terminal-output');

  if (!typingText || !cursor || !terminalOutput) {
    console.error('Error: No se encontraron los elementos de la terminal.');
    return;
  }

  const mensaje = 'Iniciando Terminal...';
  const typeInterval = 100; // ms por carácter (velocidad constante)
  const blinkEvery = 5;     // el cursor cambia de estado cada N caracteres (sincronizado con el tipeo)
  let startTime = null;
  let typedCount = 0;
  let cursorVisible = true;

  // Mostrar el cursor antes de empezar a escribir
  cursor.classList.remove('hidden');

  const finalizar = () => {
    cursor.classList.add('hidden');
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line prompt-line';
    promptLine.innerHTML = '<span class="prompt-symbol">➜</span><span class="prompt-path">~</span><span class="cursor">█</span>';
    terminalOutput.appendChild(promptLine);
  };

  const loop = (now) => {
    if (startTime === null) startTime = now;

    // Velocidad basada en tiempo real: sin deriva ni acelerones
    const elapsed = now - startTime;
    const targetCount = Math.min(Math.floor(elapsed / typeInterval), mensaje.length);

    if (targetCount > typedCount) {
      typedCount = targetCount;
      typingText.textContent = mensaje.slice(0, typedCount);

      // Parpadeo del cursor sincronizado con el ritmo de impresión
      if (typedCount % blinkEvery === 0) {
        cursorVisible = !cursorVisible;
        cursor.classList.toggle('off', !cursorVisible);
      }
    }

    if (typedCount < mensaje.length) {
      requestAnimationFrame(loop);
    } else {
      setTimeout(finalizar, 800);
    }
  };

  // Pequeña pausa antes de empezar a escribir
  setTimeout(() => requestAnimationFrame(loop), 500);
};