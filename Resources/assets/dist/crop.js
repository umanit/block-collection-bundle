"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stimulus = require("stimulus");

var _stimulusUse = require("stimulus-use");

var _cropperjs = _interopRequireDefault(require("cropperjs"));

var _tools = require("@umanit/tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      (0, _stimulusUse.useDispatch)(this);
      (0, _stimulusUse.useIntersection)(this);
    }
  }, {
    key: "appear",
    value: function appear() {
      var src = this.getMediaController().getPreviewSrc();
      var x = this.xTarget;
      var y = this.yTarget;
      var width = this.widthTarget;
      var height = this.heightTarget;
      var save = this.saveTarget;
      this.containerTarget.innerHTML = "<img src=\"".concat(src, "\" alt=\"\" style=\"max-width: 100%;\" />");
      var addedImg = this.containerTarget.lastElementChild;
      this.cropper = new _cropperjs["default"](addedImg, {
        aspectRatio: this.ratioValue ? this.ratioValue : 'free',
        zoomable: true,
        viewMode: 1,
        crop: function crop(event) {
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
        }
      });
    }
  }, {
    key: "disappear",
    value: function disappear() {
      if (this.cropper) {
        this.cropper.destroy();
      }
    }
  }, {
    key: "rotateRight",
    value: function rotateRight(e) {
      e.preventDefault();

      if (!this.cropper) {
        return;
      }

      this.cropper.rotate(90);
    }
  }, {
    key: "rotateLeft",
    value: function rotateLeft(e) {
      e.preventDefault();

      if (!this.cropper) {
        return;
      }

      this.cropper.rotate(-90);
    }
  }, {
    key: "flipX",
    value: function flipX(e) {
      e.preventDefault();

      if (!this.cropper) {
        return;
      }

      this.cropper.scaleX(-this.cropper.imageData.scaleX);
    }
  }, {
    key: "flipY",
    value: function flipY(e) {
      e.preventDefault();

      if (!this.cropper) {
        return;
      }

      this.cropper.scaleY(-this.cropper.imageData.scaleY);
    }
  }, {
    key: "apply",
    value: function apply(e) {
      var _this = this;

      e.preventDefault();

      if (!this.cropper) {
        return;
      }

      var data = this.cropper.getData();
      (0, _tools.ajax)(this.urlValue, {
        method: 'post',
        json: {
          conf: this.confValue,
          src: this.getMediaController().getPreviewSrc(),
          x: Math.round(data.x),
          y: Math.round(data.y),
          width: Math.round(data.width),
          height: Math.round(data.height),
          scaleX: data.scaleX,
          scaleY: data.scaleY,
          rotate: data.rotate,
          checkCrossOrigin: false
        }
      }).then(function (_ref) {
        var path = _ref.json;

        _this.getMediaController().setPath(path);

        _this.dispatch('media-cropped');
      })["catch"](function (err) {
        return alert(err);
      })["finally"](function () {
        return _this.cropper.destroy();
      });
    }
  }, {
    key: "getMediaController",
    value: function getMediaController() {
      return this.application.getControllerForElementAndIdentifier(document.getElementById(this.mediaControllerIdValue), this.identifier.replace('crop', 'media'));
    }
  }]);

  return _default;
}(_stimulus.Controller);

exports["default"] = _default;

_defineProperty(_default, "targets", ['container', 'x', 'y', 'width', 'height', 'save']);

_defineProperty(_default, "values", {
  ratio: Number,
  url: String,
  conf: String,
  mediaControllerId: String
});