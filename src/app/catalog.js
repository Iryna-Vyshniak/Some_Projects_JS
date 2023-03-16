//import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createClient } from 'pexels';

import { Report } from 'notiflix/build/notiflix-report-aio';
import LoadMoreBtn from './components/load-more-btn';

const galleryContainer = document.querySelector('.gallery');
const searchWrapper = document.querySelector(
  '.js-catalog-header__search-wrapper'
);
const form = document.querySelector('#catalog-form');
const searchInput = document.querySelector('#catalog-search');
// const alertPopup = document.querySelector('.alert');
// let isAlertVisible = false;
//const loadMoreBtn = document.querySelector('.js-gallery__load-btn');

const API_KEY = 'nK8dQ9g0n9ztLpNfMUyyoRWjFaSsbPf5sCCcMrST8otmYHlyeXOtDq1p';

//  для плавного прокручування сторінки після запиту і відтворення кожної наступної групи зображень
document.addEventListener('scroll', onScroll);

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// search input is hidden or focused
document.addEventListener('click', e => {
  // console.log(e.target.className.indexOf('search'));
  if (e.target.className.indexOf('search')) {
    searchWrapper.classList.add('focused');
    //searchInput.focus();
  } else {
    searchWrapper.classList.remove('focused');
    //searchInput.blur();
  }
});

// load more extensions
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// notiflix options
const reportOptions = {
  timeout: 3000,
};

//modal photos
const gallery = new SimpleLightbox('.gallery a', {
  closeText: 'x',
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});
const simpleLightbox = new SimpleLightbox('.gallery a', {
  closeText: 'x',
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

// gallery

form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchPhotos);

//console.log(loadMoreBtn.refs.button);
loadMoreBtn.hide();

class PhotosApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.perPage = 20;
    // this.totalPages = 100 / this.perPage;
  }

  fetchPhotosGallery() {
    //console.log(this);
    const client = createClient(API_KEY);

    return client.photos
      .search({ query: this.query, per_page: this.perPage, page: this.page })
      .then(data => {
        if (!data.photos.length) {
          loadMoreBtn.hide();
          Report.failure(
            '🥺 Ooops...',
            `We don't find any photos by "${this.query.toUpperCase()}" 🥺`,
            'Okay',
            reportOptions
          );
        }

        this.incrementPage();

        return data;
      });
  }

  fetchPhotosMainPage() {
    //console.log(this);
    const client = createClient(API_KEY);
    const queries = 'Sun Morning';

    return client.photos.search({ query: queries, per_page: 40 }).then(data => {
      if (!data.photos.length) {
        loadMoreBtn.hide();
      }
      return data;
    });
  }

  get searchQuery() {
    return this.query;
  }

  set searchQuery(newQuery) {
    this.query = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// ! ---------------INITIALIZATION ---------------------------------------------
const photosApiService = new PhotosApiService();
const photosApiServiceMainPage = new PhotosApiService();

// ! --------------- MAIN PAGE ------------------------------------------------
photosApiServiceMainPage
  .fetchPhotosMainPage()
  .then(({ photos }) => {
    insertContent(photos, renderMainPageMarkup);
    simpleLightbox.refresh();
    loadMoreBtn.hide();
  })
  .catch(err => {
    console.log(err);
  });

// !------ SUBMIT --------------------------------------
function onSearch(e) {
  e.preventDefault();

  //clearGalleryContainer(); // => here clear or in .then

  const query = e.target.elements.query.value;
  //console.log(photosApiService.query);

  if (!query) {
    Report.info(
      'What`re we looking for?',
      'Please, enter what do you want to search 😉',
      'Okay',
      reportOptions
    );
    return;
  }

  if (photosApiService.query === query) {
    Report.info(
      'Ooops...',
      'Already show! Please, enter another phrase😉',
      'Okay',
      reportOptions
    );
    return;
  }

  photosApiService.query = query;

  //searchInput.blur();
  loadMoreBtn.show();
  photosApiService.resetPage(); // reset page every time when submit form
  clearGalleryContainer();
  fetchPhotos();
  onScroll();
  // console.log(data.photos.length, data.per_page);
}

// ! ----------- RENDER -------------------------------------------------

const renderMarkup =
  photos => `<a class="gallery__item-catalog gallery__item--catalog-main" href="${
    photos.src.original
  }">
  <div class="gallery__thumb-img">
    <img
      class="gallery__image"
      src="${photos.src.large}"
      alt="${photos.alt}"
    />
    </div>
    <div class="gallery__content-img">
  <h4 class="gallery-item__title-catalog">${photos.alt.slice(0, 66)}</h4>
  </div>`;

const renderMainPageMarkup =
  photos => `<a class="gallery__item gallery__item--catalog-main" href="${
    photos.src.original
  }">
  <div class="gallery__thumb-img">
    <img
      class="gallery__image"
      src="${photos.src.large}"
      alt="${photos.alt}"
    />
    </div>
    <div class="gallery__content-img">
  <h4 class="gallery-item__title-catalog">${photos.alt.slice(0, 66)}</h4>
  </div>
  </a>
  `;

const generateGalleryContent = (arr, markup) =>
  arr?.reduce((acc, item) => acc + markup(item), '');

const insertContent = (arr, markup) => {
  const result = generateGalleryContent(arr, markup);
  galleryContainer.insertAdjacentHTML('beforeend', result);
};

const clearGalleryContainer = () => (galleryContainer.innerHTML = '');

/* ({
  alt,
  src: { large, original },
})  */

// !---- fetchAPI -------------------------------------

function fetchPhotos() {
  loadMoreBtn.disable();

  photosApiService
    .fetchPhotosGallery()
    .then(({ photos, per_page }) => {
      insertContent(photos, renderMarkup);
      gallery.refresh();

      loadMoreBtn.enable();

      // console.log(photos.length, page, per_page, total_results);
      if (photos.length < per_page) {
        loadMoreBtn.hide();
      }
    })
    .catch(err => {
      loadMoreBtn.hide();
      Report.failure(
        '🥺 Ooops...',
        'Your request isn`t clear, please, try again',
        'Okay',
        reportOptions
      );
    });
}

// ! ---------- ALERT ---------------------------

function toggleAlertPopup() {
  if (isAlertVisible) {
    return;
  }
  isAlertVisible = true;
  alertPopup.classList.add('is-visible');
  setTimeout(() => {
    alertPopup.classList.remove('is-visible');
    isAlertVisible = false;
  }, 3000);
}

// !---- LOADING----------------------------------------

// document.querySelector('.js-gallery__load-btn').addEventListener('click', e => {
//   if (document.querySelector('.js-spinner').classList.contains('js-spinner')) {
//     console.log(e.target);
//     document.querySelector('.js-spinner').classList.add('spinner--loading');
//   }
//   setTimeout(() => {
//     console.log(document.querySelector('.more--loading'));
//     document
//       .querySelector('.spinner--loading')
//       .classList.remove('spinner--loading');
//   }, 3000);
// });
