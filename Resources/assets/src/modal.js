import { Controller } from 'stimulus';

import './style.css';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
  static targets = ['overlay', 'modal'];

  initialize() {
    document.body.appendChild(this.element);
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
}
