"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stimulus = require("stimulus");

var _tools = require("@umanit/tools");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* stimulusFetch: 'lazy' */
var _default = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);

  var _super = _createSuper(_default);

  function _default() {
    _classCallCheck(this, _default);

    return _super.apply(this, arguments);
  }

  _createClass(_default, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      this.iframeTarget.addEventListener('load', function () {
        _this.iframeTarget.contentWindow.document.body.querySelectorAll('.select').forEach(function (row) {
          row.addEventListener('click', function () {
            _this.filePathValue = row.dataset.path;

            _this.closeModal();

            _this.updatePreview();
          });
        });
      });
    }
  }, {
    key: "fileManager",
    value: function fileManager(e) {
      e.preventDefault();
      this.openModal();

      if ('' === this.iframeTarget.src) {
        this.iframeTarget.src = this.iframeTarget.dataset.src;
      }
    }
  }, {
    key: "updatePreview",
    value: function updatePreview() {
      var path = this.filePathValue;
      var preview = this.previewTarget;

      if ('' === path) {
        preview.innerHTML = '';
        return;
      }

      var basePath = this.basePathValue;
      (0, _tools.ajax)(this.iconUrlValue, {
        query: {
          path: path
        }
      }).then(function (_ref) {
        var iconHtml = _ref.json.icon.html;

        if (iconHtml.indexOf('<img') !== -1 && iconHtml.indexOf('.svg') === -1 && path.indexOf(basePath) === 0) {
          var cropableMarkup = preview.dataset.cropableMarkup;
          preview.innerHTML = cropableMarkup.replace('__file_preview__', iconHtml);
        } else {
          preview.innerHTML = iconHtml;
        }
      })["catch"](function () {
        return alert('An error occured');
      });
    }
  }, {
    key: "erase",
    value: function erase(e) {
      e.preventDefault();
      this.filePathValue = '';
      this.updatePreview();
    }
  }, {
    key: "updateFromCrop",
    value: function updateFromCrop(e) {
      this.filePathValue = e.detail.path;
      this.updatePreview();
    }
  }, {
    key: "upload",
    value: function upload(e) {
      var _this2 = this;

      var form = new FormData();
      form.append('files', e.currentTarget.files[0]);
      (0, _tools.ajax)(this.uploadUrlValue, {
        method: 'post',
        body: form
      }).then(function (_ref2) {
        var files = _ref2.json.files;
        _this2.filePathValue = files[0].url;

        _this2.updatePreview();
      })["catch"](function (err) {
        return console.error(err);
      });
    }
  }, {
    key: "filePathValueChanged",
    value: function filePathValueChanged() {
      this.inputTarget.value = this.filePathValue;
    }
  }, {
    key: "getModalController",
    value: function getModalController() {
      return this.application.getControllerForElementAndIdentifier(this.modalTarget, this.identifier.replace('media', 'modal'));
    }
  }, {
    key: "openModal",
    value: function openModal() {
      this.getModalController().open();
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.getModalController().close();
    }
  }]);

  return _default;
}(_stimulus.Controller);

exports["default"] = _default;

_defineProperty(_default, "targets", ['modal', 'iframe', 'input', 'preview']);

_defineProperty(_default, "values", {
  filePath: String,
  uploadUrl: String,
  basePath: String,
  cropableMarkup: String,
  iconUrl: String
});