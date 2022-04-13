import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductInfo } from "./productInfo";

@Entity("stock")
export class StockInfo {

    @PrimaryGeneratedColumn()
    public id: string;

    @ManyToOne(() => ProductInfo, (product) => product.stock)
    @JoinColumn({ name: "product_id" })
    public product: ProductInfo;

    @Column({name: 'quantity', type: 'bigint', nullable: true})
    public quantity: string;
}