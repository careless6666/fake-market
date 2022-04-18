import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1650281050855 implements MigrationInterface {
  name = "migrations1650281050855";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ADD "alias" text`);

    await queryRunner.query(`
        UPDATE public.category SET alias = 'milk-products' WHERE id = 1;
        UPDATE public.category SET alias = 'fruits-and-vegetables' WHERE id = 2;
        UPDATE public.category SET alias = 'meat' WHERE id = 3;
        UPDATE public.category SET alias = 'sausage-and-sausages' WHERE id = 4;
        UPDATE public.category SET alias = 'fish-and-seafood' WHERE id = 5;
        UPDATE public.category SET alias = 'bakery' WHERE id = 6;
        UPDATE public.category SET alias = 'frozen' WHERE id = 7;
        UPDATE public.category SET alias = 'dry goods and pasta' WHERE id = 8;
        UPDATE public.category SET alias = 'pets' WHERE id = 9;
        UPDATE public.category SET alias = 'kids' WHERE id = 10;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "alias"`);
  }
}
