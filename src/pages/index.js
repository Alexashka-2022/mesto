import '../pages/index.css';
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  initialCards,
  validationOptions,
  popupEdit,
  popupEditButton,
  popupUser,
  popupSpec,
  profileName,
  profileText,
  popupAdd,
  popupAddButton,
  popupTitle,
  popupLink,
  popupScale,
  elementsList
} from "../utils/constants.js";

const profileOptions = new UserInfo(
  {
    userName: profileName,
    userData: profileText
  });

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardItem = createNewCard(item);
      cardsList.addItem(cardItem);
    },
  }, elementsList
);

const popupEditProfile = new PopupWithForm(popupEdit, () => {
  profileOptions.setUserInfo({
    userName: popupUser.value,
    userData: popupSpec.value
  });
});

const popupAddCard = new PopupWithForm(popupAdd, () => {
  cardsList.addItem(createNewCard({
    name: popupTitle.value,
    link: popupLink.value
  }));
  formValidators['add-form'].resetValidation();
});

const popupImageScale = new PopupWithImage(popupScale);

function handleCardClick(event) {
  popupImageScale.open(event.target);
}

/*Функция отрисовки новой фотографии на странице*/
function createNewCard(imageElement) {
  return (new Card(imageElement, ".template-element", handleCardClick).createNewCard());
}

const formValidators = {}

/*Включение валидации*/
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationOptions);

cardsList.renderInitialItems();

popupEditProfile.setEventListeners();

popupAddCard.setEventListeners()

popupImageScale.setEventListeners();

/*Обработчик открытия попапа редактирования элемента*/
popupEditButton.addEventListener('click', () => {
  popupEditProfile.open();
  const { userName, userData } = profileOptions.getUserInfo();
  popupUser.value = userName;
  popupSpec.value = userData;
  formValidators['edit-form'].resetValidation();
});

/*Обработчик открытия добавления добавления элемента*/
popupAddButton.addEventListener('click', () => {
  popupAddCard.open();
});


