import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1649788005365 implements MigrationInterface {
    name = 'migrations1649788005365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "image" text`);
        await queryRunner.query(`
        
        insert into category (id, name, parent_id, image) values (1, 'Milk products', null, 'https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2015/08/thumb_720_450_1495_f.jpg');
        insert into category (id, name, parent_id, image) values (2, 'Fruits and vegetables', null, 'https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2012/09/vegetables-and-fruits-farmers-market.jpg');
        insert into category (id, name, parent_id, image) values (3, 'Meat', null, 'https://media.istockphoto.com/photos/assortment-of-meat-and-seafood-picture-id1212824120?k=20&m=1212824120&s=612x612&w=0&h=yHkNBM-cUaMXEdVQj1GzZ_AAZ9tsV06dMuYIzcRzqbM=');
        insert into category (id, name, parent_id, image) values (4, 'Sausage and sausages', null, 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/48b79aac-14c2-4e1f-bbdf-9646a171c390/Derivates/1a7bc265-3d1a-46af-bc6c-dfe610f24830.jpg');
        insert into category (id, name, parent_id, image) values (5, 'Fish and seafood', null, 'https://www.foodnavigator.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/article/2017/11/14/why-are-sales-of-fresh-fish-and-seafood-floundering-in-europe/7541964-1-eng-GB/Why-are-sales-of-fresh-fish-and-seafood-floundering-in-Europe.jpg');
        insert into category (id, name, parent_id, image) values (6, 'Bakery', null, 'https://www.mashed.com/img/gallery/the-best-bakery-in-every-state/intro-1601499029.jpg');
        insert into category (id, name, parent_id, image) values (7, 'Frozen', null, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaAXe-5mw4XW0a4GhbFE7H8cXcGrWtwhb8iw&usqp=CAU');
        insert into category (id, name, parent_id, image) values (8, 'Dry goods and pasta', null, 'https://www.fleskmeats.com/wp-content/uploads/2017/05/pasta.jpg');
        insert into category (id, name, parent_id, image) values (9, 'Pets', null, 'https://i.cbc.ca/1.5077459.1553886010!/fileImage/httpImage/pets.jpg');
        insert into category (id, name, parent_id, image) values (10, 'Kids', null, 'https://files.nc.gov/osfm/styles/carousel/public/images/2021-05/Safekids-Banner2-LandingPage.jpg?VersionId=jJwNyddtBMXyEpg9gaSUORWTXlM9BElC&itok=ikT4a5gW');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "image"`);
    }

}
