export default class Card {
    constructor(data, ownerId, templateSelector, handleCardClick, handleDeleteCard, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._element = this._getTemlate();
        this._buttonLike = this._element.querySelector('.element__like');
        this._buttonDelete = this._element.querySelector('.element__delete');
        this._imgObject = this._element.querySelector('.element__image');
        this._imgTitle = this._element.querySelector('.element__title');
        this._handleCardClick = handleCardClick.handleCardClick;
        this._handleDeleteCard = handleDeleteCard.handleDeleteCard;
        this._handleLikeClick = handleLikeClick.handleLikeClick;
        this._likes = data.likes;
        this._likeCounter = this._element.querySelector('.element__likes-count');
        this._ownerId = ownerId;
        this._id = data._id;
        this._cardOwnerId = data.owner._id;
        this._isOwner = this._ownerId === this._cardOwnerId;

    };

    _getTemlate() {
        const templateElement = document.querySelector(this._templateSelector);
        const cardElement = templateElement.content.querySelector('.element').cloneNode(true);

        return cardElement;
    }

    /* Метод класса для удаления картинки*/
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    getId() {
        return this._id;
    }

    setLikesCount(likes) {
        this._likeCounter.textContent = likes.length;
    }

    isLiked() {
        return this._likes.find((like) => like._id === this._ownerId);
    }

    addLike(likes) {
        this._buttonLike.classList.add('element__like_active');
        this.isLiked(true);
        this.setLikesCount(likes);
        this._likes = likes;
    }

    deleteLike(likes) {
        this._buttonLike.classList.remove('element__like_active');
        this.isLiked(false);
        this.setLikesCount(likes);
        this._likes = likes;
    }

    _setEventListeners() {
        this._buttonDelete.addEventListener('click', () =>
            this._handleDeleteCard());
        this._buttonLike.addEventListener('click', () =>
            this._handleLikeClick());
        this._imgObject.addEventListener('click', () =>
            this._handleCardClick());
    }

    /*Метод класса для отрисовки новых фотографий на странице*/
    createNewCard() {
        this._imgObject.setAttribute("src", this._link);
        this._imgObject.setAttribute("alt", this._name);
        this._imgTitle.textContent = this._name;

        if (this.isLiked()) {
            this._buttonLike.classList.add('element__like_active');
        }

        if (!this._isOwner) {
            this._buttonDelete.remove();
        }

        this.setLikesCount(this._likes)
        this._setEventListeners();

        return this._element;
    }
}

