import express from 'express';
import bodyParser from "body-parser";

const app = express();
const controller = require('../controllers/index.controller');
const authorize = require('../middleware/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/auth/signup', controller.signup);

app.post('/auth/login', controller.login);

app.post('/messages', authorize,controller.createEmail);

app.get('/messages/:id', authorize, controller.getEmail);

app.get('/messages', authorize,controller.getEmails);

export default app;



