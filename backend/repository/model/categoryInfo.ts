import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductInfo } from "./productInfo";

@Entity("category")
export class CategoryInfo {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ type: "text", nullable: false })
  public name: string | undefined;

  @Column({ type: "text", nullable: true })
  public image: string | undefined;

  @Column({ name: "parent_id", type: "bigint", nullable: true })
  public parentId: number = 0;

  @Column({ name: "alias", type: "text", nullable: true })
  public alias: string | undefined;

  @OneToMany(() => ProductInfo, (product) => product.category)
  public product: ProductInfo;
}
