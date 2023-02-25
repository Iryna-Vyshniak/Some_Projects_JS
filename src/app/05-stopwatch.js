const millisecondsInSec = 1000;
const stopBtn = document.querySelector('.js-stop');
const startBtn = document.querySelector('.js-start');
const stopAudio = document.querySelector('.js-audio-stop');
const startAudio = document.querySelector('.js-audio-start');

let intervalId;
const secondsInMin = 60;
const minutesInHour = 60;
const hoursInDay = 24;

const pause = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};

const start = () => {
  const initialDate = new Date();
  intervalId = setInterval(() => {
    const delta = new Date() - initialDate;

    const milliseconds = Math.floor(delta % millisecondsInSec);
    const seconds = Math.floor((delta / millisecondsInSec) % secondsInMin);
    const minutes = Math.floor(
      (delta / (millisecondsInSec * secondsInMin)) % minutesInHour
    );
    const hours = Math.floor(
      (delta / (millisecondsInSec * secondsInMin * minutesInHour)) % hoursInDay
    );
    const days = Math.floor(
      delta / (millisecondsInSec * secondsInMin * minutesInHour * hoursInDay)
    );

    const UISeconds = String(seconds).padStart(2, '0');
    const UIMinutes = String(minutes).padStart(2, '0');
    const UIHours = String(hours).padStart(2, '0');

    const stopwatcherFormat = `${days} days ${UIHours} : ${UIMinutes} : ${UISeconds} : ${milliseconds}`;

    renderStopWatch(stopwatcherFormat);
  }, 0);
};

const renderStopWatch = str =>
  (document.querySelector('.stopwatch').innerText = str);

stopBtn.addEventListener('click', e => {
  stopAudio.play();
  pause();
});

startBtn.addEventListener('click', e => {
  e.currentTarget.classList.toggle('paused');
  startAudio.paused ? startAudio.play() : startAudio.pause();
  start();
});
