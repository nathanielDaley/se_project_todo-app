import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const todosList = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.addItem(todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const id = uuidv4();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id, name, date };
  renderTodo(values);

  newTodoValidator.resetValidation();

  addTodoPopup.close();
});

todosList.renderItems();

addTodoPopup.setEventListeners();

newTodoValidator.enableValidation();
