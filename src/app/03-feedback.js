import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
const btnOpenModal = document.querySelector('.js-modal-form');
btnOpenModal.addEventListener('click', openModal);

const errorWarning = `<p class="error" style='align-self: center; margin: 5px 0; color: red; text-align: center; font-size: 1rem; font-style: italic;'>Your email must include @ and . </p>`;

// create modal with feedback form
function openModal(e) {
  e.preventDefault();
  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
  }
  createModalInstance(e);
}

const markupForm = ` <div class="feedback-modal">
     <button
      class="feedback-modal__close-btn js-modal__close-btn"
      aria-label="close modal window"
    >&#10005;
    </button>
            <form class="feedback-form" autocomplete="off">
              <label>
                Email
                <input class="feedback-form__email js-feedback-form__email" type="email" name="email" autofocus>
                <span></span>
              </label>
              <label>
                Message
                <textarea name="message" rows="8"></textarea>
              </label>
              <button type="submit" disabled>Submit</button>
            </form></div>`;

function createModalInstance() {
  const instance = basicLightbox.create(markupForm, {
    onShow: instance => {
      instance.element().querySelector('.js-modal__close-btn').onclick =
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
  const inputEmail = form.querySelector('.js-feedback-form__email');
  const content = form.querySelector('.js-feedback-form__email + span');
  const btnSubmit = form.querySelector('[type="submit"]');

  populateFeedbackForm();
  form.addEventListener('submit', onFormSubmit);
  form.addEventListener('input', throttle(onInputData, 500));
  inputEmail.addEventListener('blur', onInputEmailBlur);

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

  function onInputEmailBlur(e) {
    const input = e.currentTarget;
    const { value } = e.currentTarget;

    if (value.includes('@') && value.includes('.')) {
      input.classList.add('valid');
      input.classList.remove('invalid');
      btnSubmit.disabled = false;
    } else {
      input.classList.add('invalid');
      input.classList.remove('valid');
      content.innerHTML = errorWarning;
      setTimeout(() => {
        content.innerHTML = '';
      }, 8000);
    }
  }
}
