const playPauseButton = document.getElementById("playPause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const volumeControl = document.getElementById("volume");
const expandButton = document.getElementById("expand");
const playlist = document.getElementById("playlist");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");

let isPlaying = false;
let isExpanded = false;
let isVolumeVisible = false;
let currentTrack = 0;
let isShuffled = false; 
let isRepeating = false; 

const playlistItems = [
    "msc/SnapInsta.io - Atmosphere (2010 Remaster) (128 kbps).mp3",
    "msc/SnapInsta.io - Dead Souls (2010 Remaster) (128 kbps).mp3",
    "msc/SnapInsta.io - Disorder (2007 Remaster) (128 kbps).mp3",
    "msc/SnapInsta.io - Heart and Soul (2007 Remaster) (128 kbps).mp3",
    "msc/SnapInsta.io - Isolation (2007 Remaster) (128 kbps).mp3",
    "msc/SnapInsta.io - Love Will Tear Us Apart (2010 Remaster) (128 kbps).mp3.mp3",
    "msc/SnapInsta.io - New Dawn Fades (2007 Remaster) (128 kbps).mp3",
    "msc/SnapInsta.io - Shadowplay (128 kbps).mp3",
    "msc/SnapInsta.io - She's Lost Control (2010 Remaster) (128 kbps).mp3",
    "msc/SnapInsta.io - Transmission (2010 Remaster) (128 kbps).mp3",
    "msc/SnapInsta.io - Twenty Four Hours (128 kbps).mp3",
];

function togglePlayPause() {
    const audio = document.getElementById("audio");

    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "Play";
    } else {
        audio.play();
        playPauseButton.textContent = "Pause";
    }

    isPlaying = !isPlaying;
}

function playPrevious() {
    if (isShuffled) {
        currentTrack = getRandomTrackIndex();
    } else {
        currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    }

    playTrack(currentTrack);
}

function updateProgressBar() {
    const audio = document.getElementById("audio");
    const progressBar = document.querySelector(".progress");

    const currentTime = audio.currentTime;
    const duration = audio.duration;

    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = progressPercent + "%";
    }
}

setInterval(updateProgressBar, 1000);

function playNext() {
    if (isShuffled) {
        currentTrack = getRandomTrackIndex();
    } else {
        currentTrack = (currentTrack + 1) % playlistItems.length;
    }

    playTrack(currentTrack);
}

function setVolume() {
    const audio = document.getElementById("audio");
    audio.volume = volumeControl.value;
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    const repeatIcon = isRepeating ? "🔁" : "🔂";
    repeatButton.textContent = repeatIcon;
}

function shufflePlaylist() {
    isShuffled = !isShuffled;
    const shuffleIcon = isShuffled ? "🔀" : "➡️";
    shuffleButton.textContent = shuffleIcon;
    
    if (isShuffled) {
        playlistItems.sort(() => Math.random() - 0.5);
        currentTrack = 0;
    }
}

function playTrack(trackIndex) {
    const audio = document.getElementById("audio");
    audio.src = playlistItems[trackIndex]; 
    audio.load();
    audio.play();
    playPauseButton.textContent = "Pause";
    isPlaying = true;
    const currentSongElement = document.getElementById("current-song");
    currentSongElement.textContent = playlistItems[trackIndex];
}

function getRandomTrackIndex() {
    return Math.floor(Math.random() * playlistItems.length);
}

const audio = document.createElement("audio");
audio.id = "audio";
document.body.appendChild(audio);

audio.addEventListener("ended", () => {
    if (isRepeating) {
        playTrack(currentTrack);
    } else {
        playNext();
    }
});

playPauseButton.addEventListener("click", togglePlayPause);
prevButton.addEventListener("click", playPrevious);
nextButton.addEventListener("click", playNext);
volumeControl.addEventListener("input", setVolume);
expandButton.addEventListener("click", toggleExpand);
shuffleButton.addEventListener("click", shufflePlaylist);
repeatButton.addEventListener("click", toggleRepeat);