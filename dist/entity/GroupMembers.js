"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupMembers = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GroupMembers =
/*#__PURE__*/
function () {
  function GroupMembers() {
    _classCallCheck(this, GroupMembers);
  }

  _createClass(GroupMembers, [{
    key: "setGroupId",
    value: function setGroupId(groupId) {
      this.groupId = groupId;
    }
  }, {
    key: "getGroupId",
    value: function getGroupId() {
      return this.groupId;
    }
  }, {
    key: "setMemberId",
    value: function setMemberId(memberId) {
      this.memberId = memberId;
    }
  }, {
    key: "getMemberId",
    value: function getMemberId() {
      return memberId;
    }
  }]);

  return GroupMembers;
}();

exports.GroupMembers = GroupMembers;