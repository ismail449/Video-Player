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
//update the progress bar width on playing
const updateProgressBar = () => {
  const currentMinutes = Math.floor(videoElement.currentTime / 60);
  const currentSeconds = Math.floor(videoElement.currentTime % 60);
  const durationMinutes = Math.floor(videoElement.duration / 60);
  const durationSeconds = Math.floor(videoElement.duration % 60);

  currentTime.textContent = `${
    currentMinutes < 10 ? '0' + currentMinutes : currentMinutes
  }:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  duration.textContent = `${
    durationMinutes < 10 ? '0' + durationMinutes : durationMinutes
  }:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
  const width = (videoElement.currentTime / videoElement.duration) * 100;
  progressBar.style.width = `${width}%`;
};

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

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
