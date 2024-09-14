class Todo {
  constructor(data, selector) {
    console.log(data);
    console.log(selector);
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _generateName() {
    this._todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoNameEl.textContent = this._data.name;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;

    // Link checkbox with label for form submital
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDate() {
    this._todoDate = this._todoElement.querySelector(".todo__date");

    // If a due date has been set, parsing it with `new Date` will return a
    // number. If so, we display a string version of the due date in the todo.
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateDeleteBtn() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._generateName(); //this._todoNameEl
    this._generateCheckboxEl(); //this._todoCheckboxEl
    this._generateDate(); //this._todoDate
    this._generateDeleteBtn(); //this._todoDeleteBtn
    this._setEventListeners(); //adds event listeners to this._todoCheckboxEl and this._todoDeleteBtn

    return this._todoElement;
  }
}

export default Todo;
