import { Body, Post, Route } from "tsoa";
import { ClientError } from "../Exceptions/clientErrors";
import { IProductQueryRequest } from "../model/http/requests/productRequests";
import { ProductItem, ProductItems } from "../model/http/responses/productResponses";
import { BaseResponse, ReponseHelper } from "../model/http/responses/reponseHelper";
import { ProductService } from "../service/productService";
import { productValidator } from "../validation/product";
import { validateRequest } from "../validation/validation";

@Route("/v1/product/")
export class ProductController {
    private _productService: ProductService = new ProductService();

    @Post("/query")
    public async create(@Body() body: IProductQueryRequest): Promise<BaseResponse<ProductItems>> {
        
        const invalidResult = validateRequest(body, productValidator.query);
        if (invalidResult)
            throw new ClientError(invalidResult);

        const result = await this._productService.query({
            id: body.id,
            name: body.name,
            categoryId: body.categoryId,
            limit: body.limit,
            offset: body.offset
        })

        let response = {
            items: result?.map(i => ({
                id: i.id,
                name: i.name,
                image: i.photo,
                price: i.price,
                categoryId: i.category?.id,
                description: i.description
            }) as ProductItem)
        } as ProductItems

        return ReponseHelper.createSuccess<ProductItems>(response)
    }
}