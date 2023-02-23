import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr';
import '../../node_modules/toastr/toastr.scss';
import { modalToDo, onEscKeyPress } from './components';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const form = document.querySelector('.js-form-todo');
const list = document.querySelector('.js-todo-list');
const modalButton = modalToDo
  .element()
  .querySelector('.js-todo-modal__close-btn');

let todos = [
  // {
  //   id: '1',
  //   text: 'buy bread',
  //   checked: false,
  //   created: '2023-02-23',
  // },
  // {
  //   id: '2',
  //   text: 'buy milk for coffee',
  //   checked: true,
  //   created: '2023-02-22',
  // },
  // {
  //   id: '3',
  //   text: 'top up phone',
  //   checked: true,
  //   created: '2023-02-21',
  // },
];

// populate todo list when reloading
const loadTodos = () => {
  try {
    toastr.success('Todos loaded successfully');
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    // throw new Error('lorem ipsum');
  } catch (error) {
    toastr.error("can't load todos");
    todos = [];
  }
};

// update todos
const updateTodo = newToDo => {
  localStorage.setItem('todos', JSON.stringify(newToDo));
};

// save todos to locale storage
const saveTodos = newToDo => {
  localStorage.setItem('todos', JSON.stringify(newToDo));
};

// delete todos from locale storage
const deleteTodo = newToDo => {
  localStorage.setItem('todos', JSON.stringify(newToDo));
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

  saveTodos(todos);
  todos.push(newToDo);
  render();
  e.currentTarget.reset();
  //toastr.success('Todo created successfully');
};

// create markup
const getToDo = ({ id, value, checked }) => `
<li data-id="${id}" class="todo-list__item">
      <input data-action="check" type="checkbox" name="checkbox" class="todo-list__input" ${
        checked ? 'checked' : ''
      }/>
      <span>${value}</span>
      <div class="btn-wrapper">
          <button data-action="delete" class="todo-list__btn">
            <i data-action="delete" class="fa-sharp fa-solid fa-trash"></i>
          </button>
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

// delete
const deleteToDoItem = id => {
  todos = todos.filter(todo => todo.id !== id);

  deleteTodo(todos);
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

// check
const toggleCheckbox = id => {
  todos = todos.map(item => {
    return item.id === id
      ? {
          ...item,
          checked: !item.checked,
        }
      : item;
  });

  updateTodo(todos);
};

// click on todo item
const onToDoClick = e => {
  if (e.target === e.currentTarget) return;
  const { action } = e.target.dataset;
  const parent = e.target.closest('li');

  const { id } = parent?.dataset || {};

  switch (action) {
    case 'delete':
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

// run
loadTodos();
render();

// add event listeners
form.addEventListener('submit', onFormSubmit);
list.addEventListener('click', onToDoClick);
modalButton.addEventListener('click', modalToDo.close);
