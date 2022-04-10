import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderInfo } from "./orderInfo";
import { ProductInfo } from "./productInfo";

@Entity("payment")
export class PaymentInfo {
    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @ManyToOne(() => OrderInfo, (order) => order.id)
    @Column({ name: 'order_id', type: 'bigint', nullable: false })
    public orderId: BigInt = BigInt(0);

    @Column({ name: 'total',type: 'int', nullable: false })
    public total: number = 0;

    @Column({ name: 'created_at',type: 'timestamp with time zone', nullable: false })
    public createdAt: Date = new Date();

    @Column({ name: 'updated_at',type: 'timestamp with time zone', nullable: false })
    public updatedAt: Date = new Date();
}