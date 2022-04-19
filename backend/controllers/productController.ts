import { Body, Post, Route } from "tsoa";
import { IProductQueryRequest } from "../model/http/requests/productRequests";
import { ProductItem } from "../model/http/responses/productResponses";
import {
  BaseResponse,
  ReponseHelper,
} from "../model/http/responses/reponseHelper";
import { ProductService } from "../service/productService";

@Route("/api/v1/product/")
export class ProductController {
  private _productService: ProductService = new ProductService();

  @Post("/query")
  public async create(
    @Body() body: IProductQueryRequest
  ): Promise<BaseResponse<ProductItem[]>> {
    try {
      const result = await this._productService.query({
        id: body.id ?? "",
        name: body.name ?? "",
        categoryId: body.categoryId ?? "",
        limit: body.limit,
        offset: body.offset,
      });

      let response = result?.map(
        (i) =>
          ({
            id: i.id,
            name: i.name,
            image: i.photo,
            price: i.price,
            categoryId: i.category?.id,
            description: i.description,
          } as ProductItem)
      );

      return ReponseHelper.createSuccess<ProductItem[]>(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
