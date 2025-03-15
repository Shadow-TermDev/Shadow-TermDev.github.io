document.addEventListener("DOMContentLoaded", function() {
    const eslogan = "Innovando en Termux y desarrollo.";
    let index = 0;
    function escribirTexto() {
        if (index < eslogan.length) {
            document.getElementById("eslogan").textContent += eslogan.charAt(index);
            index++;
            setTimeout(escribirTexto, 100);
        }
    }
    escribirTexto();
});
