export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popupElement.classList.add("popup_visible");

    this._popupElement.focus();

    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");

    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mouseup", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}
