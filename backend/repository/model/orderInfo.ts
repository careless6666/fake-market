import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { ProductInfo } from "./productInfo";

@Entity("order")
export class OrderInfo {

    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @Column({ type: 'bigint', nullable: false })
    public userId: BigInt = BigInt(0);

    @Column({ type: 'text', nullable: false })
    public address: string = '';

    @Column({ name: 'created_at',type: 'timestamp with time zone', nullable: false })
    public createdAt: Date = new Date();

    @Column({ name: 'updated_at',type: 'timestamp with time zone', nullable: false })
    public updatedAt: Date = new Date();

    @OneToMany((type) => ProductInfo, (product) => product.id)
    orderItems: ProductInfo[]
}

@Entity("order_item")
export class OrderItemInfo {
    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @ManyToOne(() => OrderInfo, (order) => order.id)
    @Column({ name: 'order_id', type: 'bigint', nullable: false })
    public orderId: BigInt = BigInt(0);

    @Column({ name: 'product_id',type: 'bigint', nullable: false })
    public productId: BigInt = BigInt(0);

    @Column({ name: 'quantity',type: 'int', nullable: false })
    public quantity: number = 0;

    @Column({ name: 'price',type: 'int', nullable: false })
    public price: number = 0;
}
