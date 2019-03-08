import app from './routes/index.route';

const port = 1000;
const server = app.listen(process.env.PORT || port,()=>{
    console.log(`Listening on port - ${port}`);
});

export default server;

