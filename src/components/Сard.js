export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._element = this._getTemlate();
        this._imgObject = this._element.querySelector('.element__image');
        this._imgTitle = this._element.querySelector('.element__title');
        this._handleCardClick = handleCardClick;
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
        this._imgObject.addEventListener('click',this._handleCardClick);
    }

    /*Метод класса для отрисовки новых фотографий на странице*/
    createNewCard() {
        this._imgObject.setAttribute("src", this._link);
        this._imgObject.setAttribute("alt", this._name);
        this._imgTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}

