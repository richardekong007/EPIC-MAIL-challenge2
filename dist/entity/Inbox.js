"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inbox = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Inbox =
/*#__PURE__*/
function () {
  function Inbox() {
    _classCallCheck(this, Inbox);
  }

  _createClass(Inbox, [{
    key: "setReceiverId",
    value: function setReceiverId(receiverId) {
      this.receiverId = receiverId;
    }
  }, {
    key: "getReceiverId",
    value: function getReceiverId() {
      return receiverId;
    }
  }, {
    key: "setMessageId",
    value: function setMessageId(messageId) {
      this.messageId = messageId;
    }
  }, {
    key: "getMessageId",
    value: function getMessageId() {
      return this.messageId;
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
  }]);

  return Inbox;
}();

exports.Inbox = Inbox;