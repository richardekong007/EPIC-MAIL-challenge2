"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contacts = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Contacts =
/*#__PURE__*/
function () {
  function Contacts() {
    _classCallCheck(this, Contacts);
  }

  _createClass(Contacts, [{
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
    key: "setEmail",
    value: function setEmail(email) {
      this.email = email;
    }
  }, {
    key: "getEmail",
    value: function getEmail() {
      return this.email;
    }
  }, {
    key: "setFirstName",
    value: function setFirstName(firstName) {
      this.firstName = firstName;
    }
  }, {
    key: "getFirstName",
    value: function getFirstName() {
      return this.firstName;
    }
  }, {
    key: "setLastName",
    value: function setLastName(lastName) {
      this.lastName = lastName;
    }
  }, {
    key: "getLastName",
    value: function getLastName() {
      return this.lastName;
    }
  }]);

  return Contacts;
}();

exports.Contacts = Contacts;