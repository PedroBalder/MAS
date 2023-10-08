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
    facingMode: 'environment' // Restricao para a camera principal
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

    capturedImage.src = canvas.toDataURL();
    capturedImage.style.display = 'block';
    video.style.display = 'none';
    captureButton.style.display = 'none';

    newCaptureButton.style.display = 'block';
    textValue = textInput.value;
    if (textValue.trim() !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

//Verificacao se há texto no campo para mudar o estado do botão de enviar
textInput.addEventListener('input', () => {

    textValue = textInput.value;
    if (textValue.trim() !== '' && capturedImage.src) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

newCaptureButton.addEventListener('click', () => {

    capturedImage.style.display = 'none';
    newCaptureButton.style.display = 'none';

    video.style.display = 'block';
    captureButton.style.display = 'block';
    submitButton.disabled = true;
});

emailjs.init('DgLxhBhqINSWrESVO');

submitButton.addEventListener('click', () => {
    canvas.toBlob(function (blob) {
        imagemBlob = blob; // Mudar imagem para .png para salvar em repositório
    });

    textValue = textInput.value;

    if (navigator.onLine) {

        const params = {
            to_email: 'jose.maranhao@edu.pe.senac.br', 
            subject: 'Denuncia Suape', 
            message: textValue, 
        };

        emailjs.send('service_qkijf73', 'template_thik5b5', params)
            .then((response) => {
                console.log('E-mail enviado com sucesso', response);
                window.location.href = 'html_denuncia_enviada.html';
            })
            .catch((error) => {
                console.error('Erro ao enviar e-mail:', error);
            });
    } else {
        // Caso o usuário nao esteja online
        console.log('A PWA está offline. O e-mail será enviado quando estiver online.');
    }
    
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
}, function (error) {
    handleLocationError(error);
});

