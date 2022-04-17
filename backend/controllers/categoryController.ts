import { Body, Post, Route } from "tsoa";
import { ICategoryListRequest, ICreateCategoryRequest } from "../model/http/requests/categoryRequests";
import { CategoryItems } from "../model/http/responses/categoryResponses";
import { BaseResponse, ReponseHelper } from "../model/http/responses/reponseHelper";
import { validateRequest } from "../validation/validation";
import { ClientError } from "../Exceptions/clientErrors";
import { categoryValidator } from "../validation/category";
import { CategoryService } from "../service/categoryService";

@Route("/v1/category/")
export class CategoryController {
    private _categoryService: CategoryService = new CategoryService();

    @Post("/create")
    public async create(@Body() body: ICreateCategoryRequest): Promise<BaseResponse<string>> {

        const invalidResult = validateRequest(body, categoryValidator.create);
        if (invalidResult)
            throw new ClientError(invalidResult);

        var result = await this._categoryService.create(body.name);

        return ReponseHelper.createSuccess<string>(result)
    }

    @Post("/list")
    public async list(@Body() body: ICategoryListRequest): Promise<BaseResponse<CategoryItems>> {
        var result = {} as CategoryItems;

        var result = await this._categoryService.list();        

        return ReponseHelper.createSuccess<CategoryItems>(result)
    }

}