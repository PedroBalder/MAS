
//  PEGANDO TODAS AS DENUNCIAS DO BANCO DE DADOS  


// Função para carregar JSON local
function carregarDenunciasLocais() {
    fetch('assets/json/denuncia.json') 
        .then(response => response.json()) 
        .then(data => {
            mostrarDenuncias(data);
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}



//Exibição das denuncias
function mostrarDenuncias(denunciasObj) {
    const galeria = document.querySelector('.galeria');

    galeria.innerHTML = '';


    if (denunciasObj && Array.isArray(denunciasObj.denuncia)) {
        const denuncias = denunciasObj.denuncia; 

        denuncias.forEach(denuncia => {
            //Div
            const divImagemTexto = document.createElement('div');
            divImagemTexto.classList.add('imagem-com-texto');

            //Imagem
            const img = document.createElement('img');
            img.src = denuncia.imagem;
            //Div de informacoes da denuncia
            const divTextoData = document.createElement('div');
            divTextoData.classList.add('texto-e-data');
            //Texto da denuncia
            const pTexto = document.createElement('p');
            pTexto.textContent = denuncia.textoDenuncia;
            //Data da denuncia
            const pData = document.createElement('p');
            pData.classList.add('data');
            pData.textContent = formatarData(denuncia.data);
/*
        // Formata data para padrao
        const data = new Date(denuncia.data);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        pData.textContent = data.toLocaleDateString('pt-BR', options);
*/
        // Adiciona os elementos criados ao DOM
        divTextoData.appendChild(pTexto);
        divTextoData.appendChild(pData);
        divImagemTexto.appendChild(img);
        divImagemTexto.appendChild(divTextoData);
        galeria.appendChild(divImagemTexto);
    });
} else {
    console.error('O objeto denuncias não contém a propriedade "denuncia" ou não é um array:', denunciasObj);
}
}

carregarDenunciasLocais();



function formatarData(dataString) {
    const data = new Date(dataString);

    const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit'});
    const diaMesAno = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return `${hora}h ${diaMesAno}`;
}

// Chama o banco de dados


/*
function fetchDenuncias() {
    fetch('https://masdb.onrender.com/denuncia')
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            // Manipule os dados aqui
            mostrarDenuncias(data);
        })
        .catch(error => {
            console.error('Erro ao buscar denúncias:', error);
        });
}

fetchDenuncias();
*/