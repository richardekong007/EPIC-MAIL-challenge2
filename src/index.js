import app from './routes/index.route';

//const port = 8080;
const server = app;

if (!module.parent)
    server.listen(process.env.PORT || app.get('port'),()=>{
    console.log(`Listening on port - ${app.get('port')}`);
});

export default server;

