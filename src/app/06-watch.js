const dateDay = document.querySelector('.date-day');
const dateEl = document.querySelector('.date');
const monthsEl = document.querySelector('.date-month');
const yearEl = document.querySelector('.date-year');
const digitalClock = document.querySelector('.digital-clock');
const arrowHours = document.querySelector('#hours__arrow');
const arrowMinutes = document.querySelector('#minutes__arrow');
const arrowSeconds = document.querySelector('#seconds__arrow');

const namesOfDay = [
  'Неділя',
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'Пятниця',
  'Субота',
];
const namesOfMonth = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

setInterval(() => {
  const currentDay = new Date();
  const dayOfWeek = namesOfDay[currentDay.getDay()];
  const day = currentDay.getDate();
  const months = namesOfMonth[currentDay.getMonth()];
  const year = currentDay.getFullYear();

  dateDay.textContent = dayOfWeek;
  dateEl.textContent = day;
  monthsEl.textContent = months;
  yearEl.textContent = year;

  const hours = currentDay.getHours().toString().padStart(2, '0');
  const minutes = currentDay.getMinutes().toString().padStart(2, '0');
  const seconds = currentDay.getSeconds().toString().padStart(2, '0');

  digitalClock.textContent = `${hours} : ${minutes} : ${seconds}`;

  // 360 / 12 = 30 годин
  // 360 / 60 = 6  хвилин
  // 360 / 60 = 6  секунд

  // 12/60
  const moveSeconds = currentDay.getSeconds() * 6;
  const moveMinutes = currentDay.getMinutes() * 6;
  const moveHours =
    currentDay.getHours() * 30 + currentDay.getMinutes() * (30 / 60);

  arrowSeconds.style.transform = `rotate(${moveSeconds}deg)`;
  arrowMinutes.style.transform = `rotate(${moveMinutes}deg)`;
  arrowHours.style.transform = `rotate(${moveHours}deg)`;
}, 1000);
