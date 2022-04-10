import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { CategoryInfo } from "./categoryInfo";
import { StockInfo } from "./stockInfo";

@Entity("product")
export class ProductInfo {

    @PrimaryGeneratedColumn()
    public id: BigInt = BigInt(0);

    @Column({ type: 'text', nullable: false })
    public name: string | undefined;

    @ManyToOne(() => CategoryInfo, (category) => category.product)
    @JoinColumn({ name: "category_id" })
    public category: CategoryInfo;

    @Column({ type: 'text', nullable: false })
    public description: string | undefined;

    @Column({ type: 'text', nullable: false })
    public photo: string | undefined;

    @Column({ type: 'int', nullable: false })
    public price: number = 0;

    @OneToOne(()=> StockInfo, (stock) => stock.product)
    public stock: StockInfo;
}