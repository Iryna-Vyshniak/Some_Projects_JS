import * as basicLightbox from 'basiclightbox';

const btnOpenModal = document.querySelector('.js-modal-form');

btnOpenModal.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();
  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
  }
  createModalInstance(e);
}

function createModalInstance() {
  const instance = basicLightbox.create(
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
            </form></div>`,
    {
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
    }
  );
  instance.show();

  function onEscKeyPress(e) {
    if (e.code !== 'Escape') return;
    instance.close();
  }
}
