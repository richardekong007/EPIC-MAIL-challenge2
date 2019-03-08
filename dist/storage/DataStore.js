"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataSore =
/*#__PURE__*/
function () {
  function DataSore() {
    _classCallCheck(this, DataSore);

    this.store = [];
  }

  _createClass(DataSore, [{
    key: "exists",
    value: function exists(id, newRecord) {
      var exists = false;
      var oldRecord = this.read(id);

      if (oldRecord) {
        var oldRecordValues = Object.values(oldRecord);
        var newRecordValues = Object.values(newRecord);

        if (oldRecordValues.length === newRecordValues.length) {
          oldRecordValues.forEach(function (item, index) {
            if (item === newRecordValues[index]) {
              exists = true;
            }
          });
        }
      }

      console.log(exists);
      return exists;
    }
  }, {
    key: "save",
    value: function save(id, object) {
      if (!this.exists(id, object)) {
        this.store.push({
          'data': object
        });
      }
    }
  }, {
    key: "read",
    value: function read(id) {
      var data = null;
      this.store.forEach(function (entry) {
        if (id === entry.data.id) data = entry.data;
      });
      return data;
    }
  }, {
    key: "readAll",
    value: function readAll() {
      var data = [];

      if (this.store.length > 0) {
        this.store.forEach(function (record) {
          data.push(record.data);
        });
      }

      return data;
    }
  }, {
    key: "findByField",
    value: function findByField(field, value) {
      var _this = this;

      //determine if the field exist in the store
      var found = false;

      if (this.store.length > 0) {
        var keys = Object.keys(this.store[0]);
        keys.forEach(function (key) {
          if (field === key) {
            _this.store.forEach(function (record) {
              found = record[field] === value;
            });
          }
        });
      }

      return found;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.dataStore) {
        this.dataStore = new DataSore();
      }

      return this.dataStore;
    }
  }]);

  return DataSore;
}();

exports.default = DataSore;

_defineProperty(DataSore, "dataStore", null);