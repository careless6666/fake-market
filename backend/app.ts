import express from 'express';
import Router from "./routes";
import swaggerUI = require('swagger-ui-express')
import morgan from "morgan";
import cors from 'cors';
import * as core from "express-serve-static-core";
import Provider, {AdapterConstructor} from "oidc-provider"
import configuration from "./auth/authConfiguration";
import AuthPostgresAdapter from "./auth/authPostgresAdapter";
const dotenv = require('dotenv');
const { Client } = require('pg')

dotenv.config();

const app = express();
const port = 3001;

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json());

AddCors(app);

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

const { PORT = 3000, ISSUER = `http://localhost:${PORT}` } = process.env;

(async () => {
    let adapter;
    const client = new Client(
        {
            host: process.env.PGHOST,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
        }
    )
    await client.connect()
    if (process.env.MONGODB_URI) {
        adapter = require("./adapters/mongodb"); // eslint-disable-line global-require
        await adapter.connect();
    }

    adapter = new AuthPostgresAdapter("psql") as unknown as AdapterConstructor;

    const provider = new Provider.Provider(ISSUER, { adapter, ...configuration });

    app.use(provider.callback());
})()

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