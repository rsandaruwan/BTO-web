import { RecipeCategoryInterface } from "./recipe_category";
import { RecipeIngredientInterface } from "./recipe_ingredient"
import { RecipeStepInterface } from "./recipe_step"

export interface RecipeInterface {
 
  recipe_id : string,
  recipe_name :  string,
  recipe_seo_title :string,
  recipe_category_details: Array<RecipeCategoryInterface>;
  recipe_main_image : string,
  recipe_summary : string,
  recipe_ingredient :  Array<RecipeIngredientInterface>
  recipe_step : Array<RecipeStepInterface> 
 
}