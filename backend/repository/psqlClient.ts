import {AuthInfo} from "./model/AuthInfo";
import {UserInfo} from "./model/UserInfo";

import {Connection, createConnection} from "typeorm";

export class Db {

    public static getConnection(): Promise<Connection> {
        return createConnection({
            type: "postgres",
            host: process.env.PGUSER,
            port: (process.env.PGPORT ? process.env.PGPORT : 5432) as number,
            username: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            entities: [
                AuthInfo,
                UserInfo
            ],
            synchronize: true,
        });
    }
}
