import { IngredientInterface } from "./ingredient"
import { ProductCategoryDetailsInterface } from "./product_category_details"
import { ProductVariantInterface } from "./product_variant"

export interface ProductInterface {
 
  product_id : string,
  product_description :  string,
  product_main_image : string,
  product_rating:number,
  product_in_stock : number,
  product_in_stock_word : string,
  product_ingredients :  Array<IngredientInterface>
  product_name : string,
  product_status : number,
  product_status_word : string,
  product_variants : Array<ProductVariantInterface> ,
  category_details : Array<ProductCategoryDetailsInterface>
}