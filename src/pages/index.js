import '../pages/index.css';
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import {
  profileImage,
  validationOptions,
  popupEditButton,
  popupUser,
  popupSpec,
  popupAddButton,
  popupUpdateButton
} from "../utils/constants.js";

const api = new Api(
  {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
    headers: {
      "content-type": "application/json",
      authorization: "a7b09761-28da-4b57-871e-f84fdfb6fd09",
    },
  });

const profileOptions = new UserInfo(
  {
    userName: '.profile__name',
    userData: '.profile__text',
    userAvatar: '.profile__image'
  });


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userIdData, cardData]) => {
    profileOptions.setUserInfo(userIdData);
    cardsList.rendererItems(cardData, userIdData._id);
  })
  .catch((err) => {
    console.log(err);
  })

const cardsList = new Section(
  {
    renderer: (item, userId) => {
      const cardItem = createNewCard(item, userId);
      cardsList.addItem(cardItem);
    },
  }, '.elements__list'
);

const popupEditProfile = new PopupWithForm('.popup_edit', (data) => {
  popupEditProfile.showMessage("Сохранение...");
  api.editUserInfo(data["userName"], data["userData"])
    .then((res) => {
      profileOptions.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      popupUpdateAvatar.showMessage("Сохранить");
    })
});

const popupAddCard = new PopupWithForm('.popup_add', (data) => {
  popupAddCard.showMessage("Сохранение...");
  api.addNewCard(data["name"], data["link"])
    .then((res) => {
      cardsList.addItem(createNewCard(res, res.owner._id));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      popupUpdateAvatar.showMessage("Создать");
    })
});

const popupImageScale = new PopupWithImage('.popup_scale');

const popupWithConfirm = new PopupWithConfirmation('.popup_confirm');

function createNewCard(imageElement, userId) {
  const newCard = new Card(imageElement, userId, ".template-element", {
    handleCardClick: () =>
      popupImageScale.open(imageElement)
  },
    {
      handleDeleteCard: () => {
        popupWithConfirm.open();
        popupWithConfirm.changeHandlerSubmitForm(() => {
          api.deleteCard(newCard.getId())
            .then((res) => {
              newCard.deleteCard();
              popupWithConfirm.close();
            }).catch((err) => {
              console.log(err);
            })
        })
      }
    },
    {
      handleLikeClick: () => {
        if (newCard.isLiked()) {
          api.deleteLike(newCard.getId())
            .then((res) => {
              newCard.deleteLike(res.likes);
            }).catch((err) => {
              console.log(err);
            })
        } else {
          api.addLike(newCard.getId())
            .then((res) => {
              newCard.addLike(res.likes);
            }).catch((err) => {
              console.log(err);
            })
        }
      }
    });

  const cardElement = newCard.createNewCard();

  return cardElement;
}

const popupUpdateAvatar = new PopupWithForm('.popup_update', (data) => {
  popupUpdateAvatar.showMessage("Сохранение...");
  api.editUserAvatar(data["avatar-link"])
    .then((res) => {
      profileOptions.setAvatar(res.avatar);
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      popupUpdateAvatar.showMessage("Сохранить");
    })
});

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

popupEditProfile.setEventListeners();

popupAddCard.setEventListeners()

popupImageScale.setEventListeners();

popupWithConfirm.setEventListeners();

popupUpdateAvatar.setEventListeners();

/*Обработчик открытия попапа редактирования элемента*/
popupEditButton.addEventListener('click', () => {
  popupEditProfile.open();
  const { userName, userData, userAvatar } = profileOptions.getUserInfo();
  popupUser.value = userName;
  popupSpec.value = userData;
  formValidators['edit-form'].resetValidation();
});

/*Обработчик открытия добавления добавления элемента*/
popupAddButton.addEventListener('click', () => {
  formValidators['add-form'].resetValidation();
  popupAddCard.open();
});

popupUpdateButton.addEventListener('click', () => {
  formValidators['update-form'].resetValidation();
  popupUpdateAvatar.open();
});


