/*
//  PEGANDO TODAS AS DENUNCIAS DO BANCO DE DADOS  

// Função para buscar dados da API
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
*/

// Função para carregar JSON
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



// Função para mostrar as denúncias no HTML
function mostrarDenuncias(denunciasObj) {
    const galeria = document.querySelector('.galeria');

    galeria.innerHTML = '';

    // Verifica se denunciasObj contém a propriedade "denuncia" e se é um array
    if (denunciasObj && Array.isArray(denunciasObj.denuncia)) {
        const denuncias = denunciasObj.denuncia; // Acesse o array de denúncias

        denuncias.forEach(denuncia => {
            const divImagemTexto = document.createElement('div');
            divImagemTexto.classList.add('imagem-com-texto');

            // Exibir a imagem
            const img = document.createElement('img');
            img.src = denuncia.imagem;

            const divTextoData = document.createElement('div');
            divTextoData.classList.add('texto-e-data');

            const pTexto = document.createElement('p');
            pTexto.textContent = denuncia.textoDenuncia;

            const pData = document.createElement('p');
            pData.classList.add('data');
            pData.textContent = denuncia.data;
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
// Chame a função para carregar os dados do arquivo JSON local
carregarDenunciasLocais();

/*
// Função para formatar a data como "DD/MM/YYYY HH:MM"
function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

// Chama o banco de dados
fetchDenuncias();

*/