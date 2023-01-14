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

const elementsList = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template-element').content;

/*Функция открытия формы*/
function openForm(popupName) {
  popupName.classList.add('popup_opened');
}

/*Функция закрытия формы*/
function closeForm(popupName) {
  popupName.classList.remove('popup_opened');
}

/*Функция записи результов редактирования*/
function formSaveResults(event) {
  event.preventDefault();
  profileName.textContent = popupUser.value;
  profileText.textContent = popupSpec.value;
  closeForm(popupEdit);
}

/*Функция добавления карточек*/
function embedCard(targetElement) {
  elementsList.prepend(targetElement);
}

/*Функция первоначальной отрисовки фотографий*/
function initialCurrentCards() {
  initialCards.reverse().forEach(item => {
    const newElement = createNewCard(item.name, item.link);
    embedCard(newElement); 
  });
}

initialCurrentCards();

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
  buttonLike.addEventListener('click', likeCard);

  /*Обработчик открытия увеличенного изображения*/
  imgObject.addEventListener('click', () => {
    openScaleImage(imgTitle.textContent, imgObject.src);
  });

  return templateItem;
}

/* Функция установки лайка на картинку*/
function likeCard(event) {
  event.target.classList.toggle('element__like_active');
}

/*Функция удаления картинки*/
function deleteCard(event) {
  event.target.closest('.element').remove();
}

/* Функция записи новой картинки*/
function formSaveNewCard(event) {
  event.preventDefault();
  newTemplate = createNewCard(popupTitle.value, popupLink.value);
  embedCard(newTemplate); 
  closeForm(popupAdd);
}

/*Функция открытия увеличенного изображения*/
function openScaleImage(imgName, imgLink) {
  popupImage.src = imgLink;
  popupImage.alt = imgName;
  popupImageTitle.textContent = imgName;
  openForm(popupScale);
}

/*Обработчик открытия формы редактирования элемента*/
popupEditButton.addEventListener('click', () => {
  openForm(popupEdit);
  popupUser.value = profileName.textContent;
  popupSpec.value = profileText.textContent;
});

/*Обработчик закрытия формы редактирования элемента*/
popupCloseEdit.addEventListener('click', () => {
  closeForm(popupEdit);
});

/*Обработчик записи формы редактирования*/
popupFormEdit.addEventListener('submit', formSaveResults);

/*Обработчик открытия формы добавления элемента*/
popupAddButton.addEventListener('click', () => {
  openForm(popupAdd);
  popupTitle.value = '';
  popupLink.value = '';
});

/*Обработчик закрытия формы добавления элемента*/
popupCloseAdd.addEventListener('click', () => {
  closeForm(popupAdd);
});

/*Обработчик записи нового элемента*/
popupFormAdd.addEventListener('submit', formSaveNewCard);

/*Обработчик закрытия увеличенного изображения*/
popupCloseScale.addEventListener('click', () => {
  closeForm(popupScale);
});