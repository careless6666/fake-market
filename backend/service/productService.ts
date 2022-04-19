import { CategoryInfo } from "../repository/model/categoryInfo";
import { ProductInfo } from "../repository/model/productInfo";
import { AppDataSource } from "../repository/psqlClient";

export class ProductService {
  private readonly _tableName: string = "product";

  public query = async (
    searchQuery: ProductSearchQuery
  ): Promise<ProductInfo[]> => {
    var ds = AppDataSource;

    var productRepository = ds.getRepository(ProductInfo);

    if (searchQuery?.id && searchQuery?.id?.length > 0) {
      var res = await productRepository
        .createQueryBuilder(this._tableName)
        .where(`${this._tableName}.id = ${searchQuery.id}`, {
          id: searchQuery.id,
        })
        .getOne();

      if (res === null) {
        return [];
      }

      return [res as ProductInfo];
    }

    var linqQuery = productRepository.createQueryBuilder(this._tableName);

    var query = {} as any;

    if (searchQuery?.name && searchQuery?.name?.length > 0) {
      query.name = searchQuery.name;
      linqQuery = linqQuery.where(
        `${this._tableName}.name ilike '%${searchQuery?.name}%'`
      );

      if (searchQuery?.categoryId && searchQuery?.categoryId?.length > 0) {
        query.categoryid = searchQuery.categoryId;
        linqQuery = linqQuery.andWhere(
          `${this._tableName}.category_id = ${searchQuery.categoryId}`
        );
      }
    } else if (searchQuery?.categoryId && searchQuery?.categoryId?.length > 0) {
      linqQuery = linqQuery.where(
        `${this._tableName}.category_id = ${searchQuery.categoryId}`
      );
    }

    linqQuery = linqQuery.skip(searchQuery.offset);
    linqQuery = linqQuery.take(searchQuery.limit);

    /*
            query.skip = searchQuery.offset;
            query.take = searchQuery.limit;

            var result = await productRepository.find({
                where: {
                    name: 'Milk products97',
                    category.id = 1
                },
                relations: {
                    category: true,
                },
                skip: searchQuery.offset,
                take: searchQuery.limit
            });*/

    var result = await linqQuery.getMany();

    return result;
  };
}

export interface ProductSearchQuery {
  id?: string;
  name?: string;
  categoryId?: string;
  limit: number;
  offset: number;
}
