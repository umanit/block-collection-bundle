import { Controller } from 'stimulus';
import { useDispatch } from 'stimulus-use';
import Cropper from 'cropperjs';
import { ajax } from '@umanit/tools';

import 'cropperjs/dist/cropper.min.css';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
  static targets = ['preview', 'modal', 'container', 'x', 'y', 'width', 'height', 'save'];
  static values = {
    ratio: Number,
    url: String,
    conf: String,
  };

  connect() {
    useDispatch(this);
  }

  do(e) {
    e.preventDefault();

    this.openModal();

    const src = this.previewTarget.querySelector('img').src;
    const x = this.xTarget;
    const y = this.yTarget;
    const width = this.widthTarget;
    const height = this.heightTarget;
    const save = this.saveTarget;

    this.containerTarget.innerHTML = `<img src="${src}" alt="" style="max-width: 100%;" />`;
    const addedImg = this.containerTarget.lastElementChild;

    this.cropper = new Cropper(addedImg, {
      aspectRatio: this.ratioValue ? this.ratioValue : 'free',
      zoomable: true,
      viewMode: 1,
      crop(event) {
        x.textContent = Math.round(event.detail.x);
        y.textContent = Math.round(event.detail.y);
        width.textContent = Math.round(event.detail.width);
        height.textContent = Math.round(event.detail.height);

        if (event.detail.width <= 4 || event.detail.height <= 4) {
          save.classList.add('disabled');
          save.setAttribute('disabled', true);
        } else {
          save.classList.remove('disabled');
          save.removeAttribute('disabled');
        }
      },
    });
  }

  rotateRight(e) {
    e.preventDefault();

    if (!this.cropper) {
      return;
    }

    this.cropper.rotate(90);
  }

  rotateLeft(e) {
    e.preventDefault();

    if (!this.cropper) {
      return;
    }

    this.cropper.rotate(-90);
  }

  flipX(e) {
    e.preventDefault();

    if (!this.cropper) {
      return;
    }

    this.cropper.scaleX(-this.cropper.imageData.scaleX);
  }

  flipY(e) {
    e.preventDefault();

    if (!this.cropper) {
      return;
    }

    this.cropper.scaleY(-this.cropper.imageData.scaleY);
  }

  apply(e) {
    e.preventDefault();

    if (!this.cropper) {
      return;
    }

    const data = this.cropper.getData();

    ajax(this.urlValue, {
      method: 'post',
      json: {
        conf: this.confValue,
        src: this.previewTarget.querySelector('img').getAttribute('src'),
        x: Math.round(data.x),
        y: Math.round(data.y),
        width: Math.round(data.width),
        height: Math.round(data.height),
        scaleX: data.scaleX,
        scaleY: data.scaleY,
        rotate: data.rotate,
        checkCrossOrigin: false,
      },
    }).then(({ json: path }) => {
        this.dispatch('crop', { path });

        this.closeModal();
      })
      .catch(err => console.error(err))
      .finally(() => this.cropper.destroy());
  }

  getModalController() {
    return this.application.getControllerForElementAndIdentifier(
      this.modalTarget,
      this.identifier.replace('crop', 'modal'),
    );
  }

  openModal() {
    this.getModalController().open();
  }

  closeModal() {
    this.getModalController().close();
  }
}
