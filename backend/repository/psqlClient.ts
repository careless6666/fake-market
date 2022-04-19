import "reflect-metadata";
import { UserInfo } from "./model/UserInfo";
import { DataSource, DataSourceOptions } from "typeorm";
import { CategoryInfo } from "./model/categoryInfo";
import { CartInfo, CartItemsInfo } from "./model/cartInfo";
import { OrderInfo, OrderItemInfo } from "./model/orderInfo";
import { PaymentInfo } from "./model/paymentInfo";
import { ProductInfo } from "./model/productInfo";
import { StockInfo } from "./model/stockInfo";

export const AppDataSource = new DataSource({
  name: "postgres",
  type: "postgres",
  host: "localhost",
  port: 1586,
  username: "postgres",
  password: "mysecretpassword",
  database: "fakeDb",
  migrationsRun: false,
  logging: true,
  synchronize: false,
  entities: [
    UserInfo,
    CategoryInfo,
    CartInfo,
    CartItemsInfo,
    CategoryInfo,
    OrderInfo,
    OrderItemInfo,
    PaymentInfo,
    ProductInfo,
    StockInfo,
  ],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
