// JAVASCRIPT VISUALIZAR CAMERA


var video = document.querySelector('video');
var captureButton = document.getElementById('captureButton');
var newCaptureButton = document.getElementById('newCaptureButton');
var canvas = document.querySelector('canvas');
var capturedImage = document.getElementById('capturedImage');
var submitButton = document.getElementById('submitButton');
var textInput = document.getElementById('textInput');

navigator.mediaDevices.getUserMedia({ video: { 
    facingMode: 'environment' // Defina a restrição para a câmera principal
} }).then(stream => {
    video.srcObject = stream;
    video.play();
    submitButton.disabled = true;
}).catch(error => {
    console.log(error);
});

captureButton.addEventListener('click', () => {
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    // Exibe a imagem capturada e oculta o vídeo e o botão "Tirar Foto"
    capturedImage.src = canvas.toDataURL();
    capturedImage.style.display = 'block';
    video.style.display = 'none';
    captureButton.style.display = 'none';

    // Mostra o botão "Tirar Nova Foto"
    newCaptureButton.style.display = 'block';
    submitButton.disabled = false;

    
});

newCaptureButton.addEventListener('click', () => {
    // Oculta a imagem e o botão "Tirar Nova Foto"
    capturedImage.style.display = 'none';
    newCaptureButton.style.display = 'none';

    // Exibe o vídeo e o botão "Tirar Foto"
    video.style.display = 'block';
    captureButton.style.display = 'block';
    submitButton.disabled = true;
});

submitButton.addEventListener('click', () => {
    // Obtenha a imagem do canvas como um arquivo PNG
    canvas.toBlob(function (blob) {
        var imageUrl = URL.createObjectURL(blob);

        // Crie um objeto de URL para o texto digitado
        var textUrl = URL.createObjectURL(new Blob([textInput.value], { type: 'text/plain' }));

        // Crie links para download dos arquivos
        var imageLink = document.createElement('a');
        imageLink.download = 'foto.png';
        imageLink.href = imageUrl;

        var textLink = document.createElement('a');
        textLink.download = 'texto.txt';
        textLink.href = textUrl;

        // Simule o clique nos links de download
        imageLink.click();
        textLink.click();
    });
    
//    alert('Denuncia enviada com sucesso com sucesso!');

    window.location.href = 'html_denuncia_enviada.html';
});


