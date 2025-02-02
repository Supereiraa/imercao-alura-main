const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm)); // Passa o termo para o filtro no front-end
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove('hidden');

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // Limpa resultados anteriores

    // Filtra artistas que contêm o termo de busca (case-insensitive)
    const filteredArtists = result.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredArtists.length === 0) {
        gridContainer.innerHTML = `<p>Nenhum artista encontrado.</p>`;
        return;
    }

    filteredArtists.forEach(element => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
            <div class="card-img">
                <img src="${element.urlImg}" class="artist-img" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${element.name}</span>
                <span class="artist-categorie">${element.genre}</span>
            </div>
        `;

        gridContainer.appendChild(artistCard);
    });
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});
