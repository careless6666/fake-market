import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { PaymentInfo } from "./paymentInfo";
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

    @OneToMany(() => OrderItemInfo, (order) => order.order)
    orderItems: OrderItemInfo[]

    @OneToMany(()=> PaymentInfo, (payment) => payment.order)
    payment: PaymentInfo[]
}

@Entity("order_item")
export class OrderItemInfo {
    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @ManyToOne(() => OrderInfo, (order) => order.orderItems)
    @JoinColumn({ name: "order_id" })
    public order: OrderInfo;

    @Column({ name: 'product_id',type: 'bigint', nullable: false })
    public productId: BigInt = BigInt(0);

    @Column({ name: 'quantity',type: 'int', nullable: false })
    public quantity: number = 0;

    @Column({ name: 'price',type: 'int', nullable: false })
    public price: number = 0;
}
