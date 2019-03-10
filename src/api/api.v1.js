import express from 'express';


const appV1 = express();
const controller = require('../controllers/index.controller');


appV1.post('/v1/auth/signup', controller.signup);

appV1.post('/v1/auth/login', controller.login);

appV1.post('/v1/messages', controller.createEmail);

appV1.get('/v1/messages/:id', controller.getEmail);

appV1.get('/v1/messages', controller.getEmails);

appV1.delete('/v1/messages/:id', controller.deleteEmail);

export default appV1;

