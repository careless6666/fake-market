import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProductInfo } from "./productInfo";

@Entity("stock")
export class StockInfo {

    @PrimaryGeneratedColumn()
    public id: bigint = BigInt(0);

    @ManyToOne(() => ProductInfo, (product) => product.id)
    @Column({ name: 'product_id', type: 'bigint', nullable: false })
    public productId: bigint = BigInt(0);

    @Column({name: 'quantity', type: 'bigint', nullable: true})
    public quantity: bigint = BigInt(0);
}