export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialItems = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderInitialItems() {
        this._initialItems.forEach((item) => {
            this._renderer(item);
        });
    }
}