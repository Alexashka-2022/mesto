import { openScaleImage } from "./index.js";

export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    };

    _getTemlate() {
        const templateElement = document.querySelector(this._templateSelector);
        const cardElement = templateElement.content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    /* Метод класса для удаления картинки*/
    _deleteCard(event) {
        event.target.closest('.element').remove();
    }

    /* Метод класса для установки лайка на картинку*/
    _toggleLike(event) {
        event.target.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__like').addEventListener('click', this._toggleLike);
        this._element.querySelector('.element__image').addEventListener('click', () => {
            openScaleImage(this._name, this._link);
        });
    }

    /*Метод класса для отрисовки новых фотографий на странице*/
    createNewCard() {
        this._element = this._getTemlate();
        const imgObject = this._element.querySelector('.element__image');
        const imgTitle = this._element.querySelector('.element__title');

        imgObject.setAttribute("src", this._link);
        imgObject.setAttribute("alt", this._name);
        imgTitle.textContent = this._name;


        this._setEventListeners();

        return this._element;
    }
}

