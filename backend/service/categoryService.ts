import { ClientError } from "../Exceptions/clientErrors";
import { CategoryItems } from "../model/http/responses/categoryResponses";
import { CategoryInfo } from "../repository/model/categoryInfo";
import { AppDataSource } from "../repository/psqlClient";

export class CategoryService {
  public create = async (newCategoryName: string): Promise<string> => {
    var ds = AppDataSource;

    try {
      const categoriesInfo = await ds.getRepository(CategoryInfo).findBy({
        name: newCategoryName,
      });

      if (categoriesInfo?.length > 1) {
        throw new ClientError(
          `Category with name ${newCategoryName} already exist`
        );
      }

      let newCategoryinfo = new CategoryInfo();
      newCategoryinfo.name = newCategoryName;

      var categoryRepository = ds.getRepository(CategoryInfo);
      const response = await categoryRepository.save(newCategoryinfo);

      return response.id;
    } finally {
      await ds.destroy();
    }
  };

  public list = async (): Promise<CategoryItems> => {
    var ds = AppDataSource;

    var result = {} as CategoryItems;

    const categoriesInfo = await ds.getRepository(CategoryInfo).find();

    if (!categoriesInfo) {
      return result;
    }

    var result = {
      items: categoriesInfo.map((item: CategoryInfo) => {
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          alias: item.alias,
        };
      }),
    } as CategoryItems;

    return result;
  };
}
