"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./routes/index.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 1000;

var server = _index.default.listen(port, function () {
  console.log("Listening on port - ".concat(port));
});

var _default = server;
exports.default = _default;