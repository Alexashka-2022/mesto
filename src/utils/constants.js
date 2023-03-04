/*Набор стартовых изображений на странице*/
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  /*Опции, необходимые для валидации*/
export const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/*Переменные*/
export const popupEdit = document.querySelector('.popup_edit');
export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupUser = popupEdit.querySelector('.popup__input_name');
export const popupSpec = popupEdit.querySelector('.popup__input_specialization');
export const profileName = document.querySelector('.profile__name');
export const profileText = document.querySelector('.profile__text');
export const popupAdd = document.querySelector('.popup_add');
export const popupAddButton = document.querySelector('.profile__add-button');
export const popupTitle = document.querySelector('.popup__input_place');
export const popupLink = document.querySelector('.popup__input_link');
export const popupScale = document.querySelector('.popup_scale');
export const elementsList = document.querySelector('.elements__list');