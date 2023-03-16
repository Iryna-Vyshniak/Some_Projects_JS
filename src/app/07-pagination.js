import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const gallery = document.querySelector('#pagination-gallery');
const container = document.querySelector('#pagination');

const PER_PAGE = 20;

function rickandmortyAPI(page = 1) {
  return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

// !---- PAGINATION ----------------------------

const paginationOptions = {
  totalItems: 10,
  itemsPerPage: PER_PAGE, // per_page in fetch
  visiblePages: 7,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const paginOptionsLess = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 3,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

let options = null;

if (window.screen.width <= 480) {
  options = paginOptionsLess;
} else {
  options = paginationOptions;
}

const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();
console.log(page);

pagination.on('afterMove', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

//! --------------------- FETCH API ---------------

rickandmortyAPI(page)
  .then(({ info: { count }, results }) => {
    console.log(
      'сторінка: ',
      page,
      'всього зображень: ',
      count,
      'results: ',
      results
    );
    if (!results.length) {
      Report.failure(
        '🥺 Ooops...',
        `We don't find any cards with heroes" 🥺`,
        'Okay'
      );
    }
    pagination.reset(count);
    createMarkup(results);
  })
  .catch(err => console.log(err));

// !---- PAGINATION ----------------------------

pagination.on('afterMove', loadMoreCards); // on => likes on addEventListener

function loadMoreCards(e) {
  const currentPage = e.page;
  console.log(currentPage);
  rickandmortyAPI(currentPage)
    .then(({ results }) => {
      createMarkup(results);
    })
    .catch(err => console.log(err));
}

// !------------ CREATE MARKUP ---------------------
function createMarkup(arr) {
  const markup = arr
    .map(
      ({ name, image, species }) => `<li class="wrapper">
    <div class="img-area">
      <div class="inner-area">
        <img src="${image}" alt="${name}">
      </div>
    </div>
    <div class="name">${name}</div>
    <div class="about">${species}</div>
    <div class="social-icons">
      <a href="#" class="fb"><i class="fab fa-facebook-f"></i></a>
      <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
      <a href="#" class="insta"><i class="fab fa-instagram"></i></a>
      <a href="#" class="yt"><i class="fab fa-youtube"></i></a>
    </div>
    <div class="buttons">
      <button>Message</button>
      <button>Subscribe</button>
    </div>
    <div class="social-share">
      <div class="row">
        <i class="far fa-heart"></i>
        <i class="icon-2 fas fa-heart"></i>
        <span>${randomNumber(1000)}</span>
      </div>
      <div class="row">
        <i class="far fa-comment"></i>
        <i class="icon-2 fas fa-comment"></i>
        <span>${randomNumber(1000)}</span>
      </div>
      <div class="row">
        <i class="fas fa-share"></i>
        <span>${randomNumber(1000)}</span>
      </div>
    </div>
        </li>`
    )
    .join('');
  gallery.innerHTML = markup;
}

const randomNumber = max => {
  return Math.floor(Math.random() * max + 1000);
};
