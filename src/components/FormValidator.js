export default class FormValidator {
    constructor(options, formElement) {
        this._options = options;
        this._formElement = formElement;
        this._buttonSubmit = formElement.querySelector(options.submitButtonSelector);
        this._inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    };

    /*Метод отображает сообщения об ошибке*/
    _enableShowError(input, errorMessage) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(this._options.inputErrorClass);
        error.classList.add(this._options.errorClass);
        error.textContent = errorMessage;
    }

    /*Метод убирает сообщения об ошибке*/
    _disableShowError(input) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(this._options.inputErrorClass);
        error.classList.remove(this._options.errorClass);
        error.textContent = '';
    };

    /*Метод включает доступность кнопки подтверждения*/
    _enableButton() {
        this._buttonSubmit.classList.remove(this._options.inactiveButtonClass);
        this._buttonSubmit.removeAttribute('disabled', false);
    };

    /*Метод отключает доступность кнопки подтверждения*/
    _disableButton() {
        this._buttonSubmit.classList.add(this._options.inactiveButtonClass);
        this._buttonSubmit.setAttribute('disabled', true);
    };

    /*Метод проверки формы на валидность*/
    _hasInvalidInput(inputList) {
        return inputList.some((inputItem) => {
            return !inputItem.validity.valid;
        });
    };

    /*Метод переключения состояния кнопки на форме*/
    _toggleButton() {
        if (this._hasInvalidInput(this._inputList)) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    };

    /* Метод проверки на валидность*/
    _checkValidity(input) {
        if (!input.validity.valid) {
            this._enableShowError(input, input.validationMessage);
        } else {
            this._disableShowError(input);
        }
    };

    /*Метод добавления обработчиков*/
    _enableEventListeners() {

        this._toggleButton();
        this._inputList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this._checkValidity(inputItem);
                this._toggleButton();
            });
        });
    };

    /*Метод получения формы*/
    enableValidation() {
        this._enableEventListeners();
    };

    /* Метод для сброса валидации*/
    resetValidation() {
        this._toggleButton();

        this._inputList.forEach((inputElement) => {
            this._disableShowError(inputElement);
        });
    };

}