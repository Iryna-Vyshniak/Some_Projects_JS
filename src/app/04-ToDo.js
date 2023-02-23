import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr';
import '../../node_modules/toastr/toastr.scss';
import { modalToDo, onEscKeyPress } from './components';

const STORAGE_KEY = 'todos';
let todos = [];

const form = document.querySelector('.js-form-todo');
const list = document.querySelector('.js-todo-list');
const addBtn = form.querySelector('button[data-action="add"]');
const audioAdd = form.querySelector('.js-audio-add');
//const audioDelete = document.querySelector('.js-audio-delete'); - null поки не зарендериться хоча б одна тудушка, потрібно оновлювати сторінку

// const btns = list.querySelector('.btn-wrapper'); -для делегації подій для кнопок

const modalButton = modalToDo
  .element()
  .querySelector('.js-todo-modal__close-btn');

// add event listeners
form.addEventListener('submit', onFormSubmit);
list.addEventListener('click', onToDoClick);
modalButton.addEventListener('click', modalToDo.close);

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

// run
loadTodos();
render();

// populate todo list when reloading
function loadTodos() {
  try {
    toastr.success('Todos loaded successfully');
    todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // throw new Error('lorem ipsum');
  } catch (error) {
    toastr.error("can't load todos");
    todos = [];
  }
}

// save todos to locale storage
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// create markup
function getToDo({ id, value, checked }) {
  const checkedText = checked
    ? 'style="text-decoration: line-through; text-decoration-color: #9e0202; text-decoration-style: dotted; text-decoration-thickness: 1px;"'
    : '';
  return /*html*/ `
<li data-id="${id}" class="todo-list__item">
      <input data-action="check" type="checkbox" name="checkbox" class="todo-list__input" ${
        checked ? 'checked' : ''
      }/>
      <span ${checkedText}>${value}</span>
      <div class="btn-wrapper">
          <button data-action="delete" class="todo-list__btn js-todo-list__btn">
            <i data-action="delete" class="fa-sharp fa-solid fa-trash"></i>
          </button>
          <audio data-action="delete" src="/audio/delete.mp3" class="js-audio-delete"></audio>
          <button data-action="view" class="todo-list__btn">
           <i data-action="view" class="fa fa-sticky-note" aria-hidden="true"></i>
          </button>
      </div>
    </li>`;
}

// render markup
function render() {
  // const listItem = todos.map(todo => getToDo(todo)).join('');
  const listItem = todos.map(getToDo).join('');
  list.innerHTML = '';
  list.insertAdjacentHTML('beforeend', listItem);
}

// submit
function onFormSubmit(e) {
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
}

// check
function toggleCheckbox(id) {
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
}

// delete
function deleteToDoItem(id) {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  render();
  toastr.success('Todo deleted successfully');
}

//view
function viewToDo(id) {
  const { created } = todos.find(todo => todo.id === id);
  const { value } = todos.find(todo => todo.id === id);

  const text = modalToDo.element().querySelector('.text');
  const title = modalToDo.element().querySelector('h4');

  text.textContent = created;
  title.textContent = value;
  modalToDo.show();
}

// click on todo item
function onToDoClick(e) {
  if (e.target === e.currentTarget) return;
  const { action } = e.target.dataset;
  const parent = e.target.closest('li');
  const { id } = parent?.dataset || {};

  switch (action) {
    case 'check':
      // const listItem = list.querySelector(`li[data-id="${id}"]`);
      // const text = listItem.querySelector('span');
      // text.style.textDecoration = 'line-through';
      toggleCheckbox(id);
      break;

    case 'delete':
      // оголошуємо змінну audioDelete (вже зарендерена розмітка), щоб звернутися до аудіо-елементу:
      const audioDelete = document.querySelector('.js-audio-delete');
      audioDelete.src = '../audio/delete.mp3';
      audioDelete.play(); //  відтворення звуку на кнопку delete
      //Uncaught (in promise) DOMException: The play() request was interrupted because the media was removed from the document
      // Uncaught (in promise) DOMException: запит play() було перервано, оскільки носій видалено з документа.
      // не встигає відтворитися, перед видаленням??????
      deleteToDoItem(id);
      break;

    case 'view':
      viewToDo(id);
      break;
  }
}

// також не працює

// // вибираємо усі елементи кнопки delete
// const deleteBtns = document.querySelectorAll('button[data-action="delete"]');
// console.log(deleteBtns);

// // додаємо подію "click" до кожної кнопки delete
// deleteBtns.forEach(btn => {
//   btn.addEventListener('click', () => {
//     console.log('click audio');
//     // відтворюємо аудіофайл
//     const audioDelete = document.querySelector('.js-audio-delete');
//     audioDelete.src = './audio/delete.mp3';
//     audioDelete.play();
//   });
// });
