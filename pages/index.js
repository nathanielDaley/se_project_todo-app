import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

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

    todoCounter.updateTotal(true);

    newTodoValidator.resetValidation();

    addTodoPopup.close();
  },
});

const newTodoValidator = new FormValidator(
  validationConfig,
  addTodoPopup.getForm()
);

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (completed) => {
      todoCounter.updateCompleted(completed);
    },
    (completed) => {
      if (completed) {
        todoCounter.updateCompleted(false);
      }
      todoCounter.updateTotal(false);
    }
  );
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
