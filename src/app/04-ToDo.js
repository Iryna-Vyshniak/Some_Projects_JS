import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr';
import '../../node_modules/toastr/toastr.scss';
import { modalToDo, onEscKeyPress } from './components';

const STORAGE_KEY = 'todos';

// greeting
const today = new Date();
const dayHour = today.getHours();
let greeting;

if (dayHour >= 11 && dayHour <= 17) {
  greeting = 'Good day! \n Welcome!';
} else if (dayHour >= 5 && dayHour <= 11) {
  greeting = 'Good morning! \n Welcome!';
} else if (dayHour >= 18 && dayHour <= 23) {
  greeting = 'Good evening! \n Welcome!';
} else {
  greeting = 'Hello! \n Welcome!';
}

const greetingBlock = document.querySelector('.greeting');
greetingBlock.innerHTML = greeting;

// todo
const form = document.querySelector('.js-form-todo');
const list = document.querySelector('.js-todo-list');

const modalButton = modalToDo
  .element()
  .querySelector('.js-todo-modal__close-btn');

let todos = [];

// populate todo list when reloading
const loadTodos = () => {
  try {
    toastr.success('Todos loaded successfully');
    todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // throw new Error('lorem ipsum');
  } catch (error) {
    toastr.error("can't load todos");
    todos = [];
  }
};

// save todos to locale storage
const saveTodos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// create markup
const getToDo = ({ id, value, checked }) => /*html*/ `
<li data-id="${id}" class="todo-list__item">
      <input data-action="check" type="checkbox" name="checkbox" class="todo-list__input" ${
        checked ? 'checked' : ''
      }/>
      <span>${value}</span>
      <div class="btn-wrapper">
          <button data-action="delete" class="todo-list__btn paused">
            <i data-action="delete" class="fa-sharp fa-solid fa-trash paused"></i>
          </button>
          <audio data-action="delete" src="../audio/delete.mp3" class="js-audio-delete"></audio>
          <button data-action="view" class="todo-list__btn">
           <i data-action="view" class="fa fa-sticky-note" aria-hidden="true"></i>
          </button>
      </div>
    </li>`;

const render = () => {
  // const listItem = todos.map(todo => getToDo(todo)).join('');
  const listItem = todos.map(getToDo).join('');
  list.innerHTML = '';
  list.insertAdjacentHTML('beforeend', listItem);
};

// submit
const onFormSubmit = e => {
  e.preventDefault();

  const input = e.currentTarget.elements.text;
  const { value } = input;
  const newToDo = {
    id: uuidv4(),
    value,
    checked: false,
    created: new Date(),
  };

  todos.push(newToDo);
  e.currentTarget.reset();
  addBtn.classList.toggle('paused');
  audioAdd.paused ? audioAdd.play() : audioAdd.pause();
  saveTodos();
  render();
};

// check
const toggleCheckbox = id => {
  todos = todos.map(todo => {
    return todo.id === id
      ? {
          ...todo,
          checked: !todo.checked,
        }
      : todo;
  });

  saveTodos();
  render();
};

// delete
const deleteToDoItem = id => {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  render();
  toastr.success('Todo deleted successfully');
};

//view
const viewToDo = id => {
  const { created } = todos.find(todo => todo.id === id);
  const { value } = todos.find(todo => todo.id === id);

  const text = modalToDo.element().querySelector('.text');
  const title = modalToDo.element().querySelector('h4');

  text.textContent = created;
  title.textContent = value;
  modalToDo.show();
};

// click on todo item
const onToDoClick = e => {
  if (e.target === e.currentTarget) return;
  const { action } = e.target.dataset;
  const parent = e.target.closest('li');

  const { id } = parent?.dataset || {};

  switch (action) {
    case 'delete':
      console.log(deleteBtn);
      console.log(audioDelete);
      deleteBtn.classList.toggle('paused');
      audioDelete.paused ? audioDelete.play() : audioDelete.pause();
      deleteToDoItem(id);
      break;

    case 'view':
      viewToDo(id);
      break;

    case 'check':
      toggleCheckbox(id);
      break;
  }
};

//audio
// function onAudioPlay(e) {
//   console.log(e.target.dataset.action);
//   // if (e.target.dataset.action === 'delete') {
//   //   deleteBtn.classList.toggle('paused');
//   //   audioDelete.paused ? audioDelete.play() : audioDelete.pause();
//   // }
// }

// run
loadTodos();
render();

const addBtn = form.querySelector('button[data-action="add"]');
const deleteBtn = list.querySelector('button[data-action="delete"]');
console.log(deleteBtn);
const audioDelete = list.querySelector('.js-audio-delete');
const audioAdd = form.querySelector('.js-audio-add');
const btns = list.querySelector('.btn-wrapper');
console.log(btns);

// add event listeners
form.addEventListener('submit', onFormSubmit);
list.addEventListener('click', onToDoClick);
modalButton.addEventListener('click', modalToDo.close);
//btns.addEventListener('click', onAudioPlay);
