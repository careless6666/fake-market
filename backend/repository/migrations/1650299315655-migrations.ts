import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1650299315655 implements MigrationInterface {
    name = 'migrations1650299315655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into product (name, description, photo, price, category_id)
        select 'Milk products' || i, 'Milk products' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 1
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Fruits and vegetables' || i, 'Fruits and vegetables' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 2
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Meat' || i, 'Meat' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 3
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Sausage and sausages' || i, 'Sausage and sausages' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 4
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Fish and seafood' || i, 'Fish and seafood' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 5
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Bakery' || i, 'Bakery' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 6
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Frozen' || i, 'Frozen' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 7
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Dry goods and pasta' || i, 'Dry goods and pasta' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 8
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Pets' || i, 'Pets' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 9
        from generate_series(0, 150) as t(i);
        
        insert into product (name, description, photo, price, category_id)
        select 'Kids' || i, 'Kids' || i, 'https://global-uploads.webflow.com/5d556af3fe21d65f602dca94/5def862ab67e21987db97ca9_Featured_October_1%20(1).png', i + 101, 10
        from generate_series(0, 150) as t(i);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
