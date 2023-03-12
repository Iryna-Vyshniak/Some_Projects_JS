import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createClient } from 'pexels';

import { Report } from 'notiflix/build/notiflix-report-aio';

const galleryContainer = document.querySelector('.gallery');
const searchWrapper = document.querySelector(
  '.js-catalog-header__search-wrapper'
);
const form = document.querySelector('#catalog-form');
const searchInput = document.querySelector('#catalog-search');
const loadMoreBtn = document.querySelector('.js-gallery__load-btn');

const API_KEY = 'nK8dQ9g0n9ztLpNfMUyyoRWjFaSsbPf5sCCcMrST8otmYHlyeXOtDq1p';

// search input is hidden or focused
document.addEventListener('click', e => {
  if (e.target.className.indexOf('search')) {
    searchWrapper.classList.add('focused');
    searchInput.focus();
  } else {
    searchWrapper.classList.remove('focused');
  }
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
loadMoreBtn.addEventListener('click', onLoadMore);

class PhotosApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  fetchArticles() {
    //console.log(this);
    const client = createClient(API_KEY);

    return client.photos
      .search({ query: this.query, per_page: 20, page: this.page })
      .then(({ photos }) => {
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

  //clearGalleryConteiner(); // => here clear or in .then

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

  photosApiService.resetPage(); // reset page every time when submit form

  photosApiService
    .fetchArticles()
    .then(photos => {
      //  console.log(photos);
      clearGalleryConteiner();
      insertContent(photos);
      gallery.refresh();
      loadMoreBtn.hidden = false;
    })
    .catch(err => console.log(err));
}

function onLoadMore() {
  photosApiService
    .fetchArticles()
    .then(photos => {
      //  console.log(photos);
      insertContent(photos);
      gallery.refresh();
    })
    .catch(err => console.log(err));
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
  console.log(generateGalleryContent(arr));
  // galleryContainer.innerHTML = generateGalleryContent(arr);
  const result = generateGalleryContent(arr);
  galleryContainer.insertAdjacentHTML('beforeend', result);
};

//console.log(insertContent(photos));

const clearGalleryConteiner = () => (galleryContainer.innerHTML = '');

/* ({
  alt,
  src: { large, original },
})  */
