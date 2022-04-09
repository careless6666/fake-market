import express from 'express';
import Router from "./routes";
import swaggerUI = require('swagger-ui-express')
import morgan from "morgan";
import cors from 'cors';
import * as core from "express-serve-static-core";
const dotenv = require('dotenv');
import { logErrors } from "./middleware/logErrors";

dotenv.config({path: './backend/.env'});

const app = express();
const port = 3001;

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json());
app.use(logErrors)

AddCors(app);

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});



const { PORT, ISSUER = `http://localhost:${PORT}` } = process.env;



app.use(
    "/swagger",
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

function AddCors(app: core.Express) {
    const corsOpts = {
        origin: '*',

        methods: [
            'GET',
            'POST',
        ],

        allowedHeaders: [
            'Content-Type',
        ],
    };

    app.use(cors(corsOpts));
}