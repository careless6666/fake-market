import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class CartInfo {

    @PrimaryGeneratedColumn()
    public id: string;

    @Column({ name: 'user_id',type: 'bigint', nullable: false })
    public userId: string;

    @OneToMany(() => CartItemsInfo, (item) => item.id)
    cartItems: CartItemsInfo[]
}

@Entity("cart_items")
export class CartItemsInfo {

    @PrimaryGeneratedColumn()
    public id: string;

    @ManyToOne(() => CartInfo, (cart) => cart.cartItems)
    @JoinColumn({ name: "cart_id" })
    public cart: CartInfo;

    @Column({ name: 'product_id',type: 'bigint', nullable: false })
    public productId: string;

    @Column({ name: 'quantity',type: 'int', nullable: false })
    public quantity: number = 0;

    @Column({ name: 'price',type: 'int', nullable: false })
    public price: number = 0;

    @Column({ name: 'created_at',type: 'timestamp with time zone', nullable: false })
    public createdAt: Date = new Date();

    @Column({ name: 'updated_at',type: 'timestamp with time zone', nullable: false })
    public updatedAt: Date = new Date();
}