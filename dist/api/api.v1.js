"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appV1 = _express.default.Router();

var controller = require('../controllers/index.controller');

appV1.post('/auth/signup', controller.signup);
appV1.post('/auth/login', controller.login);
appV1.post('/messages', _auth.authorize, controller.createEmail);
appV1.get('/messages/:id', _auth.authorize, controller.getEmail);
appV1.get('/messages', _auth.authorize, controller.getEmails);
appV1.get('/messages/sent', _auth.authorize, controller.getSentEmails);
appV1.get('/messages/unread', _auth.authorize, controller.getUnreadEmails);
appV1.delete('/messages/:id', _auth.authorize, controller.deleteEmail);
var _default = appV1;
exports.default = _default;