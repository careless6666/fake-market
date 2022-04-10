import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderItemInfo } from "./orderInfo";

@Entity("category")
export class CategoryInfo {

    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @Column({ type: 'text', nullable: false })
    public name: string | undefined;

    @Column({name: 'parent_id', type: 'text', nullable: true})
    public parentId: number = 0;
}