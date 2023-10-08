// Tempo em milissegundos para a transição
const transitionTime = 3000; // 3 segundos

// Função para redirecionar para a próxima tela após o tempo de transição
function redirectToNextScreen() {
    window.location.href = 'html_main.html'; // Substitua com a URL da próxima tela
}

// Mostra a tela de transição por um período de tempo e, em seguida, redireciona
setTimeout(redirectToNextScreen, transitionTime);
