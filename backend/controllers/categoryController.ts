import { Body, Post, Route } from "tsoa";
import { ICreateCategoryRequest } from "../model/http/requests/categoryRequests";
import { BaseResponse, ReponseHelper } from "../model/http/responses/reponseHelper";

@Route("api/v1/category")
export class CategoryController {
    @Post("/create")
    public async create(@Body() body: ICreateCategoryRequest): Promise<BaseResponse<null>> {
        
        
        
        return ReponseHelper.createSuccessEmpty()
    }
}