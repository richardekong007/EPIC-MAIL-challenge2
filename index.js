import bodyParser from 'body-parser';
//import route here

const express = require('express');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
const port = 1000;

app.listen(port, ()=>{
    console.log(`Listening on port - ${port}`);
});

