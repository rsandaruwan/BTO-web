import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CartCommingSoonComponent } from 'src/app/components/popups/cart-comming-soon/cart-comming-soon.component';
import { ProductInterface } from 'src/app/models/product';
import { ProductVariantInterface } from 'src/app/models/product_variant';
import { RecipeInterface } from 'src/app/models/recipe';
import { ApplicationService } from 'src/app/services/application.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  router: any;
  recipe_url: any;
  product_url: any;
  product_seo: any;
  data: any;
  product!: ProductInterface;
  recipe!:RecipeInterface;
  recipes: Array<RecipeInterface> = [];
  recipe_products: Array<ProductInterface>=[];
  recipe_products_variants: Array<ProductVariantInterface>=[];

  constructor(private appComponent: AppComponent,private route: ActivatedRoute, private applicationService: ApplicationService, router: Router, sharedService: SharedService,public dialog: MatDialog) {
    this.router = router;

  }

  toCart_itemsArray:Array<ProductVariantInterface>=[];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.data = JSON.parse(params['recipe_url']);
    })
    this.recipe_url = this.data.recipe;
    this.getRecipe();
    if (this.data.product){
      this.product_url = this.data.product;
      this.product_seo = this.data.product_seo;
      this.getProduct();
      this.getProductRecipes();
    }
      
  }

  getRecipe() {

    this.applicationService.get("", `recipe/search?recipe_id=` + this.recipe_url, "").then((response: any) => {
      this.recipe = response.result[0];
      if (this.recipe) {
        this.get_recipe_products();
        if (!this.data.product){
          this.get_same_category_recipes();
        }
      }

    }).catch((error: any) => {
      console.log(error);
    })
  }

  additem(product_id:any){
    let product = this.recipe_products_variants.find((element: any) => element.product_variant_id == product_id);
    let item = this.toCart_itemsArray.find((element: any) => element.product_variant_id == product_id);
  
    if(item){
      this.toCart_itemsArray.splice(this.toCart_itemsArray.indexOf(item,1));
    }else{
      if(product)
      this.toCart_itemsArray.push(product)
    }
    console.log(this.toCart_itemsArray);
    
  }


  get_recipe_products(){

    for (let index = 0; index < this.recipe.recipe_ingredient.length; index++) {
      const element = this.recipe.recipe_ingredient[index];

      if(element.product_variant_id){
        this.applicationService.get("", `product-variants/view-variant?variant_id=` + element.product_variant_id, "").then((response: any) => {

          if(response.result){
            this.recipe_products.push(response.result[0]);
          }
          for (let index = 0; index < this.recipe_products.length; index++) {
            const element = this.recipe_products[index].product_variants;
            for (let index1 = 0; index1 < element.length; index1++) {
              this.recipe_products_variants.push(element[index1]);
            }
            
          }
        }).catch((error: any) => {
            console.log(error);
        })
      }
      
    }
   
  }
  get_same_category_recipes(){
    this.recipe.recipe_category_details.forEach(recipe_category => {
      
      var url = "recipe/search?recipe_category_id="+recipe_category.recipe_category_id;
      this.applicationService.get("", url, "").then((response: any) => {
        if (response.result) {
          this.recipes = response.result;
          this.recipes=this.recipes.filter(object => object.recipe_id !==  this.recipe.recipe_id);
          // this.set_Pagination(response.number_of_pages);

        }

      }).catch((error: any) => {
        if(error.status=="404"){
          this.recipes=[];
        }
        console.log(error);
      })
    });
  }

   //GET RECIPES
   getProductRecipes() {
    this.applicationService.get("", `recipe/search?product_variant_id=` + this.product_url, "").then((response: any) => {
      this.recipes = response.result;
      if (this.recipes) {
        // var recipe_to_side_nav: SideNaveItemInterface={ name: "Recipes", id: 4, active: false, children: [
        //     { name: "Preparing Instructions", id: 1, active: false, children: [] },
        //     { name: "Featured Recipes", id: 2, active: false, children: [] },
        //   ]
        // }

        // var recipe_to_side_nav: SideNaveItemInterface = {
        //   // name: "Recipes", tag: "recipes", id: 4, active: true, children: [
        //   //   { name: this.view_selected_recipe.recipe_name, tag: "", id: 1, active: false, children: [] },
        //   // ]
        // }
        // this.items[3] = recipe_to_side_nav;
      }

    }).catch((error: any) => {
      console.log(error);
    })
  }
  goto_more_recipes() {
    this.router.navigate(['/recipes']);
  }

    //GET  PRODUCT
    getProduct() {
      this.applicationService.get("", `product-variants/view-variant?variant_id=` + this.product_url, "").then((response: any) => {
        this.product = response.result[0];
        
  
      }).catch((error: any) => {
        console.log(error);
      })
    }
    back_to_product(){
      this.router.navigate(['/'+this.product_seo]);
    }
  
    addtocart() {
      // this.toastr.warning(" ", 'Online Shopping Coming soon..');
      //this.dialog.open(CartCommingSoonComponent, { width: 'auto' });
      // if(this.selected_variant)
      for (let index = 0; index < this.toCart_itemsArray.length; index++) {
        const element = this.toCart_itemsArray[index];
        this.appComponent.cartUpdate(element,1,0);
      }
       
    }
}
