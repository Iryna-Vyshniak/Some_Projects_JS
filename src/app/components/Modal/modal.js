import * as basicLightbox from 'basiclightbox';
import '../../../../node_modules/basiclightbox/dist/basicLightbox.min.css';

export const modalToDo = basicLightbox.create(`
  <div class="modal">
    <h4></h4>
    <p class="text">test modal text</p>
    <button class="todo-modal__close-btn js-todo-modal__close-btn">ok</button>
  </div>
`);

export const markupForm = ` <div class="feedback-modal">
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
