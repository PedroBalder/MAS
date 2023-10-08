//   JAVASCRIPT MAPA 
 


// Função para iniciar o mapa com GPS
function initMap(latitude, longitude) {
    if (typeof latitude !== 'number' || isNaN(latitude) || typeof longitude !== 'number' || isNaN(longitude)) {
        return;
    }

    const mapDiv = document.getElementById('map');
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 14
    };
    const map = new google.maps.Map(mapDiv, mapOptions);

    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Sua Localização Atual'
    });
}

// Erros
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



// CARREGANDO DENUNCIAS NO MAPA


function adicionarMarcadoresNoMapa(map, denuncias) {
    denuncias.forEach(denuncia => {
        const latitude = parseFloat(denuncia.latitude);
        const longitude = parseFloat(denuncia.longitude);
        const textoDenuncia = denuncia.textoDenuncia;

        const customIcon = {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // URL do ícone personalizado, futuramente colocar icones para cada tipo de denuncia
            scaledSize: new google.maps.Size(30, 30), 
        };

        const marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: textoDenuncia,
            icon: customIcon 
        });
    });
}

// Carrega JSON no arquivo local(depois virá do banco)
function carregarDenunciasDoJSON(map) {
    fetch('assets/json/denuncia.json')
        .then(response => response.json())
        .then(data => {

            adicionarMarcadoresNoMapa(map, data.denuncia);
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = parseFloat(position.coords.latitude);
        const longitude = parseFloat(position.coords.longitude);
        const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 14
        };
        console.log(latitude);
        console.log(longitude);
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        const userMarker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: 'Sua Localização Atual'
        });

        carregarDenunciasDoJSON(map);

    }, function (error) {
        handleLocationError(error);
    });
} else {
    alert('A geolocalização não é suportada neste navegador.');
}