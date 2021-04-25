import { Controller } from 'stimulus';
import { ajax } from '@umanit/tools';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
  static targets = ['modal', 'iframe', 'input', 'preview'];
  static values = {
    filePath: String,
    uploadUrl: String,
    basePath: String,
    cropableMarkup: String,
    iconUrl: String,
    modalId: String,
  };

  callFileManager(e) {
    e.preventDefault();

    this.openModal();
  }

  updatePreview() {
    const path = this.filePathValue;
    const preview = this.previewTarget;

    if ('' === path) {
      preview.innerHTML = '';

      return;
    }

    const basePath = this.basePathValue;

    ajax(this.iconUrlValue, {
      query: { path },
    }).then(({ json: { icon: { html: iconHtml } } }) => {
      if (iconHtml.indexOf('<img') !== -1 && iconHtml.indexOf('.svg') === -1 && path.indexOf(basePath) === 0) {
        const cropableMarkup = preview.dataset.cropableMarkup;
        preview.innerHTML = cropableMarkup.replace('__file_preview__', iconHtml);
      } else {
        preview.innerHTML = iconHtml;
      }
    }).catch(() => alert('An error occured'));
  }

  erase(e) {
    e.preventDefault();

    this.filePathValue = '';
    this.updatePreview();
  }

  setPath(path) {
    this.filePathValue = path;
    this.updatePreview();
  }

  updateFromCrop(e) {
    this.setPath(e.detail.path);
  }

  upload(e) {
    const form = new FormData();
    form.append('files', e.currentTarget.files[0]);

    ajax(this.uploadUrlValue, {
      method: 'post',
      body: form,
    }).then(({ json: { files } }) => {
      this.filePathValue = files[0].url;
      this.updatePreview();
    }).catch(err => alert(err));
  }

  filePathValueChanged() {
    this.inputTarget.value = this.filePathValue;
  }

  getModalController() {
    return this.application.getControllerForElementAndIdentifier(
      document.getElementById(this.modalIdValue),
      this.identifier.replace('media', 'modal'),
    );
  }

  openModal() {
    this.getModalController().open();
  }

  closeModal() {
    this.getModalController().close();
  }
}
