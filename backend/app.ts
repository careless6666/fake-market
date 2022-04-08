import express from 'express';
import Router from "./routes";
import swaggerUI = require('swagger-ui-express')
import morgan from "morgan";
import cors from 'cors';
import * as core from "express-serve-static-core";
//const dotenv = require('dotenv');

//dotenv.config();

const app = express();
const port = 3001;

//app.use(morgan("tiny"));
//app.use(express.static("public"));
//app.use(express.json());

//AddCors(app);

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

/*

const { PORT, ISSUER = `http://localhost:${PORT}` } = process.env;



app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.use(Router);*/

console.log("new2")

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