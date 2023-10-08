//   JAVASCRIPT MAPA 
 


// Função para iniciar o mapa com a localização atual
function initMap(latitude, longitude) {
    const mapDiv = document.getElementById('map');
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15
    };
    const map = new google.maps.Map(mapDiv, mapOptions);

    // Adicione um marcador para a localização atual
    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Sua Localização Atual'
    });
}

// Função para lidar com erros de geolocalização
function handleLocationError(error) {
    switch (error.code) {
        case 1:
            alert('Permissão de localização negada. Por favor, habilite a localização.');
            break;
        case 2:
            alert('Localização não disponível no momento. Tente novamente mais tarde.');
            break;
        case 3:
            alert('Tempo limite da solicitação de localização expirado.');
            break;
        default:
            alert('Ocorreu um erro desconhecido ao obter a localização.');
    }
}

// Verificar se o navegador suporta geolocalização
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = parseFloat(position.coords.latitude);
        const longitude = parseFloat(position.coords.longitude);
        initMap(latitude, longitude);
        //console.log(`Latitude: ${latitude}`);
        //console.log(`Longitude: ${longitude}`);
    }, function (error) {
        handleLocationError(error);
    });
} else {
    alert('A geolocalização não é suportada neste navegador.');
}


