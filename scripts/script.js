let popupEdit = document.querySelector('.popup_edit');
let popupCloseEdit = popupEdit.querySelector('.popup__closed');
let popupFormEdit = popupEdit.querySelector('.popup__form');
let popupEditButton = document.querySelector('.profile__edit-button');
let popupUser = popupEdit.querySelector('.popup__input_name');
let popupSpec = popupEdit.querySelector('.popup__input_specialization');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

let popupAdd = document.querySelector('.popup_add');
let popupCloseAdd = popupAdd.querySelector('.popup__closed');
let popupFormAdd = popupAdd.querySelector('.popup__form');
let popupAddButton = document.querySelector('.profile__add-button');
let popupTitle = document.querySelector('.popup__input_place');
let popupLink = document.querySelector('.popup__input_link');

let popupScale = document.querySelector('.popup_scale');
let popupCloseScale = popupScale.querySelector('.popup__closed-image');
let popupImage = popupScale.querySelector('.popup__image');
let popupImageTitle = popupScale.querySelector('.popup__image-title');

let elementsList = document.querySelector('.elements__list');
let templateElement = document.querySelector('.template-element').content;

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

/*Набор стартовых изображений на странице*/
const initialCards = [
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

/*Функция первоначальной отрисовки фотографий*/
function initialCurrentCards() {
  initialCards.forEach(item => {
    let newElement = createNewCard(item.name, item.link);
    elementsList.append(newElement);
  });
}

initialCurrentCards();

/*Функция отрисовки новой фотографии на странице*/
function createNewCard(imageName, imageLink) {
  let templateItem = templateElement.cloneNode(true);
  let imgObject = templateItem.querySelector('.element__image');
  let imgTitle = templateItem.querySelector('.element__title');
  let buttonDelete = templateItem.querySelector('.element__delete');
  let buttonLike = templateItem.querySelector('.element__like');


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
  newTemplate = createNewCard(popupTitle.value, popupLink.value)
  elementsList.prepend(newTemplate);
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