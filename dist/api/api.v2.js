"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _api = _interopRequireDefault(require("./api.v1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appV2 = _express.default.Router();

var controller = require('../controllers/index.controller');

var authorize = require('../middleware/auth');

appV2.post('/auth/signup', controller.signup);
appV2.post('/auth/login', controller.login);
appV2.post('/messages', authorize, controller.createEmail);
appV2.get('/messages/:id', authorize, controller.getEmail);
appV2.get('/messages', authorize, controller.getEmails);
appV2.get('/messages/:sent', authorize, controller.getSentEmails);
appV2.get('/messages/:unread', authorize, controller.getUnreadEmails);
appV2.delete('/messages/:id', authorize, controller.deleteEmail);
var _default = _api.default;
exports.default = _default;