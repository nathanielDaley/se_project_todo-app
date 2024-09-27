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
  handleFormSubmit: (values) => {
    values["id"] = uuidv4();

    // Create a date object and adjust for timezone
    values.date = new Date(values.date);
    values.date.setMinutes(
      values.date.getMinutes() + values.date.getTimezoneOffset()
    );

    renderTodo(values);

    newTodoValidator.resetValidation();

    addTodoPopup.close();
  },
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

todosList.renderItems();

addTodoPopup.setEventListeners();

newTodoValidator.enableValidation();
