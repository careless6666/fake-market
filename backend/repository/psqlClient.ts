import "reflect-metadata";
import {UserInfo} from "./model/UserInfo";
import { DataSource, DataSourceOptions } from "typeorm";

let _dataSource: DataSource | undefined = undefined;

const getDataSource = (): DataSource => {

    const options: DataSourceOptions = {
        name: "postgres",
        type: "postgres",
        host: process.env.PGHOST,
        port: (process.env.PGPORT ? process.env.PGPORT : 5432) as number,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        migrationsRun: false,
        logging: true,
        synchronize: true,
        entities: [UserInfo],
    }

    if(!_dataSource){
        _dataSource = new DataSource(options)
    }

    return _dataSource;
}

const getDataSourceMigration = (): DataSource => {

    const options: DataSourceOptions = {
        name: "postgres",
        type: "postgres",
        host: "localhost",
        port: 1586,
        username: "postgres",
        password: "mysecretpassword",
        database: "fakeDb",
        logging: true,
        synchronize: true,
        entities: [UserInfo],
    }

    if(!_dataSource){
        _dataSource = new DataSource(options)
    }

    return _dataSource;
}

export const dataSourceLazy = getDataSource

export const dataSource = getDataSourceMigration()