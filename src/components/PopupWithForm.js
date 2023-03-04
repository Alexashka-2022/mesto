import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupInputList = this._popup.querySelectorAll('.popup__input');
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._formValues = {};

        this._popupInputList.forEach(inputElement => {
            this._formValues[inputElement.name] = inputElement.value;
        });

        return this._formValues;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        });
    }

}