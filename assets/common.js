import $ from 'jquery';

import 'cropperjs/dist/cropper.min.css';
import 'blueimp-file-upload/js/jquery.iframe-transport';
import 'blueimp-file-upload/js/jquery.fileupload';
import 'blueimp-file-upload/css/jquery.fileupload.css';
import 'symfony-collection/jquery.collection';

export const updateMediaPath = (input, path) => {
  input.value = path;
  input.dispatchEvent(new Event('change', { 'bubbles': true }));
};

export const updatePreview = (path, dest) => {
  $.ajax({
    url: dest.getAttribute('data-icon-url'),
    data: { 'path': path },
    type: 'GET',
  }).done(res => {
    const basePath = dest.getAttribute('data-base-path');

    if (res.icon.html.indexOf('<img') !== -1 && res.icon.html.indexOf('.svg') === -1 && path.indexOf(basePath) === 0) {
      const cropableMarkup = dest.getAttribute('data-cropable-markup');
      dest.innerHTML = cropableMarkup.replace('__file_preview__', res.icon.html);

      const eventItem = new CustomEvent('ublock_collection.after_preview', { detail: { item: dest } });
      document.dispatchEvent(eventItem);
    } else {
      dest.innerHTML = res.icon.html;
    }
  }).fail(() => alert('An error occurred'));
};

export const initMediaPathChange = container => {
  container.querySelectorAll('.artgris-media-path').forEach(pathInput => {
    pathInput.addEventListener('change', () => {
      const artgrisMedia = pathInput.closest('.artgris-media');

      updatePreview(pathInput.value, artgrisMedia.querySelector('.js-artgris-img-preview'));
    });
  });
};

export const initMediaErase = container => {
  container.querySelectorAll('.js-artgris-erase').forEach(btnTrigger => {
    btnTrigger.addEventListener('click', e => {
      e.preventDefault();

      const artgrisMedia = btnTrigger.closest('.artgris-media');
      const mediaPath = artgrisMedia.querySelector('.artgris-media-path');

      updateMediaPath(mediaPath, '');

      artgrisMedia.querySelector('.js-artgris-img-preview').innerHTML = '';
    });
  });
};

export const initMediaCollection = container => {
  container.querySelectorAll('.artgris-media-collection').forEach(mediaCollection => {
    const $this = $(mediaCollection);

    $this.collection({
      container,
      fade_out: false,
      max: $this.data('max'),
      min: $this.data('min'),
      init_with_n_elements: $this.data('init-with-n-elements'),
      custom_add_location: true,
      after_add: function (collection, element) {
        const eventItem = new CustomEvent('ublock_collection.after_collection_added', { detail: { item: element[0] } });
        document.dispatchEvent(eventItem);

        return true;
      },
      before_remove: function (collection, element) {
        $(element.find('.fileupload-processed')).fileupload('destroy');

        return true;
      },
    });
  });
};

export const initCrop = (container, cropEvent) => {
  container.querySelectorAll('.js-artgris-crop-modal-trigger').forEach(btnTrigger => {
    btnTrigger.removeEventListener('click', e => cropEvent(e, btnTrigger));
    btnTrigger.addEventListener('click', e => cropEvent(e, btnTrigger));
  });
};

export const defineCropperActions = (container, cropper) => {
  const rotateRight = container.querySelector('.js-rotate-right');
  if (null !== rotateRight) {
    rotateRight.addEventListener('click', e => {
      e.preventDefault();

      cropper.rotate(90);
    });
  }

  const rotateLeft = container.querySelector('.js-rotate-left');
  if (null !== rotateLeft) {
    rotateLeft.addEventListener('click', e => {
      e.preventDefault();

      cropper.rotate(-90);
    });
  }

  const flipX = container.querySelector('.js-flip-x');
  if (null !== flipX) {
    flipX.addEventListener('click', e => {
      e.preventDefault();

      cropper.scaleX(-cropper.imageData.scaleX);
    });
  }

  const flipY = container.querySelector('.js-flip-y');
  if (null !== flipY) {
    flipY.addEventListener('click', e => {
      e.preventDefault();

      cropper.scaleY(-cropper.imageData.scaleY);
    });
  }
};

export const initFileUpload = (container, selector) => {
  container.querySelectorAll(selector).forEach(item => {
    if (item.classList.contains('fileupload-processed')) {
      return;
    }

    const $item = $(item);

    $item.fileupload({
      dataType: 'json',
      processQueue: false,
      dropZone: $item.closest('.artgris-media'),
    }).bind('fileuploaddone', function (e, data) {
      let $unusedPaths;

      $.each(data.result.files, function (index, file) {
        if (file.url) {
          let $input = null;
          const $collection = $(e.target).closest('.artgris-media-collection');

          if ($collection && data.originalFiles.length > 1) {
            $unusedPaths = $collection.find('input.artgris-media-path').filter(function () {
              return !this.value;
            });

            if ($unusedPaths.length > 0) {
              $input = $unusedPaths.first();
            }
          }

          if (null === $input) {
            $input = $(e.target).closest('.artgris-media').find('input.artgris-media-path');
          }

          // Update preview
          updateMediaPath($input[0], file.url);

          if ($collection && $collection[0]) {
            $collection[0]
              .closest('.js-artgris-collection-holder')
              .querySelector('.js-artgris-images-add')
              .click();
          }
        } else if (file.error) {
          console.error('<strong>' + file.name + '</strong> ' + file.error);

          $unusedPaths = $(e.target).closest('.artgris-media-collection').find('input.artgris-media-path').filter(function () {
            return !this.value;
          });
          $unusedPaths.closest('.artgris-media').find('.js-remove-collection').click();
        }
      });
    }).bind('fileuploadfail', function (e, data) {
      $.each(data.files, function () {
        console.error('File upload failed.');
      });
    });

    // Marks the input as processed in order to exclude it from further initializations
    item.classList.add('fileupload-processed');
  });
};

export const processCKEditor = () => {
  if ('undefined' !== typeof CKEDITOR) {
    // Auto-initialize on new block
    document.addEventListener('ublock.after_added', ({ detail: { item } }) => {
      item.querySelectorAll('.js-ckeditor').forEach(wysiwyg => {
        const destroy = new Function(wysiwyg.getAttribute('data-ckeditor-destroy'));
        const instanciate = new Function(wysiwyg.getAttribute('data-ckeditor-instanciate'));

        destroy();
        instanciate();
      });
    });

    // Prevent CKEditor crash on sort
    let ckeditorConfigs = [];

    document.addEventListener('ublock.on_sort_start', ({ detail: { panel } }) => {
      panel.querySelectorAll('.js-ckeditor').forEach(wysiwyg => {
        const id = wysiwyg.id;
        ckeditorConfigs[id] = CKEDITOR.instances[id].config;
        CKEDITOR.instances[id].destroy();
      });
    });

    document.addEventListener('ublock.on_sort_end', ({ detail: { panel } }) => {
      panel.querySelectorAll('.js-ckeditor').forEach(wysiwyg => {
        const id = wysiwyg.id;
        CKEDITOR.replace(id, ckeditorConfigs[id]);
      });
    });
  }
};
