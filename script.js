const player = document.querySelector('.player')
const videoElement = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.getElementById('progress-bar');
const playButton = document.getElementById('play-button');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenButton = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
// Play & Pause ----------------------------------- //
const play = () => {
  playButton.classList.replace('fa-play', 'fa-pause');
  playButton.title = 'Pause';
  videoElement.play();
};
const pause = () => {
  playButton.classList.replace('fa-pause', 'fa-play');
  playButton.title = 'Play';
  videoElement.pause();
};

// Progress Bar ---------------------------------- //
//calculate display time format
const displayTime = () => {
  const currentMinutes = Math.floor(videoElement.currentTime / 60);
  const currentSeconds = Math.floor(videoElement.currentTime % 60);
  const durationMinutes = Math.floor(videoElement.duration / 60);
  const durationSeconds = Math.floor(videoElement.duration % 60);
  currentTime.textContent = `${
    currentMinutes < 10 ? '0' + currentMinutes : currentMinutes
  }:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds} / `;
  duration.textContent = `${
    durationMinutes < 10 ? '0' + durationMinutes : durationMinutes
  }:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
};

//update the progress bar width on playing
const updateProgressBar = () => {
  displayTime();
  const width = (videoElement.currentTime / videoElement.duration) * 100;
  progressBar.style.width = `${width}%`;
};

const seek = (e) => {
  const progress = e.offsetX / progressRange.offsetWidth;
  videoElement.currentTime = progress * videoElement.duration;
  progressBar.style.width = `${progress * 100}%`;
};

// Volume Controls --------------------------- //
let lastVolume = 1;
const updateVolumeBar = () => {
  volumeBar.style.width = `${videoElement.volume * 100}%`;
};

const setVolume = (e) => {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  } else if (volume > 0.9) {
    volume = 1;
  }
  videoElement.volume = volume;
  updateVolumeBar();
  changeVolumeIcon();
};
//changing the icon on volume change
const changeVolumeIcon = () => {
  volumeIcon.className = '';
  if (videoElement.volume > 0.7) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-high');
    volumeIcon.title = 'Mute';
  } else if (videoElement.volume < 0.7 && videoElement.volume > 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    volumeIcon.title = 'Mute';
  } else if (videoElement.volume === 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-off');
    volumeIcon.title = 'Unmute';
  }
};

//unmute the video on clicking when the volume icon
const unmute = () => {
  videoElement.volume = lastVolume;
  volumeBar.style.width = `${lastVolume * 100}%`;
  changeVolumeIcon();
};
//mute the video on clicking when the volume icon
const mute = () => {
  lastVolume = videoElement.volume;
  videoElement.volume = 0;
  volumeBar.style.width = 0;
  changeVolumeIcon();
};

// Change Playback Speed -------------------- //
const setSpeed = (e) => {
  videoElement.playbackRate = e.target.value;
};
let isFullscreen = false;
// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

//toggle fullscreen
const toggleFullscreen = ()=>{
  if(!isFullscreen){
    openFullscreen(player)
  }else{
    closeFullscreen()
  }
  isFullscreen = !isFullscreen;
  videoElement.classList.toggle('video-fullscreen')
}

//event listeners
playButton.addEventListener('click', () =>
  videoElement.paused ? play() : pause(),
);
videoElement.addEventListener('click', () =>
  videoElement.paused ? play() : pause(),
);
//on video end show the pause icon
videoElement.addEventListener('ended', pause);
//on time update update progress bar width
videoElement.addEventListener('timeupdate', updateProgressBar);
videoElement.addEventListener('canplay', updateProgressBar);

progressRange.addEventListener('click', seek);

volumeRange.addEventListener('click', setVolume);

volumeIcon.addEventListener('click', () =>
  videoElement.volume ? mute() : unmute(),
);
speed.addEventListener('change', setSpeed);
fullscreenButton.addEventListener('click', toggleFullscreen);
