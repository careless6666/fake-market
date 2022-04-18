export interface IProductQueryRequest {
     
    /**
     * @optionalString
     * @default "1"
     */
    id?: string;
    /**
     * @optionalString
     */
    name?: string;

    /**
     * @optionalString
     */
    categoryId?: string;
    /**
   * @isInt Invalid int error message.
   * @minimum 0
   * @default 100
   */
    limit: number;
    /**
   * @isInt Invalid int error message.
   * @minimum 0
   */
    offset: number;
}
