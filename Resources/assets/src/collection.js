import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['list', 'addBtn'];
  static values = {
    allowAdd: Boolean,
    allowDelete: Boolean,
    min: Number,
    max: Number,
    initialNbElements: Number,
    prototype: String,
    nbElements: Number,
  };

  initialize() {
    for (let i = 0; i < this.initialNbElementsValue; i++) {
      this.add();
    }
  }

  add(e) {
    if (e) {
      e.preventDefault();
    }

    if ('' === this.prototypeValue) {
      return;
    }

    const itemProto = this.prototypeValue
      .replace(/__name__label__/g, this.nbElementsValue)
      .replace(/__name__/g, this.nbElementsValue)
    ;

    this.listTarget.insertAdjacentHTML('beforeend', itemProto);

    ++this.nbElementsValue;
  }

  remove(e) {
    if (e) {
      e.preventDefault();
    }

    const item = e.currentTarget.closest('[data-umanit--block-collection-bundle--collection-target="item"]');

    if (null !== item) {
      item.remove();

      --this.nbElementsValue;
    }
  }

  nbElementsValueChanged() {
    if (this.maxValue > this.nbElementsValue) {
      this.addBtnTarget.removeAttribute('disabled');
    } else {
      this.addBtnTarget.setAttribute('disabled', true);
    }
  }
}
