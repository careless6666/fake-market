import { ProductInfo } from "../repository/model/productInfo";
import { dataSourceLazy } from "../repository/psqlClient";

export class ProductService {

    public query = async (searchQuery: ProductSearchQuery): Promise<ProductInfo[]> => {
        var ds = await dataSourceLazy().initialize();

        try {
            let query = {

            }

            return {} as ProductInfo[]
        }
        finally {
            await ds.destroy()
        }
    }
}

export interface ProductSearchQuery {
    id: string;
    name: string;
    categoryId: string;
    limit: number;
    offset: number;
}