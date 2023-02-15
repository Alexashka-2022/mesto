import { initialCards } from "./initial-cards.js";
import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";

const popupEdit = document.querySelector('.popup_edit');
const popupCloseEdit = popupEdit.querySelector('.popup__closed');
const popupFormEdit = document.forms["edit-form"];
const popupEditButton = document.querySelector('.profile__edit-button');
const popupUser = popupEdit.querySelector('.popup__input_name');
const popupSpec = popupEdit.querySelector('.popup__input_specialization');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

const popupAdd = document.querySelector('.popup_add');
const popupCloseAdd = popupAdd.querySelector('.popup__closed');
const popupFormAdd = document.forms["add-form"];
const popupAddButton = document.querySelector('.profile__add-button');
const popupTitle = document.querySelector('.popup__input_place');
const popupLink = document.querySelector('.popup__input_link');
const popupAddSubmit = popupAdd.querySelector('.popup__save-button')

const popupScale = document.querySelector('.popup_scale');
const popupCloseScale = popupScale.querySelector('.popup__closed-image');
const popupImage = popupScale.querySelector('.popup__image');
const popupImageTitle = popupScale.querySelector('.popup__image-title');
const popups = document.querySelectorAll('.popup');

const elementsList = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template-element').content;

/*Опции, необходимые для валидации*/
const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/*Функция заполняет значения полей ввода для попапа редактивания,
чтобы валидация прошла после заполнения полей*/
function fillProfileInputs() {
  popupUser.value = profileName.textContent;
  popupSpec.value = profileText.textContent;
}

fillProfileInputs();

/*Функция открытия вслывающего окна*/
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeClick);
}

/*Функция закрытия всплывающего окна*/
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeClick);
}

/*Функция записи результов редактирования*/
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupUser.value;
  profileText.textContent = popupSpec.value;
  closePopup(popupEdit);
}

/*Функция добавления карточек*/
function prependCard(targetElement) {
  elementsList.prepend(targetElement);
}

/*Функция первоначальной отрисовки фотографий*/
function renderInitialCards(event) {
  initialCards.reverse().forEach(item => {
    prependCard(createNewCard(item.name, item.link));
  });
}

renderInitialCards();

/*Функция отрисовки новой фотографии на странице*/
function createNewCard(imageName, imageLink) {
  return (new Card(imageName, imageLink, ".template-element").createNewCard());
}

/* Функция записи новой картинки*/
function handleSaveNewCard(event) {
  event.preventDefault();
  prependCard(createNewCard(popupTitle.value, popupLink.value));
  closePopup(popupAdd);
  event.target.reset();
}

/*Функция открытия попапа просмотра изображения*/
export function openScaleImage(imgName, imgLink) {
  popupImage.src = imgLink;
  popupImage.alt = imgName;
  popupImageTitle.textContent = imgName;
  openPopup(popupScale);
}

/*Функция закрытия попапа по нажатию кнопки ESC*/
function handleEscapeClick(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

/* Функция открытия формы редактирования*/
function openEditPopup() {
  openPopup(popupEdit);
}

/* Функция открытия формы добавления элемента*/
function openAddPopup() {
  openPopup(popupAdd);
}


/*Универсальная функция закрытия попапов*/
function closeAllPopups() {

  const popups = document.querySelectorAll('.popup')

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__closed')) {
        closePopup(popup);
      }
    })
  })
}

/*Обработчик открытия формы редактирования элемента*/
popupEditButton.addEventListener('click', openEditPopup);

/*Обработчик записи формы редактирования*/
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);

/*Обработчик открытия формы добавления элемента*/
popupAddButton.addEventListener('click', openAddPopup);

/*Обработчик записи нового элемента*/
popupFormAdd.addEventListener('submit', handleSaveNewCard);

/*Запуск валидации попапа редактирования*/
const popupEditValidator = new FormValidator(validationOptions, popupEdit);
popupEditValidator.enableValidation();

/*Запуск валидации попапа добавления картинок*/
const popupAddValidator = new FormValidator(validationOptions, popupAdd);
popupAddValidator.enableValidation();

closeAllPopups();