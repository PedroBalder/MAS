// JAVASCRIPT VISUALIZAR CAMERA


var video = document.querySelector('video');
var captureButton = document.getElementById('captureButton');
var newCaptureButton = document.getElementById('newCaptureButton');
var canvas = document.querySelector('canvas');
var capturedImage = document.getElementById('capturedImage');
var submitButton = document.getElementById('submitButton');
var textInput = document.getElementById('textInput');
var imagemBlob;
var textValue;
var globalLatitude;
var globalLongitude;

navigator.mediaDevices.getUserMedia({video: { 
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
    textValue = textInput.value;
    if (textValue.trim() !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

textInput.addEventListener('input', () => {
    // Verifica se há texto no campo textInput
    textValue = textInput.value;
    if (textValue.trim() !== '' && capturedImage.src) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
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
    canvas.toBlob(function (blob) {
        imagemBlob = blob; //Armazenando imagem
    });

    //Armazenando texto
    textValue = textInput.value;

    /*
    const formData = new FormData();
    formData.append('latitude', globalLatitude);
    formData.append('longitude', globalLongitude);
    formData.append('imagem', imagemBlob);
    formData.append('textoDenuncia', textValue);

    fetch('https://masdb.onrender.com/denuncia', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Denúncia enviada com sucesso!');
            window.location.href = 'html_denuncia_enviada.html';
        } else {
            console.error('Erro ao enviar a denúncia.');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar a denúncia:', error);
    });
*/
    window.location.href = 'html_denuncia_enviada.html';
});


navigator.geolocation.getCurrentPosition(function (position) {
    globalLatitude = parseFloat(position.coords.latitude);
    globalLongitude = parseFloat(position.coords.longitude);
    initMap(globalLatitude, globalLongitude);
}, function (error) {
    handleLocationError(error);
});

