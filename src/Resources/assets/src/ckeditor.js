import { Controller } from 'stimulus';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
  static values = {
    config: Object,
  };

  initialize() {
    const nextSibling = this.element.nextElementSibling;

    if (!nextSibling || !nextSibling.classList.contains('cke')) {
      const destroy = new Function(this.element.dataset.ckeditorDestroy);
      const instanciate = new Function(this.element.dataset.ckeditorInstanciate);

      destroy();
      instanciate();
    }
  }

  destroy() {
    if ('undefined' !== typeof CKEDITOR) {
      this.configValue = CKEDITOR.instances[this.element.id].config;

      CKEDITOR.instances[this.element.id].destroy();
    }
  }

  restore() {
    if ('undefined' !== typeof CKEDITOR && this.configValue) {
      CKEDITOR.replace(this.element.id, this.configValue);
    }
  }
}
