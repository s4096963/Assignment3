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

video.addEventListener("seeking", () => {
  audio.currentTime = video.currentTime;
});

video.addEventListener("play", () => audio.play());
video.addEventListener("pause", () => audio.pause());
video.addEventListener("ended", () => audio.pause());


// Study Timer
let timer;
function startTimer(minutes = 25) {
  let time = minutes * 60;
  const display = document.getElementById("timer-display");

  clearInterval(timer);
  timer = setInterval(() => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    display.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      display.textContent = "Break time!";
    }
  }, 1000);
}

// Motivation Quote
const quotes = [
  "Focus on progress, not perfection.",
  "Small steps every day lead to big results.",
  "You’re doing better than you think.",
  "Discipline beats motivation.",
  "Breathe. Focus. Repeat."
];

function showRandomQuote() {
  const quoteBox = document.getElementById("quote-box");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = `"${randomQuote}"`;
}

// Background toggle
function toggleBackground() {
  document.body.classList.toggle("relax-mode");
}
