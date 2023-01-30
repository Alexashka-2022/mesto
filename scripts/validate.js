const validationOptions= {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/*Функция отображает сообщения об ошибке*/
function enableShowError(form, input, errorMessage, options) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(options.inputErrorClass);
  error.classList.add(options.errorClass);
  error.textContent = errorMessage;
}

/*Функция убирает сообщения об ошибке*/
function disableShowError(form, input, options) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(options.inputErrorClass);
  error.classList.remove(options.errorClass);
  error.textContent = '';
};

/*Функция включает доступность кнопки на форме редактирования и добавления*/
function enableButton(buttonElement, options) {
  buttonElement.classList.remove(options.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', false);
};

/*Функция отключает доступность кнопки на форме редактирования и добавления*/
function disableButton(buttonElement, options) {
  buttonElement.classList.add(options.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

/*Функция проверки формы на валидность*/
function hasInvalidInput(inputList) {
  return inputList.some((inputItem) => { 
    return !inputItem.validity.valid;
  });
}; 

/*Функция переключения состояния кнопки на форме*/
function toggleButton(inputList, button, options) {
  if (hasInvalidInput(inputList)) {
    disableButton(button, options);
  } else {
    enableButton(button, options); 
  }
};

/* Функция проверки на валидность*/
function checkValidity(form, input, options) {
  if (!input.validity.valid) {
    enableShowError(form, input, input.validationMessage, options);
  } else {
    disableShowError(form, input, options);
  }
};

/*Функция добавления обработчиков*/
function enableEventListeners(form, options) {
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));
  const buttonSubmit = form.querySelector(options.submitButtonSelector);
  toggleButton(inputList, buttonSubmit, options);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input',() => {
      checkValidity(form, inputItem, options);
      toggleButton(inputList, buttonSubmit, options);
    });
  });
};

/*Функция получения формы*/
function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((form) => {
    enableEventListeners(form, options);
  });
};

enableValidation(validationOptions);