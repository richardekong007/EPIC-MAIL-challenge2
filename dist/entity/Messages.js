"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messages = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Messages =
/*#__PURE__*/
function () {
  function Messages() {
    _classCallCheck(this, Messages);
  }

  _createClass(Messages, [{
    key: "setId",
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "setCreatedOn",
    value: function setCreatedOn(createdOn) {
      this.createdOn = createdOn;
    }
  }, {
    key: "getCreatedOn",
    value: function getCreatedOn() {
      return this.createdOn;
    }
  }, {
    key: "setSubject",
    value: function setSubject(subject) {
      this.subject = subject;
    }
  }, {
    key: "getSubject",
    value: function getSubject() {
      return this.subject;
    }
  }, {
    key: "setMessage",
    value: function setMessage(message) {
      this.message = message;
    }
  }, {
    key: "getMessage",
    value: function getMessage() {
      return this.message;
    }
  }, {
    key: "setParentMessageId",
    value: function setParentMessageId(parentMessageId) {
      this.parentMessageId = parentMessageId;
    }
  }, {
    key: "getParentMessageId",
    value: function getParentMessageId() {
      return this.parentMessageId;
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      this.status = status;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }]);

  return Messages;
}();

exports.Messages = Messages;