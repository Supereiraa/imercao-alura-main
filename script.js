const searchInput = document.getElementById('search-input'); // Pega o campo onde você digita o nome do artista
const resultArtist = document.getElementById("result-artist"); // Pega a área onde vai aparecer o resultado da busca
const resultPlaylist = document.getElementById('result-playlists'); // Pega a área das playlists que vai sumir quando você fizer uma busca

// Função para buscar artistas na API
function requestApi(searchTerm) {  
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`; // Cria o link para buscar o artista na API
    fetch(url) // Faz a busca na API (pede as informações)
        .then((response) => response.json()) // Converte a resposta da API para um formato que o JavaScript entende (JSON)
        .then((result) => displayResults(result)); // Mostra o resultado na tela chamando outra função
}

// Função para mostrar o resultado da busca
function displayResults(result) {
    resultPlaylist.classList.add("hidden"); // Esconde a área das playlists
    resultArtist.innerHTML = ''; // Limpa o resultado anterior para não ficar acumulando artistas

    // Filtra os artistas que têm o nome parecido com o que você digitou
    result.filter(artist => artist.name.toLowerCase().includes(searchInput.value.toLowerCase()))
        .forEach(element => {
            // Cria um "cartão" para cada artista encontrado
            const artistCard = document.createElement('div'); 
            artistCard.classList.add('artist-card'); // Adiciona um estilo para o cartão do artista

            // Cria a imagem do artista
            const artistImage = document.createElement('img'); 
            artistImage.src = element.urlImg; // Coloca a foto do artista
            artistImage.classList.add('artist-img'); // Aplica o estilo da imagem

            // Cria o nome do artista
            const artistName = document.createElement('span'); 
            artistName.innerText = element.name; // Coloca o nome do artista
            artistName.classList.add('artist-name'); // Aplica o estilo do nome

            // Coloca a imagem e o nome dentro do cartão do artista
            artistCard.appendChild(artistImage);
            artistCard.appendChild(artistName);

            // Coloca o cartão do artista na área de resultados
            resultArtist.appendChild(artistCard);
        });

    resultArtist.classList.remove('hidden'); // Mostra a área de resultados
}

// Detecta quando você começa a digitar algo no campo de busca
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase(); // Pega o que você digitou e transforma em letras minúsculas para facilitar a busca

    if (searchTerm === '') { // Se o campo de busca estiver vazio
        resultPlaylist.classList.remove('hidden'); // Mostra as playlists de novo
        resultArtist.classList.add('hidden'); // Esconde os resultados da busca
        return; // Para o código aqui porque não tem o que buscar
    }

    requestApi(searchTerm); // Se você digitou algo, faz a busca na API
});












/* const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => { -- isso fazia com que cada artista sobrescrevesse e aparecesse somente o ultimo do array
        artistName.innerText = element.name; 
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }
    
    requestApi(searchTerm);
}) */