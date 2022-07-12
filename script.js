const videoElement = document.querySelector('video');
const progressRange = document.getElementsByClassName('progress-range')
const progressBar = document.getElementsByClassName('progress-bar')
const playButton = document.getElementById('play-button');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.getElementsByClassName('volume-range')
const volumeBar = document.getElementsByClassName('volume-bar')
const currentTime = document.getElementsByClassName('time-elapsed')
const duration = document.getElementsByClassName('time-duration')
const fullscreenButton = document.getElementsByClassName('fullscreen')
// Play & Pause ----------------------------------- //
const play = () => {
  playButton.classList.replace('fa-play', 'fa-pause');
  playButton.title = 'Pause'
  videoElement.play();
};
const pause = () => {
  playButton.classList.replace('fa-pause', 'fa-play');
  playButton.title = 'Play'
  videoElement.pause();
};


// Progress Bar ---------------------------------- //

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //


//event listeners
playButton.addEventListener('click', () => (videoElement.paused ? play() : pause()));
videoElement.addEventListener('click', () => (videoElement.paused ? play() : pause()));
//on video end show the pause icon
videoElement.addEventListener('ended', pause)