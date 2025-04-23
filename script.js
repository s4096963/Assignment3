// script.js

const video = document.getElementById("custom-video-player");
const audio = document.getElementById("custom-audio-player");
const playPauseImg = document.getElementById("play-pause-img");
const progressBarFill = document.getElementById("progress-bar-fill");

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    audio.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

// Sync audio to video time
video.addEventListener("timeupdate", () => {
  if (Math.abs(video.currentTime - audio.currentTime) > 0.3) {
    audio.currentTime = video.currentTime;
  }

  const percentage = (video.currentTime / video.duration) * 100;
  progressBarFill.style.width = `${percentage}%`;
});

// Also handle seeking or restarting
video.addEventListener("seeking", () => {
  audio.currentTime = video.currentTime;
});

video.addEventListener("play", () => audio.play());
video.addEventListener("pause", () => audio.pause());
video.addEventListener("ended", () => audio.pause());
