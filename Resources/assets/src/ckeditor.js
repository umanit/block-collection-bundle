import { Controller } from 'stimulus';

export default class extends Controller {
  static values = {
    config: Object,
  };

  initialize() {
    const destroy = new Function(this.element.dataset.ckeditorDestroy);
    const instanciate = new Function(this.element.dataset.ckeditorInstanciate);

    destroy();
    instanciate();
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
