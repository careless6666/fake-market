import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class CartInfo {

    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @Column({ name: 'user_id',type: 'bigint', nullable: false })
    public userId: BigInt = BigInt(0);

    @OneToMany((type) => CartItemsInfo, (item) => item.id)
    orderItems: CartItemsInfo[]
}

@Entity("cart_items")
export class CartItemsInfo {

    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @ManyToOne(() => CartInfo, (cart) => cart.id)
    @Column({ name: 'cart_id',type: 'bigint', nullable: false })
    public cartId: BigInt = BigInt(0);

    @Column({ name: 'product_id',type: 'bigint', nullable: false })
    public productId: BigInt = BigInt(0);

    @Column({ name: 'quantity',type: 'int', nullable: false })
    public quantity: number = 0;

    @Column({ name: 'price',type: 'int', nullable: false })
    public price: number = 0;

    @Column({ name: 'created_at',type: 'timestamp with time zone', nullable: false })
    public createdAt: Date = new Date();

    @Column({ name: 'updated_at',type: 'timestamp with time zone', nullable: false })
    public updatedAt: Date = new Date();
}