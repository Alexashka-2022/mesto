const popupEdit = document.querySelector('.popup_edit');
const popupCloseEdit = popupEdit.querySelector('.popup__closed');
const popupFormEdit = popupEdit.querySelector('.popup__form');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupUser = popupEdit.querySelector('.popup__input_name');
const popupSpec = popupEdit.querySelector('.popup__input_specialization');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

const popupAdd = document.querySelector('.popup_add');
const popupCloseAdd = popupAdd.querySelector('.popup__closed');
const popupFormAdd = popupAdd.querySelector('.popup__form');
const popupAddButton = document.querySelector('.profile__add-button');
const popupTitle = document.querySelector('.popup__input_place');
const popupLink = document.querySelector('.popup__input_link');

const popupScale = document.querySelector('.popup_scale');
const popupCloseScale = popupScale.querySelector('.popup__closed-image');
const popupImage = popupScale.querySelector('.popup__image');
const popupImageTitle = popupScale.querySelector('.popup__image-title');
const popups = document.querySelectorAll('.popup');

const elementsList = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template-element').content;

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
    const newElement = createNewCard(item.name, item.link);
    prependCard(newElement);
  });
}

renderInitialCards();

/*Функция отрисовки новой фотографии на странице*/
function createNewCard(imageName, imageLink) {
  const templateItem = templateElement.cloneNode(true);
  const imgObject = templateItem.querySelector('.element__image');
  const imgTitle = templateItem.querySelector('.element__title');
  const buttonDelete = templateItem.querySelector('.element__delete');
  const buttonLike = templateItem.querySelector('.element__like');

  imgTitle.textContent = imageName;
  imgObject.src = imageLink;
  imgObject.alt = imageName;

  /*Обработчик удаления картинок*/
  buttonDelete.addEventListener('click', deleteCard);

  /*Обработчик кнопки "Like" */
  buttonLike.addEventListener('click', toggleLike);

  /*Обработчик открытия увеличенного изображения*/
  imgObject.addEventListener('click', () => {
    openScaleImage(imgTitle.textContent, imgObject.src);
  });

  return templateItem;
}

/* Функция установки лайка на картинку*/
function toggleLike(event) {
  event.target.classList.toggle('element__like_active');
}

/*Функция удаления картинки*/
function deleteCard(event) {
  event.target.closest('.element').remove();
}

/* Функция записи новой картинки*/
function handleSaveNewCard(event) {
  event.preventDefault();
  const newTemplate = createNewCard(popupTitle.value, popupLink.value);
  prependCard(newTemplate);
  closePopup(popupAdd);
  event.target.reset();
}

/*Функция открытия попапа просмотра изображения*/
function openScaleImage(imgName, imgLink) {
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

/*Функция закрытия попапа кликом по overlay*/
function closePopupClickOnOverlay() {
  popups.forEach((elementPopup) => {
    elementPopup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup')) {
        closePopup(elementPopup);
      }
    });
  });
}

closePopupClickOnOverlay();

/* Функция открытия формы редактирования*/
function openEditPopup() {
  popupFormEdit.reset();
  popupUser.value = profileName.textContent;
  popupSpec.value = profileText.textContent;
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

closeAllPopups();