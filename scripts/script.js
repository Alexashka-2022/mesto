let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__closed');
let popupForm = document.querySelector('.popup__form');
let popupEdit = document.querySelector('.profile__edit-button');
let popupUser = document.querySelector('.popup__input_name');
let popupSpec = document.querySelector('.popup__input_specialization');

let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
function openForm() {
    popup.classList.add('popup__opened');
    popupUser.value = profileName.textContent;
    popupSpec.value = profileText.textContent;
}

function closeForm() {
    popup.classList.remove('popup__opened');
}

function formSaveResults(event) {
    event.preventDefault();
    profileName.textContent = popupUser.value;
    profileText.textContent = popupSpec.value;
    closeForm();
}

popupEdit.addEventListener('click',openForm);
popupClose.addEventListener('click',closeForm);
popupForm.addEventListener('submit',formSaveResults);


