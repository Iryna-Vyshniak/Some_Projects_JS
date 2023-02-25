import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

import throttle from 'lodash.throttle';
import { markupForm } from './components';

const LOCAL_KEY = 'feedback-form-state';
let timerId = null;
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

function createModalInstance() {
  const instance = basicLightbox.create(markupForm, {
    onShow: instance => {
      instance.element().querySelector('.js-modal__close-btn').onclick =
        instance.close;
      window.addEventListener('keydown', onEscKeyPress);
    },
    onClose: instance => {
      window.removeEventListener('keydown', onEscKeyPress);
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        btnOpenModal.classList.add('active');
      }, 500);
    },
  });

  instance.show();

  // save field values ​​to local storage when the user types something in the fields of form
  const form = document.querySelector('.feedback-form');
  const inputEmail = form.querySelector('.js-feedback-form__email');
  const textarea = form.querySelector('.feedback-form  textarea');
  const content = form.querySelector('.js-feedback-form__email + span');
  const btnSubmit = form.querySelector('[type="submit"]');

  populateFeedbackForm();
  form.addEventListener('submit', onFormSubmit);
  form.addEventListener('input', throttle(onInputData, 500));
  inputEmail.addEventListener('blur', onInputEmailBlur);

  function onFormSubmit(e) {
    e.preventDefault();

    if (localStorage.getItem(LOCAL_KEY)) {
      localStorage.removeItem(LOCAL_KEY);
    }
    const { email, message } = e.currentTarget.elements;
    console.log({ email: email.value, message: message.value });

    e.currentTarget.reset();
  }

  function onInputData(e) {
    let data = localStorage.getItem(LOCAL_KEY);
    data = data ? JSON.parse(data) : {};
    data = {
      email: inputEmail.value.trim(),
      message: textarea.value.trim(),
    };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  }

  function populateFeedbackForm() {
    let data = localStorage.getItem(LOCAL_KEY);
    if (data) {
      data = JSON.parse(data);
      Object.entries(data).forEach(([name, value]) => {
        form.elements[name].value = value ?? '';
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
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        content.innerHTML = '';
      }, 8000);
    }
  }
}
