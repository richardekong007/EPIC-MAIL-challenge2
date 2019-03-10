import express from 'express';
import bodyParser from "body-parser";
import appV1 from '../api/api.v1';
import appV2 from '../api/api.v2';

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/v1',appV1);
app.use('/v2',appV2);
app.use('/',appV2);

app.set('port',port);

export default app;



