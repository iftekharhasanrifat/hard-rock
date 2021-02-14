const searchSong = async() => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = '';
    toggleSpinner();
    //load data
    try {

        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);

    } catch (error) {
        displayError('Please try again later');
    }
}

document.getElementById('search-field').addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        document.getElementById('search-button').click();
    }
});

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    })
}

const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    toggleSpinner();
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
        .catch(error => displayError('We could not find lyrics.'))
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
    toggleSpinner();
}

const displayError = error => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}