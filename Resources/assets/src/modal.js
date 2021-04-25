import { Controller } from 'stimulus';
import { useDebounce, useWindowResize } from 'stimulus-use';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
  static debounces = ['windowResize'];
  static targets = ['overlay', 'modal'];

  initialize() {
    document.body.appendChild(this.element);
  }

  connect() {
    useDebounce(this, { wait: 200 });
    useWindowResize(this);

    this.escCloseEvent = this.escCloseEvent.bind(this);
  }

  disconnect() {
    document.addEventListener('keyup', this.escCloseEvent);
  }

  toggle() {
    if (this.modalTarget.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  }

  open(e) {
    if (e) {
      e.preventDefault();
    }

    this.modalTarget.classList.add('active');
    this.element.style.display = '';
    this.modalTarget.removeAttribute('aria-hidden');
    this.overlayTarget.classList.add('active');
  }

  close(e) {
    if (e) {
      e.preventDefault();
    }

    this.modalTarget.classList.remove('active');
    this.element.style.display = 'none';
    this.modalTarget.setAttribute('aria-hidden', 'true');
    this.overlayTarget.classList.remove('active');
  }

  windowResize() {
    this.close();
  }

  escCloseEvent(e) {
    if ('Escape' === e.key) {
      this.close();
    }
  }
}
