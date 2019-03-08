import express from 'express';
import bodyParser from "body-parser";

const app = express();
const controller = require('../controllers/index.controller');
const auth = require('../middleware/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/auth/signup', controller.signup);

app.post('/auth/login', controller.login);

app.post('/messages', auth,controller.sendMessage);

export default app;



