import "reflect-metadata";
import {UserInfo} from "./model/UserInfo";
import { DataSource, DataSourceOptions } from "typeorm";
import { CategoryInfo } from "./model/categoryInfo";
import { CartInfo, CartItemsInfo } from "./model/cartInfo";
import { OrderInfo, OrderItemInfo } from "./model/orderInfo";
import { PaymentInfo } from "./model/paymentInfo";
import { ProductInfo } from "./model/productInfo";
import { StockInfo } from "./model/stockInfo";

let _dataSource: DataSource | undefined = undefined;

const getDataSource = (): DataSource => {

    const options: DataSourceOptions = {
        name: "postgres",
        type: "postgres",
        host: 'localhost',
        port: 1586,
        username: 'postgres',
        password: 'mysecretpassword',
        database: 'fakeDb',
        migrationsRun: false,
        logging: true,
        synchronize: false,
        entities: [UserInfo, CategoryInfo, CartInfo, CartItemsInfo, CategoryInfo, OrderInfo, OrderItemInfo, PaymentInfo, ProductInfo, StockInfo],
    }

    if(!_dataSource){
        _dataSource = new DataSource(options)
    }

    return _dataSource;
}

/*
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
        entities: [UserInfo, CategoryInfo, CartInfo, CartItemsInfo, CategoryInfo, OrderInfo, OrderItemInfo, PaymentInfo, ProductInfo, StockInfo],
        migrations: [*/
     //       "repository/migrations/**/*.ts"
     /*   ]
    }

    if(!_dataSource){
        _dataSource = new DataSource(options)
    }

    return _dataSource;
}
*/

export const dataSourceLazy = getDataSource

//export const dataSource = getDataSourceMigration()