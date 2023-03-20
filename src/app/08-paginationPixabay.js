// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FsLightbox from 'fslightbox';

const form = document.querySelector('#search-form-pixabay');
const gallery = document.querySelector('.gallery-pixabay');

const galleryLightbox = new SimpleLightbox('.gallery-pixabay a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const API_KEY = `31807815-f192f6f9aa73198d509365ba4`;
const URL_BASE = `https://pixabay.com/api/videos/`;

class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  fetchImages() {
    const url = `${URL_BASE}?key=${API_KEY}&q=${this.searchQuery}&video_type=all&safesearch=true&min_width=350&min_height=250&page=${this.page}&per_page=${this.per_page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.nextPage();
        return data;
      });
  }

  fetchImagesForMainPage() {
    const url = `${URL_BASE}?key=${API_KEY}&q=sea&video_type=all&safesearch=true&min_width=350&min_height=250`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      });
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// addEventListener
form.addEventListener('submit', onSearch);

// examplers Class
const pixabayApiService = new PixabayApiService();

// functions
fetchImagesForMainPage();
function fetchImagesForMainPage() {
  pixabayApiService
    .fetchImagesForMainPage()
    .then(({ hits }) => {
      insertGalleryContent(hits, createMarkupForVideo);
      refreshFsLightbox();
    })
    .catch(err => console.log(err));
}

function onSearch(e) {
  e.preventDefault();

  const value = e.currentTarget.searchQuery.value.trim().toLowerCase();

  if (value === '') {
    return alert('Please, enter a phrase');
  }

  if (value === pixabayApiService.query) {
    return alert('Please, enter another phrase');
  }

  pixabayApiService.query = value;

  pixabayApiService.resetPage();
  clearGalleryContainer();

  fetchImages();
}

function fetchImages() {
  pixabayApiService
    .fetchImages()
    .then(({ hits }) => {
      if (!hits) {
        alert('Not found images more');
        return;
      }
      if (hits.length === 0) {
        alert('Not found images');
        return;
      }
      insertGalleryContent(hits, createMarkup);
      galleryLightbox.refresh();
    })
    .catch(err => console.log(err));
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
            <b>Likes</b> ${likes}
          </p>
          <p class="info-item-pixabay">
            <b>Views</b> ${views}
          </p>
          <p class="info-item-pixabay">
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item-pixabay">
            <b>Downloads</b> ${downloads}
          </p>
        </div>
      </div>
    </a>`;
}
function createMarkupForVideo({
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
            <b>Likes</b> ${likes}
          </p>
          <p class="info-item-pixabay">
            <b>Views</b> ${views}
          </p>
          <p class="info-item-pixabay">
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item-pixabay">
            <b>Downloads</b> ${downloads}
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
  gallery.insertAdjacentHTML('beforeend', result);
};

function clearGalleryContainer() {
  gallery.innerHTML = '';
}
