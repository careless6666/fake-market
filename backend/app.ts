import express from 'express';
import Router from "./routes";
import swaggerUI = require('swagger-ui-express')
import morgan from "morgan";


const app = express();
const port = 3001;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});



app.use(morgan("tiny"));

app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.use(Router);

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});