export interface ICreateCategoryRequest {
  name: string;
}

export interface ICategoryListRequest {
  parentIds?: string[];
  name?: string;
  ids?: string[];
}
