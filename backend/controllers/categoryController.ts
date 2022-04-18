import { Body, Post, Route } from "tsoa";
import { ICategoryListRequest, ICreateCategoryRequest } from "../model/http/requests/categoryRequests";
import { CategoryItems } from "../model/http/responses/categoryResponses";
import { BaseResponse, ReponseHelper } from "../model/http/responses/reponseHelper";
import { dataSourceLazy } from "../repository/psqlClient";
import { CategoryInfo } from "../repository/model/categoryInfo";

@Route("api/v1/category/")
export class CategoryController {
    @Post("/create")
    public async create(@Body() body: ICreateCategoryRequest): Promise<BaseResponse<string>> {
        return ReponseHelper.createSuccess<string>("")
    }

    @Post("/list")
    public async list(@Body() body: ICategoryListRequest): Promise<BaseResponse<CategoryItems>> {
        var result = {} as  CategoryItems;

        var ds = await dataSourceLazy().initialize();

        try {

            const categoriesInfo = await ds
                .getRepository(CategoryInfo)
                .find()

            if(!categoriesInfo){
                return ReponseHelper.createSuccess<CategoryItems>(result)
            }

            var result = {
                items: categoriesInfo.map((item: CategoryInfo) => {
                    return {
                        id: item.id,
                        name: item.name,
                        image:  item.image
                     }})
            } as CategoryItems;
            
            return ReponseHelper.createSuccess<CategoryItems>(result)

        } catch(e) {
            return ReponseHelper.createError((e as any).toString());
        }
    }
    
}