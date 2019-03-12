"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./routes/index.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const port = 8080;
var server = _index.default;
if (!module.parent) server.listen(process.env.PORT || _index.default.get('port'), function () {
  console.log("Listening on port - ".concat(_index.default.get('port')));
});
var _default = server;
exports.default = _default;