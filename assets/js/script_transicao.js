// Tempo em milissegundos
const transitionTime = 3000; // 3 segundos


function redirectToNextScreen() {
    window.location.href = 'index.html'; 
}

// Mostra a tela de transição
setTimeout(redirectToNextScreen, transitionTime);
