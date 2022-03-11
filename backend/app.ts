import express from 'express';
import {Router} from "./router";

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

Router.Init(app);

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});