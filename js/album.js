let container = document.querySelector(`.album`);
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);

function searchByTitle() {
    let search = input.value.toLowerCase();

    container.innerHTML = ``;
    for (let i = 0; i < trecks.length; i++) {
        let title = trecks[i].toLowerCase();

        if (title.includes(search)) {
            renderItem();
        }
    }
}


let album = albums[i]



if (!album) {
    container.innerHTML = `ОШИБКА!!! Возвращение на главную через 5 секунд`;

    setTimeout(() => {
        window.location.pathname = `index.html`
    }, 5000);


} else {

    container.innerHTML = `
<div class="card mb-3">
<div class="row">
    <div class="col-4">
        <img src="${album.img}" alt="" class="img-fluid rounded-start">
    </div>
    <div class="col-8">
        <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">
                ${album.discription}
            </p>
            <p class="card-text">
                <small class="text-muted">${album.year}</small>
            </p>
        </div>
    </div>
</div>
</div>
`;

    let playlist = document.querySelector(`.playlist`);

    let tracks = album.tracks;

    for (let j = 0; j < tracks.length; j++) {

        let track = tracks[j];

        playlist.innerHTML += `
    <li class="track list-group-item d-flex aling-item-center">
                        <img class="img-pause me-3" src="assets/pl1.png" alt="" height="30px">
                        <img class="img-play me-3 d-none" src="assets/plp1.png" alt="" height="30px">
                        <div>
                            <div>${track.title}</div>
                            <div class="text-secondary">${track.author}</div>
                        </div>
                            <div class="progress">
                                <div class="progress-bar"></div>
                            </div>
                        <div class="time ms-auto">${track.time}</div>
                        <audio class="audio" src="${track.src}"></audio>
                    </li>
    `;
    }


    function setupAudio() {
        let trackNodes = document.querySelectorAll(`.track`);
        for (let i = 0; i < trackNodes.length; i++) {

            let track = tracks[i];
            let node = trackNodes[i];
            let timeNode = node.querySelector(`.time`);
            let imgPause = node.querySelector(`.img-pause`);
            let imgPlay = node.querySelector(`.img-play`);
            let progressBar = node.querySelector(`.progress-bar`);

            let audio = node.querySelector(`.audio`);

            node.addEventListener(`click`, function () {

                if (track.isPlaying) {
                    track.isPlaying = false;
                    audio.pause();
                    imgPause.classList.remove(`d-none`);
                    imgPlay.classList.add(`d-none`);

                } else {
                    track.isPlaying = true;
                    audio.play();
                    imgPause.classList.add(`d-none`);
                    imgPlay.classList.remove(`d-none`);
                    updateProgress();
                }

            });

            function updateProgress() {

                let time = getTime(audio.currentTime);

                if (timeNode.innerHTML != time) {
                    timeNode.innerHTML = time;
                    progressBar.style.width = audio.currentTime * 100 / audio.duration + `%`;
                }

                if (track.isPlaying) {
                    requestAnimationFrame(updateProgress);
                }

            }

        }
    }
    setupAudio();

    function getTime(time) {
        let currentSeconds = Math.floor(time);
        let minuets = Math.floor(currentSeconds / 60);
        let seconds = Math.floor(currentSeconds % 60);

        if (minuets < 10) {
            minuets = `0` + minuets;
        }
        if (seconds < 10) {
            seconds = `0` + seconds;
        }
        return `${minuets}:${seconds}`
    }
}
