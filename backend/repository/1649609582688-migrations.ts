import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class migrations1649609582688 implements MigrationInterface {
    name = 'migrations1649609582688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_items" ("id" SERIAL NOT NULL, "cart_id" bigint NOT NULL, "product_id" bigint NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "cartIdId" integer, CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" text NOT NULL, "category_id" text, "description" text NOT NULL, "photo" text NOT NULL, "price" integer NOT NULL, "categoryIdId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "userId" bigint NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "order_id" bigint NOT NULL, "product_id" bigint NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "orderIdId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "order_id" bigint NOT NULL, "total" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "orderIdId" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" SERIAL NOT NULL, "product_id" bigint NOT NULL, "quantity" bigint, "productIdId" integer, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD "parent_id" text`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_033b32986b1524e256cbfa9f711" FOREIGN KEY ("cartIdId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_06de9b4d54cfcc0a046e7542517" FOREIGN KEY ("orderIdId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_9d6b3dd4d1116735778adbe54ab" FOREIGN KEY ("orderIdId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_16813303d17d13a8e8440703b76" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.createIndex("cart", new TableIndex({
            name: "IDX_CART_USER_ID",
            columnNames: ["user_id"]
        }))
        await queryRunner.createIndex("order", new TableIndex({
            name: "IDX_ORDER_USER_ID",
            columnNames: ["user_id"]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IDX_CART_USER_ID`);
        await queryRunner.query(`DROP INDEX IDX_ORDER_USER_ID`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_16813303d17d13a8e8440703b76"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_9d6b3dd4d1116735778adbe54ab"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_06de9b4d54cfcc0a046e7542517"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_033b32986b1524e256cbfa9f711"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "parent_id"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
