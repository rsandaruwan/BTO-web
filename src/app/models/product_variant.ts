import { AttributeInterface } from "./attribute";
import { ImageObjectInterface } from "./imageobject";
import { ProductNutritionInterface } from "./product_nutrition";

export interface ProductVariantInterface {
  product_attributes :  Array<AttributeInterface>,
  product_images : Array<ImageObjectInterface>,
  product_price : number,
  product_variant_id : string,
  product_id:string,
  product_variant_name : string,
  product_variant_seo_title : string,
  product_nutrition : Array<ProductNutritionInterface>
}