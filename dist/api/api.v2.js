"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _api = _interopRequireDefault(require("./api.v1"));

var _auth = require("../middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appV2 = _express.default.Router();

var controller = require('../controllers/index.controller'); //const authorize = require('../middleware/auth');


appV2.post('/auth/signup', controller.signup);
appV2.post('/auth/login', controller.login);
appV2.post('/messages', _auth.authorize, controller.createEmail);
appV2.get('/messages/:id', _auth.authorize, controller.getEmail);
appV2.get('/messages', _auth.authorize, controller.getEmails);
appV2.get('/messages/sent', _auth.authorize, controller.getSentEmails);
appV2.get('/messages/unread', _auth.authorize, controller.getUnreadEmails);
appV2.delete('/messages/:id', _auth.authorize, controller.deleteEmail);
var _default = _api.default;
exports.default = _default;