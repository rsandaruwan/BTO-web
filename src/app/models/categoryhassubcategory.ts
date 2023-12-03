import { CategoryInterface } from "./category";

export interface CategoryHasSubCategoryInterface {
  categories_has_sub_id: string,
  category_id: string,
  sub_category_id: string,
  category_details: Array<CategoryInterface>,
  sub_category_details: Array<any>,
}