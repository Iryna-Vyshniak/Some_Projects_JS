import moment from 'moment';

const stopBtn = document.querySelector('.js-stop');
const stopButton = document.querySelector('.js-stop__stopwatch');
const startBtn = document.querySelector('.js-start');
const startButton = document.querySelector('.js-start__stopwatch');
const pauseButton = document.querySelector('.js-pause__stopwatch');
const stopAudio = document.querySelector('.js-audio-stop');
const startAudio = document.querySelector('.js-audio-start');
const pauseAudio = document.querySelector('.js-audio-pause');
const timeNow = document.querySelector('.js-time-now');
const clockface = document.querySelector('.stopwatch');

function updateTime() {
  timeNow.textContent = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
}

const interval = setInterval(updateTime, 1000);

window.addEventListener('unload', () => clearInterval(interval));

let timeId = null;
let intervalId = null;
let elapsedMilliseconds = 0;
const millisecondsInSec = 1000;
const secondsInMin = 60;
const minutesInHour = 60;
const hoursInDay = 24;

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.onTick = onTick;
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    const startTime = Date.now();
    this.isActive = true;
    startAudio.play();

    intervalId = setInterval(() => {
      startAudio.pause();
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    stopAudio.play();
    clearInterval(intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  pause() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

function updateClockface({ hours, mins, secs, milliseconds }) {
  clockface.textContent = `${hours} : ${mins} : ${secs}`;
}

const timer = new Timer({
  onTick: updateClockface,
});

startBtn.addEventListener('click', timer.start.bind(timer));
stopBtn.addEventListener('click', timer.stop.bind(timer));

// ------- next variant with 3 buttons ------------------------

const renderStopwatch = str =>
  (document.querySelector('.stopwatch-next').innerText = str);

const begin = () => {
  const initialDate = new Date(Date.now() - elapsedMilliseconds);
  timeId = setInterval(() => {
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

const pauseStopwatch = () => {
  if (timeId) {
    clearInterval(timeId);
    timeId = null;
  }
};

const interrupt = () => {
  pauseStopwatch();
  elapsedMilliseconds = 0;
  renderStopwatch('0 days 00:00:00:000');
};

startButton.addEventListener('click', e => {
  startAudio.play();
  if (timeId) {
    pauseStopwatch();
  } else {
    begin();
  }
});

pauseButton.addEventListener('click', e => {
  pauseAudio.play();
  if (timeId) {
    pauseStopwatch();
  } else {
    begin();
  }
});

stopButton.addEventListener('click', e => {
  stopAudio.play();
  pauseStopwatch();
  elapsedMilliseconds = 0;
  renderStopwatch('0 days 00 : 00 : 00 : 000');
});
