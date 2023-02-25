const millisecondsInSec = 1000;
const stopBtn = document.querySelector('.js-stop');
const stopButton = document.querySelector('.js-stop__stopwatch');
const startBtn = document.querySelector('.js-start');
const startButton = document.querySelector('.js-start__stopwatch');
const pauseButton = document.querySelector('.js-pause__stopwatch');
const stopAudio = document.querySelector('.js-audio-stop');
const startAudio = document.querySelector('.js-audio-start');
const pauseAudio = document.querySelector('.js-audio-pause');

let intervalId = null;
let elapsedMilliseconds = 0;
const secondsInMin = 60;
const minutesInHour = 60;
const hoursInDay = 24;

const pause = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const start = () => {
  const initialDate = new Date(Date.now() - elapsedMilliseconds);
  intervalId = setInterval(() => {
    const delta = new Date() - initialDate;

    elapsedMilliseconds = delta;
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
  if (intervalId) {
    pause();
  } else {
    start();
  }
});

// ------- next variant with 3 buttons ------------------------

const interrupt = () => {
  pause();
  elapsedMilliseconds = 0;
  renderStopWatch('0 days 00:00:00:000');
};

const renderStopwatch = str =>
  (document.querySelector('.stopwatch-next').innerText = str);

const begin = () => {
  const initialDate = new Date(Date.now() - elapsedMilliseconds);
  intervalId = setInterval(() => {
    const delta = new Date() - initialDate;

    elapsedMilliseconds = delta;
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

    renderStopwatch(stopwatcherFormat);
  }, 0);
};

startButton.addEventListener('click', e => {
  e.currentTarget.classList.toggle('paused');
  startAudio.paused ? startAudio.play() : startAudio.pause();
  if (intervalId) {
    pause();
  } else {
    begin();
  }
});

pauseButton.addEventListener('click', e => {
  pause();
});

stopButton.addEventListener('click', e => {
  stopAudio.play();
  pause();
  elapsedMilliseconds = 0;
  renderStopwatch('0 days 00 : 00 : 00 : 000');
});
