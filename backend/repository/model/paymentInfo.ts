import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderInfo } from "./orderInfo";
import { ProductInfo } from "./productInfo";

@Entity("payment")
export class PaymentInfo {
    @PrimaryGeneratedColumn()
    public id: string;

    @ManyToOne(() => OrderInfo, (order) => order.payment)
    @JoinColumn({ name: "order_id" })
    public order: OrderInfo;

    @Column({ name: 'total',type: 'int', nullable: false })
    public total: number = 0;

    @Column({ name: 'status',type: 'text', nullable: false })
    public status: string;

    @Column({ name: 'created_at',type: 'timestamp with time zone', nullable: false })
    public createdAt: Date = new Date();

    @Column({ name: 'updated_at',type: 'timestamp with time zone', nullable: false })
    public updatedAt: Date = new Date();
}