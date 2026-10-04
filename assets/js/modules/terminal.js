export const initTerminal = () => {
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('#init-line .cursor');
  const terminalOutput = document.getElementById('terminal-output');

  if (!typingText || !cursor || !terminalOutput) {
    console.error('Error: Terminal elements not found.');
    return;
  }

  const mensaje = 'Starting Terminal...';
  const typeInterval = 100; // ms per character (constant speed)
  const blinkEvery = 5;     // the cursor toggles every N characters (synced with typing)
  let startTime = null;
  let typedCount = 0;
  let cursorVisible = true;

  // Show the cursor before starting to type
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

    // Real-time based speed: no drift or bursts
    const elapsed = now - startTime;
    const targetCount = Math.min(Math.floor(elapsed / typeInterval), mensaje.length);

    if (targetCount > typedCount) {
      typedCount = targetCount;
      typingText.textContent = mensaje.slice(0, typedCount);

      // Cursor blink synced with the typing rhythm
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

  // Short pause before starting to type
  setTimeout(() => requestAnimationFrame(loop), 500);
};