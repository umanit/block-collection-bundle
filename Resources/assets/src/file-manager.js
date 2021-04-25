import { Controller } from 'stimulus';
import { useDispatch, useIntersection } from 'stimulus-use';

export default class extends Controller {
  static values = {
    src: String,
    mediaControllerId: String,
  };

  initialize() {
    this.element.addEventListener('load', () => {
      this.element.contentWindow.document.body.querySelectorAll('.select').forEach(row => {
        row.addEventListener('click', () => {
          this.getMediaController().setPath(row.dataset.path);

          this.dispatch('media-selected');
        });
      });
    });
  }

  connect() {
    useDispatch(this);
    useIntersection(this);
  }

  appear() {
    if ('' === this.element.src) {
      this.element.src = this.srcValue;
    }
  }

  getMediaController() {
    return this.application.getControllerForElementAndIdentifier(
      document.getElementById(this.mediaControllerIdValue),
      this.identifier.replace('file-manager', 'media'),
    );
  }
}
