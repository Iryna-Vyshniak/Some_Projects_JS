import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createClient } from 'pexels';

import Notiflix from 'notiflix';

const galleryContainer = document.querySelector('.gallery');

function renderMarkup(items) {
  return items.reduce(
    (acc, { alt, src: { large, original } }) =>
      (acc += `<a class="gallery__item-catalog" href="${original}">
    <img
      class="gallery__image"
      src="${large}"
      alt="${alt}"
    />
  </a>`),
    ''
  );
}

function setTitleImages(value) {
  const API_KEY = 'nK8dQ9g0n9ztLpNfMUyyoRWjFaSsbPf5sCCcMrST8otmYHlyeXOtDq1p';
  const client = createClient(API_KEY);
  let query = 'Ukraine';

  client.photos
    .search({ query, per_page: 40 })
    .then(({ photos }) => {
      console.log(photos);
      // console.log(renderMarkup(photos));
      return renderMarkup(photos);
    })
    .then(data => (galleryContainer.innerHTML = data))
    .catch(err => console.log(err));
}

setTitleImages();

const gallery = new SimpleLightbox('.gallery a', {
  closeText: 'x',
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

// -------------------------------------
