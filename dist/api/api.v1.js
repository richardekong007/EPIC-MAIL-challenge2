"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appV1 = _express.default.Router();

var controller = require('../controllers/index.controller');

var authorize = require('../middleware/auth');

appV1.post('/auth/signup', controller.signup);
appV1.post('/auth/login', controller.login);
appV1.post('/messages', authorize, controller.createEmail);
appV1.get('/messages/:id', authorize, controller.getEmail);
appV1.get('/messages', authorize, controller.getEmails);
appV1.get('/messages/:sent', authorize, controller.getSentEmails);
appV1.get('/messages/:unread', authorize, controller.getUnreadEmails);
appV1.delete('/messages/:id', authorize, controller.deleteEmail);
var _default = appV1;
exports.default = _default;