import express from 'express';
import appV1 from "./api.v1";

const appV2 = express.Router();
const controller = require('../controllers/index.controller');
const authorize = require('../middleware/auth');

appV2.post('/auth/signup', controller.signup);

appV2.post('/auth/login', controller.login);

appV2.post('/messages', authorize, controller.createEmail);

appV2.get('/messages/:id', authorize, controller.getEmail);

appV2.get('/messages', authorize, controller.getEmails);

appV2.get('/messages/:sent', authorize, controller.getSentEmails);

appV2.get('/messages/:unread', authorize, controller.getUnreadEmails);

appV2.delete('/messages/:id', authorize, controller.deleteEmail);

export default appV1;