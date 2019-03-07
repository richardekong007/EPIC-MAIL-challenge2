import app from './routes/index.route';

const port = 1000;

app.listen(port, ()=>{
    console.log(`Listening on port - ${port}`);
});

export default app;

