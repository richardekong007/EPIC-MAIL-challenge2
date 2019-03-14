import express from 'express';

const appV1 = express.Router();
const controller = require('../controllers/index.controller');
const authorize = require('../middleware/auth');

appV1.post('/auth/signup', controller.signup);

appV1.post('/auth/login', controller.login);

appV1.post('/messages', authorize, controller.createEmail);

appV1.get('/messages/:id',authorize, controller.getEmail);

appV1.get('/messages', authorize, controller.getEmails);

appV1.get('/messages/:sent', authorize, controller.getSentEmails);

appV1.get('/messages/:unread', authorize, controller.getUnreadEmails);

appV1.delete('/messages/:id', authorize, controller.deleteEmail);


export default appV1;

