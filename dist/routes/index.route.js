"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _api = _interopRequireDefault(require("../api/api.v1"));

var _api2 = _interopRequireDefault(require("../api/api.v2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = 8080;
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use('/v1', _api.default);
app.use('/v2', _api2.default);
app.use('/', _api2.default);
app.set('port', port);
var _default = app;
exports.default = _default;