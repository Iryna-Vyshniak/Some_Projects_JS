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
//const loadMoreBtn = document.querySelector('.js-gallery__load-btn');

const API_KEY = 'nK8dQ9g0n9ztLpNfMUyyoRWjFaSsbPf5sCCcMrST8otmYHlyeXOtDq1p';

// search input is hidden or focused
document.addEventListener('click', e => {
  console.log(e.target);
  if (e.target.className.indexOf('search')) {
    searchWrapper.classList.add('focused');
    searchInput.focus();
  } else {
    searchWrapper.classList.remove('focused');
    searchInput.blur();
  }
});

// load more extensions
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

//modal photos
const gallery = new SimpleLightbox('.gallery a', {
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
  }

  fetchPhotosGallery() {
    //console.log(this);
    const client = createClient(API_KEY);

    return client.photos
      .search({ query: this.query, per_page: 20, page: this.page })
      .then(({ photos }) => {
        if (!photos.length) {
          loadMoreBtn.hide();
          Report.failure(
            '🥺 Ooops...',
            'Your request isn`t clear, please, try again',
            'Okay'
          );
        }
        this.incrementPage();

        return photos; //data.photos
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

const photosApiService = new PhotosApiService();

function onSearch(e) {
  e.preventDefault();

  //clearGalleryContainer(); // => here clear or in .then

  photosApiService.query = e.target.elements.query.value;
  //console.log(photosApiService.query);

  if (!photosApiService.query) {
    Report.info(
      'What`re we looking for?',
      'Please, enter what do you want to search 😉',
      'Okay'
    );
    searchInput.placeholder = 'What`re we looking for?';
    return;
  }
  loadMoreBtn.show();
  photosApiService.resetPage(); // reset page every time when submit form
  fetchPhotos();
}

const renderMarkup =
  photos => `<a class="gallery__item-catalog" href="${photos.src.original}">
    <img
      class="gallery__image"
      src="${photos.src.large}"
      alt="${photos.alt}"
    />
  </a>`;

const generateGalleryContent = arr =>
  arr?.reduce((acc, item) => acc + renderMarkup(item), '');

const insertContent = arr => {
  const result = generateGalleryContent(arr);
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
    .then(photos => {
      //  console.log(photos);
      clearGalleryContainer();
      insertContent(photos);

      gallery.refresh();
      loadMoreBtn.enable();
    })
    .catch(err => {
      loadMoreBtn.hide();
      Report.failure(
        '🥺 Ooops...',
        'Your request isn`t clear, please, try again',
        'Okay'
      );
    });
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
