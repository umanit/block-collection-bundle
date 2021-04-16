import { Controller } from 'stimulus';
import { ajax } from '@umanit/tools';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
  static targets = ['modal', 'iframe', 'input', 'preview'];
  static values = {
    filePath: String,
  };

  connect() {
    this.iframeTarget.addEventListener('load', () => {
      this.iframeTarget.contentWindow.document.body.querySelectorAll('.select').forEach(row => {
        row.addEventListener('click', () => {
          this.filePathValue = row.dataset.path;

          this.closeModal();
          this.updatePreview();
        });
      });
    });
  }

  fileManager(e) {
    e.preventDefault();

    this.openModal();

    if ('' === this.iframeTarget.src) {
      this.iframeTarget.src = this.iframeTarget.dataset.src;
    }
  }

  updatePreview() {
    const path = this.filePathValue;
    const preview = this.previewTarget;

    if ('' === path) {
      preview.innerHTML = '';

      return;
    }

    ajax(preview.dataset.iconUrl, {
      query: { path },
    }).then(({ json: { icon: { html: iconHtml } } }) => {
      const basePath = preview.dataset.basePath;

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

  updateFromCrop(e) {
    this.filePathValue = e.detail.path;
    this.updatePreview();
  }

  filePathValueChanged() {
    this.inputTarget.value = this.filePathValue;
  }

  getModalController() {
    return this.application.getControllerForElementAndIdentifier(
      this.modalTarget,
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
