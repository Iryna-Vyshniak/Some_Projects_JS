import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryContainer = document.querySelector('.gallery');
const markup = renderMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', markup);

function renderMarkup(items) {
  return items.reduce(
    (acc, { preview, original, description }) =>
      (acc += `<a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`),
    ''
  );
}

const lightbox = new SimpleLightbox('.gallery a', {
  closeText: 'ⓧ',
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});
