import {
  defineCropperActions,
  initCrop,
  initFileUpload,
  initMediaCollection,
  initMediaErase,
  initMediaPathChange,
  processCKEditor,
  updateMediaPath,
} from '../../common';

import $ from 'jquery';
import Cropper from 'cropperjs';

$.fn.transition = require('semantic-ui-transition');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.modal = require('semantic-ui-modal');

const cropEvent = (e, btnTrigger) => {
  e.preventDefault();

  const modalId = btnTrigger.getAttribute('data-target');
  const modal = document.querySelector(modalId);
  const artgrisMedia = btnTrigger.closest('.artgris-media');
  const imgPreview = artgrisMedia.querySelector('.js-artgris-img-preview');
  const mediaPath = artgrisMedia.querySelector('.artgris-media-path');
  const src = imgPreview.querySelector('img').getAttribute('src');
  const conf = imgPreview.getAttribute('data-conf');
  const cropContainer = modal.querySelector('.modal-crop-container');
  const ratio = modal.getAttribute('data-ratio');
  const $x = modal.querySelector('.js-x');
  const $y = modal.querySelector('.js-y');
  const $width = modal.querySelector('.js-width');
  const $height = modal.querySelector('.js-height');
  const jsSave = modal.querySelector('.js-save');
  let cropper;

  const saveCropEvent = e => {
    e.preventDefault();

    if (!cropper) {
      return;
    }

    const data = cropper.getData();
    $.ajax({
      url: imgPreview.getAttribute('data-crop-url'),
      type: 'post',
      data: {
        conf,
        src,
        x: Math.round(data.x),
        y: Math.round(data.y),
        width: Math.round(data.width),
        height: Math.round(data.height),
        scaleX: data.scaleX,
        scaleY: data.scaleY,
        rotate: data.rotate,
        checkCrossOrigin: false,
      },
    }).done(res => {
      updateMediaPath(mediaPath, res);

      $(modalId).modal('hide');
    }).fail(res => {
      console.error(res);
    }).always(() => cropper.destroy());
  };

  $(modalId)
    .modal({
      closable: false,
      onShow: () => {
        cropContainer.innerHTML = `<img src="${src}" alt="" style="max-width: 100%;" />`;
        const addedImg = cropContainer.lastElementChild;

        cropper = new Cropper(addedImg, {
          aspectRatio: ratio ? ratio : 'free',
          zoomable: true,
          viewMode: 1,
          crop(event) {
            $x.textContent = Math.round(event.detail.x);
            $y.textContent = Math.round(event.detail.y);
            $width.textContent = Math.round(event.detail.width);
            $height.textContent = Math.round(event.detail.height);

            if (event.detail.width <= 4 || event.detail.height <= 4) {
              jsSave.classList.add('disabled');
            } else {
              jsSave.classList.remove('disabled');
            }
          },
        });

        defineCropperActions(modal, cropper);

        jsSave.addEventListener('click', saveCropEvent);
      },
      onHidden: () => jsSave.removeEventListener('click', saveCropEvent),
    })
    .modal('show');
};

export const initScripts = container => {
  // Display a preview of the selected media
  initMediaPathChange(container);

  // Clear the selected media
  initMediaErase(container);

  // Show the modal to choose a media
  container.querySelectorAll('.js-artgris-modal-trigger').forEach(btnTrigger => {
    btnTrigger.addEventListener('click', e => {
      e.preventDefault();

      const modalId = btnTrigger.getAttribute('data-target');
      const modal = document.querySelector(modalId);
      const artgrisMedia = btnTrigger.closest('.artgris-media');
      const mediaPath = artgrisMedia.querySelector('.artgris-media-path');
      const iframe = modal.querySelector('.iframe');

      if ('' === iframe.src) {
        iframe.src = iframe.getAttribute('data-src');
      }

      $(modalId)
        .modal({
          onShow: () => {
            const $iframe = $(iframe);

            $iframe.on('load', function () {
              applyIFrameEvents($(this));
            });

            applyIFrameEvents($iframe);

            function applyIFrameEvents($iframe) {
              $iframe.contents().off('click', '.select');
              $iframe.contents().on('click', '.select', e => {
                updateMediaPath(mediaPath, e.target.getAttribute('data-path'));

                $(modalId).modal('hide');
              });
            }
          },
        })
        .modal('show');
    });
  });

  // Show the modal to crop a media
  initCrop(container, cropEvent);

  initMediaCollection(container);

  initFileUpload(container, '.fileupload');
};

window.addEventListener('load', () => {
  initScripts(document);

  document.addEventListener('ublock.after_added', ({ detail: { item } }) => {
    initScripts(item);
  });

  document.addEventListener('ublock_collection.after_collection_added', ({ detail: { item } }) => {
    initScripts(item);
  });

  document.addEventListener('ublock_collection.after_preview', ({ detail: { item } }) => {
    initCrop(item, cropEvent);
  });

  // Specific treatment for CKEditor
  processCKEditor();
});
