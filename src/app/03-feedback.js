import * as basicLightbox from 'basiclightbox';
import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
const btnOpenModal = document.querySelector('.js-modal-form');
btnOpenModal.addEventListener('click', openModal);

// create modal with feedback form
function openModal(e) {
  e.preventDefault();
  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
  }
  createModalInstance(e);
}

const markupForm =
  /* html */
  ` <div class="modal">
     <button
      class="modal__close-btn js-modal__close-btn"
      aria-label="close modal window"
    >&#10005;
    </button>
            <form class="feedback-form" autocomplete="off">
              <label>
                Email
                <input type="email" name="email" autofocus />
              </label>
              <label>
                Message
                <textarea name="message" rows="8"></textarea>
              </label>
              <button type="submit">Submit</button>
            </form></div>`;

function createModalInstance() {
  const instance = basicLightbox.create(markupForm, {
    onShow: instance => {
      instance.element().querySelector('.modal__close-btn').onclick =
        instance.close;
      window.addEventListener('keydown', onEscKeyPress);
    },
    onClose: instance => {
      window.removeEventListener('keydown', onEscKeyPress);
      setTimeout(() => {
        btnOpenModal.classList.add('active');
      }, 500);
    },
  });
  instance.show();

  // save field values ​​to local storage when the user types something in the fields of form
  const form = document.querySelector('.feedback-form');
  populateFeedbackForm();
  form.addEventListener('submit', onFormSubmit);
  form.addEventListener('input', throttle(onInputData, 500));

  function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    localStorage.removeItem(LOCAL_KEY);
  }

  function onInputData(e) {
    let data = localStorage.getItem(LOCAL_KEY);
    data = data ? JSON.parse(data) : {};
    data[e.target.name] = e.target.value.trim();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  }

  function populateFeedbackForm() {
    let data = localStorage.getItem(LOCAL_KEY);
    if (data) {
      data = JSON.parse(data);
      console.log(data);
      Object.entries(data).forEach(([name, value]) => {
        form.elements[name].value = value || '';
      });
    }
  }

  function onEscKeyPress(e) {
    if (e.code !== 'Escape') return;
    instance.close();
  }
}
