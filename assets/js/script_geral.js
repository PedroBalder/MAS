function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/img/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/img/close_white_36dp.svg";
    }
}


// BOTAO REDIRECIONA PARA HOME PAGE

// Selecione o botão pelo ID
const redirectButton = document.getElementById('redirectButton');

// Adicione um ouvinte de evento de clique ao botão
redirectButton.addEventListener('click', function () {
    // Redirecione para main.html
    window.location.href = 'html_main.html';
});


/*
// CARREGANDO FOTOS DAS DENUNCIAS

// Array de nomes de arquivo das imagens
const imageNames = ["download (1).png", "download (2).png", "download (3).png", "download (4).png", "download (5).png", "download (6).png", "download (7).png", "download (8).png", "download (9).png", "download (10).png", "download (11).png", "download (12).png", "download (13).png", "download (14).png"];

// Obtém o contêiner das imagens
const imageContainer = document.getElementById("image-container");

// Loop para criar elementos de imagem e adicioná-los ao contêiner
imageNames.forEach(imageName => {
    const img = document.createElement("img");
    img.src = `fotos/${imageName}`;
    img.alt = imageName;
    imageContainer.appendChild(img);
});
*/

