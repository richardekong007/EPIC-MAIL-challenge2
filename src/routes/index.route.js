import express from 'express';
import bodyParser from "body-parser";


const app = express();
const controller = require('../controllers/index.controller');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/auth/signup', controller.signup);

//app.post('/auth/login', controller.login);

export default app;



