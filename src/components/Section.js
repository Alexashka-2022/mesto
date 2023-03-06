export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    rendererItems() {
        this._initialItems.forEach((item) => {
            this._renderer(item);
        });
    }
}