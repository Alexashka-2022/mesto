import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitButton = this._popupForm.querySelector('.popup__save-button');
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitForm();
        });
    }

    changeHandlerSubmitForm(newHandler) {
        this._submitForm = newHandler;
    }

}