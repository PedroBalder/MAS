//   JAVASCRIPT TEMPERATURA

// Verificar se o navegador suporta geolocalização
if ('geolocation' in navigator) {
    // Solicitar a localização do dispositivo
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = parseFloat(position.coords.latitude);
        const longitude = parseFloat(position.coords.longitude);

        //console.log(`Latitude: ${latitude}`);
        //console.log(`Longitude: ${longitude}`);

        const apiKey = 'e722d4afdcfe890805ef65f7b706309f';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;


        // Realiza uma solicitação GET à API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
            // Dados de temperatura e umidade do ar
            const temperatura = Math.trunc(data.main.temp);
            const umidade = data.main.humidity;

            // Selecione as divs de "Informação 1" e "Informação 2" pelo ID e atualize seu conteúdo
            const temperaturaDiv = document.getElementById('temperatura');
            const umidadeDiv = document.getElementById('umidade');

            temperaturaDiv.textContent = `${temperatura}°C`;
            umidadeDiv.textContent = `${umidade}%`;

        })
        .catch((error) => {
            console.error('Erro ao buscar dados de temperatura e umidade:', error);
        });
  
      // Agora você pode usar as variáveis "latitude" e "longitude" conforme necessário
    }, function (error) {
      switch (error.code) {
        case 1:
          console.error('Permissão de localização negada. Por favor, habilite a localização.');
          break;
        case 2:
          console.error('Localização não disponível no momento. Tente novamente mais tarde.');
          break;
        case 3:
          console.error('Tempo limite da solicitação de localização expirado.');
          break;
        default:
          console.error('Ocorreu um erro desconhecido ao obter a localização.');
      }
    });
  } else {
    console.error('A geolocalização não é suportada neste navegador.');
  }

