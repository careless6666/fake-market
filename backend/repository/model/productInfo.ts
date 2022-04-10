import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CategoryInfo } from "./categoryInfo";

@Entity("product")
export class ProductInfo {

    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @Column({ type: 'text', nullable: false })
    public name: string | undefined;

    @ManyToOne(() => CategoryInfo, (category) => category.id)
    @Column({name: 'category_id', type: 'text', nullable: true})
    public categoryId: BigInt = BigInt(0);

    @Column({ type: 'text', nullable: false })
    public description: string | undefined;

    @Column({ type: 'text', nullable: false })
    public photo: string | undefined;

    @Column({ type: 'int', nullable: false })
    public price: number = 0;
}