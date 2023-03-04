import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    }

    open(data) {
        super.open();
        this._popupImage.src = data.src;
        this._popupImage.alt = data.alt;
        this._popupImageTitle.textContent = data.alt;
    }
}