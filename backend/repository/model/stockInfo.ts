import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductInfo } from "./productInfo";

@Entity("stock")
export class StockInfo {

    @PrimaryGeneratedColumn()
    public id: bigint = BigInt(0);

    @ManyToOne(() => ProductInfo, (product) => product.stock)
    @JoinColumn({ name: "product_id" })
    public product: ProductInfo;

    @Column({name: 'quantity', type: 'bigint', nullable: true})
    public quantity: bigint = BigInt(0);
}