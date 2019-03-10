import express from 'express';
import bodyParser from "body-parser";
import appV1 from '../api/api.v1';

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(appV1);
app.set('port',port);

export default app;



