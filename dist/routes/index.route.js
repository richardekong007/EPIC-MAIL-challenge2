"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();

var controller = require('../controllers/index.controller');

var auth = require('src/middleware/auth');

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.post('/auth/signup', controller.signup);
app.post('/auth/login', controller.login);
app.post('/messages', auth.authorize, controller.sendMessage);
var _default = app;
exports.default = _default;