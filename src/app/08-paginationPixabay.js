import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import FsLightbox from 'fslightbox';

const form = document.querySelector('#search-form-pixabay');
const gallery = document.querySelector('.gallery-pixabay');
const container = document.querySelector('#pagination');

const galleryLightbox = new SimpleLightbox('.gallery-pixabay a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

// !---- PAGINATION ----------------------------

const paginationOptions = {
  totalItems: 10,
  itemsPerPage: 40, // per_page in fetch
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
  itemsPerPage: 40,
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
// console.log(page);

const loadMoreMainVideos = e => {
  console.log(e);
  const currentPage = e.page;
  pixabayApiService
    .fetchVideosForMainPage(currentPage)
    .then(({ hits }) => {
      insertGalleryContent(hits, createMarkupForMainPage);
      refreshFsLightbox();
    })
    .catch(err =>
      Notify.failure(
        `Sorry, there are no videos ${pixabayApiService.query.toUpperCase()} matching your search. Please try again.`
      )
    );
};

pagination.on('beforeMove', e => {
  loadMoreMainVideos(e);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

pagination.on('afterMove', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ! CLASS for fetching

const API_KEY = `31807815-f192f6f9aa73198d509365ba4`;
const URL_BASE = `https://pixabay.com/api/videos/`;

class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.per_page = 40;
    this.totalPhotos = 0;
  }

  fetchVideos(page) {
    const url = `${URL_BASE}?key=${API_KEY}&q=${this.searchQuery}&video_type=all&safesearch=true&min_width=350&min_height=250&page=${page}&per_page=${this.per_page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // this.nextPage();
        return data;
      });
  }

  fetchVideosForMainPage(page) {
    // page get from library pagination
    const url = `${URL_BASE}?key=${API_KEY}&q=sea&video_type=all&safesearch=true&min_width=350&min_height=250&page=${page}&per_page=${this.per_page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  //   nextPage() {
  //     this.page += 1;
  //   }

  //   resetPage() {
  //     this.page = 1;
  //   }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  setTotal(newTotal) {
    this.totalPhotos = newTotal;
  }

  hasMoreVideos() {
    return page < Math.ceil(this.totalPhotos / this.per_page);
  }
}

// addEventListener
form.addEventListener('submit', onSearch);

// examplers Class
const pixabayApiService = new PixabayApiService();

// functions
fetchVideosForMainPage();

function fetchVideosForMainPage() {
  pixabayApiService
    .fetchVideosForMainPage(page)
    .then(({ hits, total }) => {
      pagination.reset(total);
      insertGalleryContent(hits, createMarkupForMainPage);
      refreshFsLightbox();
    })
    .catch(err =>
      Notify.failure(
        `Sorry, there are no videos ${pixabayApiService.query.toUpperCase()} matching your search. Please try again.`
      )
    );
}

function onSearch(e) {
  e.preventDefault();

  const value = e.currentTarget.searchQuery.value.trim().toLowerCase();

  if (value === '') {
    Notify.info('Please, enter what do you want to search 😉');
    return;
  }

  if (value === pixabayApiService.query) {
    Notify.warning(
      `We already found videos for "${value.toUpperCase()}.
      Please, enter another phrase😉`
    );
    return;
  }

  pixabayApiService.query = value;

  //pixabayApiService.resetPage();
  clearGalleryContainer();
  fetchVideos();
}

function fetchVideos() {
  pixabayApiService
    .fetchVideos(page)
    .then(({ hits, totalHits, total }) => {
      if (!hits) {
        Notify.failure(
          `Sorry, there are no videos ${pixabayApiService.query.toUpperCase()} matching your search. Please try again.`
        );
        return;
      }
      if (hits.length === 0) {
        Notify.failure(
          `Sorry, there are no videos ${pixabayApiService.query.toUpperCase()} matching your search. Please try again.`
        );
        return;
      }
      pagination.reset(total);
      Notify.success(`Hooray! We found ${totalHits} videos.`);
      insertGalleryContent(hits, createMarkup);
      galleryLightbox.refresh();
    })
    .catch(err =>
      Notify.failure(
        `Sorry, there are no videos ${pixabayApiService.query.toUpperCase()} matching your search. Please try again.`
      )
    );
}

// markup
function createMarkup({
  videos: {
    medium: { url: medium },
    small: { url: small },
  },
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<a data-fslightbox="gallery" href="${medium}" data-alt="${tags}" class="card-link-pixabay lightBoxVideoLink"> 
      <div class="video-card-pixabay">
        <video id="video" width="350" class="video-pixabay" loop muted preload>
          <source src="${small}" type="video/mp4"/>
          <track src="test.vtt" kind="subtitles" srclang="en" label="English" />
        </video>
        <div class="info-pixabay">
          <p class="info-item-pixabay">
            <b><i class="fa-regular fa-heart"></i></b> ${likes}
          </p>
          <p class="info-item-pixabay">
            <b><i class="fa-solid fa-magnifying-glass"></i></b> ${views}
          </p>
          <p class="info-item-pixabay">
            <b><i class="fa-regular fa-comment"></i></b> ${comments}
          </p>
          <p class="info-item-pixabay">
            <b><i class="fa-solid fa-cloud-arrow-down"></i></b> ${downloads}
          </p>
        </div>
      </div>
    </a>`;
}

function createMarkupForMainPage({
  videos: {
    medium: { url: medium },
    small: { url: small },
  },
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<a data-fslightbox="gallery" href="${medium}" data-alt="${tags}" class="card-link-pixabay lightBoxVideoLink"> 
      <div class="video-card-pixabay">
        <video id="video" width="350" class="video-pixabay" loop muted preload>
          <source src="${small}" type="video/mp4"/>
          <track src="test.vtt" kind="subtitles" srclang="en" label="English" />
        </video>
        <div class="info-pixabay">
          <p class="info-item-pixabay">
            <b><i class="fa-regular fa-heart"></i></b> ${likes}
          </p>
          <p class="info-item-pixabay">
            <b><i class="fa-regular fa-comment"></i></b> ${comments}
          </p>
          <p class="info-item-pixabay">
            <b><i class="fa-solid fa-cloud-arrow-down"></i></b> ${downloads}
          </p>
        </div>
      </div>
    </a>`;
}

//generate 40 cards
const generateGalleryContent = (array, markup) =>
  array?.reduce((acc, item) => acc + markup(item), '');

const insertGalleryContent = (array, markup) => {
  const result = generateGalleryContent(array, markup);
  gallery.innerHTML = result;
};

function clearGalleryContainer() {
  gallery.innerHTML = '';
}
