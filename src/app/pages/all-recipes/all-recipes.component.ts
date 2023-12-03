import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeInterface } from 'src/app/models/recipe';
import { RecipeCategoryInterface } from 'src/app/models/recipe_category';
import { ProductVariantInterface } from 'src/app/models/product_variant';
import { ProductInterface } from 'src/app/models/product';
import { InstagramInterface } from 'src/app/models/instagramdata';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent implements OnInit, AfterViewInit {
  selected = 'option3';
  product_url: any;
  product!: ProductInterface;
  search_text = "";
  title = 'All Recipes';
  recipes: Array<RecipeInterface> | undefined = [];
  allcategory: Array<RecipeCategoryInterface> = [];
  categoryOption: string | undefined;
  no_result_text = 'loading...';
  page = 1;
  pagination: number[] = [];
  more_pagination = false;
  constructor(private route: ActivatedRoute, private applicationService: ApplicationService) {

  }
  ngAfterViewInit(): void {
    window.scroll(0, 0);
  }
  items = [
    { name: "name 1", tag: "", id: 1, active: true, type: true, children: [] },
    { name: "name 2", tag: "", id: 2, active: false, type: true, children: [] },
  ];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.product_url = params['product_url'];
      if (!this.product_url) {
        this.getAllRecipes();

      } else {
        this.getRecipesForProduct();
      }
      this.getAllCategory();
    });
    setTimeout(() => {
      window.scroll(0, 0);
    }, 500);

  }

  getRecipesForProduct() {
    this.no_result_text = 'loading...';
    this.applicationService.get("", `product-variants/view-variant?seo_title=` + this.product_url, "").then((response: any) => {

      this.product = <ProductInterface>response.result[0];
      if (this.product.product_variants[0]) {
        this.applicationService.get("", `recipe/search?product_variant_id=` + this.product.product_variants[0].product_variant_id, "").then((response: any) => {
          this.recipes = response.result;
          if (response.number_of_pages)
            this.set_Pagination(response.number_of_pages);
        }).catch((error: any) => {
          console.log(error);
          if (error.status == "404") {
            this.no_result_text = 'No Result Found !';
            this.recipes = [];
          }
        })
      }
    }).catch((error: any) => {
      console.log(error);
    })

  }
  //GET ALL PRODUCTS
  getAllRecipes() {
    this.no_result_text = 'loading...';
    this.applicationService.get("", `recipe/view?page_id=` + this.page, "").then((response: any) => {
      this.recipes = response.result;
      if (response.number_of_pages)
        this.set_Pagination(response.number_of_pages);

    }).catch((error: any) => {
      console.log(error);
      if (error.status == "404") {
        this.no_result_text = 'No Result Found !';
        this.recipes = [];
      }

    })
  }

  getAllCategory() {
    this.applicationService.get("", `recipe-category/view`, "").then((response: any) => {
      if (response.result) {
        this.allcategory = response.result;
      }

    }).catch((error: any) => {
      console.log(error);
    })
  }

  set_Pagination(number_of_pages: any) {
    this.pagination = [];
    for (let index = 1; index <= (number_of_pages); index++) {
      if (index < 5) {
        this.pagination.push(index);

      } else {
        this.more_pagination = true;
      }

    }
  }

  category_select() {
    setTimeout(() => {
      this.search();
      var selected_cat = this.allcategory.find((element) => element.recipe_category_id == this.categoryOption);
      if (selected_cat) {
        this.title = selected_cat.recipe_category_name
      } else {
        this.title = 'All Recipes';
      }
    }, 100);
  }

  search_by_text(event: any) {
    this.search_text = event.target.value;
    this.search();



  }

  search() {
    var url = "recipe/search";
    var execute = true;

    if (this.search_text) {
      url += `?recipe_name=` + this.search_text;
    }

    if (this.categoryOption) {
      url += `${url.includes("?") ? "&" : "?"}recipe_category_id=${this.categoryOption}`;
    }

    if ((!this.search_text && !this.categoryOption) || url == "products/search") {
      execute = false;
    }

    if (execute) {
      this.no_result_text = 'loading...';
      this.applicationService.get("", url, "").then((response: any) => {
        if (response.result) {
          this.recipes = response.result;
          // this.set_Pagination(response.number_of_pages);

        }

      }).catch((error: any) => {
        if (error.status == "404") {
          this.recipes = [];
          this.no_result_text = 'No Result Found !';

          this.set_Pagination(0);
        }
        console.log(error);
      })

    } else {
      this.getAllRecipes();
    }
  }
}
