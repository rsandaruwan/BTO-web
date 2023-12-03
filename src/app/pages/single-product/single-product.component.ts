import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, QueryList, ElementRef } from '@angular/core';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
import { SideNaveItemInterface } from 'src/app/models/side_nav_item';
import * as $ from 'jquery';
import 'slick-carousel';
import { MatTableDataSource } from '@angular/material/table';
import { ProductNutritionInterface } from 'src/app/models/product_nutrition';
import { ProductVariantInterface } from 'src/app/models/product_variant';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { SharedService } from 'src/app/services/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductInterface } from 'src/app/models/product';
import { RecipeInterface } from 'src/app/models/recipe';
import { IngredientInterface } from 'src/app/models/ingredient';
import { InstagramInterface } from 'src/app/models/instagramdata';
import { MatSort } from '@angular/material/sort';
import { CartCommingSoonComponent } from 'src/app/components/popups/cart-comming-soon/cart-comming-soon.component';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { SwiperComponent } from 'swiper/angular';
import Swiper from 'swiper';
import { environment } from 'src/environments/environment.prod';
const ELEMENT_DATA: ProductNutritionInterface[] = [
]

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})

export class SingleProductComponent implements OnInit, AfterViewInit {
  @ViewChildren('page') pages: QueryList<ElementRef> | undefined;
  @ViewChild('side_nav') side_nav: SideNavComponent | any;
  @ViewChild('side_nav') side_nav1: ElementRef | any;
  @ViewChild('side_other_products') side_other_products: ElementRef | any;
  @ViewChild('side_this_other') side_this_other: ElementRef | any;
  @ViewChild('scroll_btn') scroll_btn: ElementRef | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  @ViewChild("myv1Swiper") swiper: SwiperComponent | undefined;


  current_section = 0;
  thumbsSwiper: any;
  thumbsSwiper11: any;
  thumbsSwiper12: any;
  thumbsSwiper4: any;
  selected_section_text = "";
  items: Array<SideNaveItemInterface> = [
    { name: "main", tag: 'main', id: 1, active: true, children: [] },
    { name: "Product Details", tag: 'product_details', id: 2, active: false, children: [] },
    { name: "Ingredients", tag: 'ingredients', id: 3, active: false, children: [] },
    { name: "Recipes", tag: 'recipes', id: 4, active: false, children: [] },

  ];
  product_url: any;
  product!: ProductInterface;

  displayedColumns: string[] = ['nutrition', 'per_100_g', 'per_variant'];
  dataSource: MatTableDataSource<ProductNutritionInterface>;
  selected_variant: ProductVariantInterface | undefined;
  selected_variant_id = "";
  selected_variant_seo_title = "";
  router: any;
  recipes: Array<RecipeInterface> = [];
  other_recipes: Array<RecipeInterface> = [];
  ingredients: Array<Array<IngredientInterface>> = [];
  other_products!: Array<ProductInterface>;
  view_selected_recipe!: RecipeInterface;
  recipe_products: Array<ProductInterface> = [];
  full_view = false;
  to_cart_number=1;
  selected_recipe_name='';
  selected_recipe_description=''

  nutrition_view_all = false;
  instagram_data: InstagramInterface | undefined;

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          var element = entry.target;
          if (this.pages) {

            this.items.forEach(page => {

              if (page.tag === element.id) {

                this.current_section = page.id;
                if (page.tag != 'main') {
                  this.side_other_products.nativeElement.classList.add('d-none');
                  this.side_this_other.nativeElement.classList.remove('d-none');
                } else {
                  this.side_this_other.nativeElement.classList.add('d-none');
                  this.side_other_products.nativeElement.classList.remove('d-none');
                }
                if(this.recipes.length>0){
                  if (page.tag == 'recipes') {
                    this.scroll_btn.nativeElement.classList.remove('scroll_btn_down');
                    this.scroll_btn.nativeElement.classList.add('upside_down');
                    this.scroll_btn.nativeElement.classList.add('upside_down_up');
                  } else {
                    this.scroll_btn.nativeElement.classList.add('scroll_btn_down');
                    this.scroll_btn.nativeElement.classList.remove('upside_down');
                    this.scroll_btn.nativeElement.classList.remove('upside_down_up');
  
                  }
                }else{
                  if (page.tag == 'ingredients') {
                    this.scroll_btn.nativeElement.classList.remove('scroll_btn_down');
                    this.scroll_btn.nativeElement.classList.add('upside_down');
                    this.scroll_btn.nativeElement.classList.add('upside_down_up');
                  } else {
                    this.scroll_btn.nativeElement.classList.add('scroll_btn_down');
                    this.scroll_btn.nativeElement.classList.remove('upside_down');
                    this.scroll_btn.nativeElement.classList.remove('upside_down_up');
  
                  }
                }
                

                if (page.tag == 'recipes') {

                  // this.full_view=true;
                }
                else {

                  this.full_view = false;
                }


                this.side_nav.activate(page.id);
                this.selected_section_text = page.name;
              }
            });

          }


        }
      })
    }, { threshold: 0.1 }
  )



  constructor(router: Router, private route: ActivatedRoute, private applicationService: ApplicationService, sharedService: SharedService, public dialog: MatDialog,private appComponent: AppComponent) {
    this.router = router;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  setTimeout(() => {
    this.currency=this.appComponent.currency;
    
  }, 1000);

    // setTimeout(() => {
    //   this.instagram_data=<InstagramInterface>sharedService.data;
    // }, 3000);
  }

  currency:string=this.appComponent.currency;

  SwiperChange(swiper: any) {
    console.log(swiper)
    console.log(this.recipes);
    console.log(swiper[0].activeIndex);
    console.log(swiper[0].activeIndex-2);
    console.log(this.recipes[swiper[0].activeIndex-2]);

    var recipe=this.recipes[swiper[0].activeIndex-2];
    this.selected_recipe_name=recipe.recipe_name;
    this.selected_recipe_description=recipe.recipe_summary;

  }

  ngAfterViewInit(): void {
    var width = window.innerWidth;
    if (width > 980) {
      var page = document.querySelectorAll(".page");
      page.forEach((secs: Element) => {
        this.observer.observe(secs)
      });
    }
 

    this.pages?.toArray()[0].nativeElement.scrollIntoView({ behavior: 'smooth' });


    $('#slider').slick({
      dots: true,
      infinite: true,
      // autoplay: true,
      // autoplaySpeed: 2500,
      speed: 300,
      slidesToShow: 1,
    });


    setTimeout(() => {

      this.current_section = 0;

      // this.side_nav.activate(1);
      // this.toview(this.items[0])
    }, 1000);




  }


  swipePrev() {
    this.swiper?.swiperRef.slidePrev();
  }
  swipeNext() {
    this.swiper?.swiperRef.slideNext();
  }
  ngOnInit(): void {
    this.selected_section_text = this.items[0].name;
    this.route.params.subscribe(params => {
      this.product_url = params['product_url'];
    })
    this.getProduct();
  }

  toNext() {
    // if(this.current_section==this.items.length){
    // this.toview(this.items[this.items.length-2 ]);
    // this.current_section=this.items.length-2 ;
    // }else{
    //   this.toview(this.items[this.current_section]);
    // }
  }

  getId(): number {
   // console.log(this.current_section,"==",this.items.length,":(");
   
    if (this.current_section == this.items.length) {
      return this.current_section-2;
    } else {
      return 0
    }
  }

  toview(i: SideNaveItemInterface) {
       if (this.pages) {
      var pages_array = this.pages.toArray();

      pages_array.forEach(element => {
        if (element.nativeElement.id === i.tag) {
                    element.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      });

    }
  }




  //GET  PRODUCT
  getProduct() {
    this.applicationService.get("", `product-variants/view-variant?seo_title=` + this.product_url, "").then((response: any) => {
      this.product = response.result[0];
      if (this.product) {
        this.selected_section_text = this.product.product_name;
        this.selected_variant = this.product.product_variants.find(x => x.product_variant_seo_title === this.product_url);
        if (this.selected_variant) {
          this.selected_variant_id = this.selected_variant.product_variant_id;
          if (this.selected_variant.product_attributes) {

            this.view_nutrition();
          }
        }
        this.getProductRecipes();
        this.getSameCategoryProducts();
        this.getIngerediantsArray();

        this.items = [
          { name: this.product.product_name, tag: "main", id: 1, active: true, children: [] },
          { name: "Product Details", tag: "product_details", id: 2, active: false, children: [] },
          { name: "Ingredients", tag: "ingredients", id: 3, active: false, children: [] },
          // { name: "Customer Reviews", id: 4, active: false, children: [] },
          {
            name: "Recipes", tag: "recipes", id: 4, active: false, children: []
          },
          // { name: "Frequently Bought Together", id: 5, active: false, children: [] },
          // { name: "", tag: "footer", id: 5, active: false, children: [] }
        ];
      }

    }).catch((error: any) => {
      if(error.status==404){
        this.router.navigate(['/products']);
      }
    })
  }

  view_nutrition() {
    if (this.selected_variant) {
      var width = window.innerWidth;
      if (width > 980) {
        this.nutrition_view_all = true;
        this.dataSource = new MatTableDataSource(this.selected_variant.product_nutrition);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        if (this.selected_variant.product_nutrition.length > 4) {
          var temp = this.selected_variant.product_nutrition;
          this.nutrition_view_all = false;
          this.dataSource = new MatTableDataSource(temp.slice(0, 3));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

      }


    }
  }

  view_all_nutrition() {
    if (this.selected_variant) {
      this.nutrition_view_all = true;
      this.dataSource = new MatTableDataSource(this.selected_variant.product_nutrition);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  //GET RECIPES
  getProductRecipes() {
    this.applicationService.get("", `recipe/search?product_variant_id=` + this.selected_variant_id, "").then((response: any) => {
      this.recipes = response.result;
      this.selected_recipe_name=this.recipes[0].recipe_name;
      this.selected_recipe_description=this.recipes[0].recipe_summary;
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
      // this.items.splice(3, 1);
    }).catch((error: any) => {
      console.log(error.status);
      if (error.status == 404) {
        this.items.splice(3, 1);
      }

    })
  }
  //GET INGREDIENTS
  getIngerediantsArray() {
    var x = 0;
    // this.product.product_ingredients.push(this.product.product_ingredients[0]);


    // if (this.product.product_ingredients.length > 0) {
    //   var temp:Array<IngredientInterface> = [];
    //   for (let index = 1; index < this.product.product_ingredients.length; index++) {
    //     const element = this.product.product_ingredients[index-1];
    //     if (index % 4 != 0) {
    //       temp.push(element);
    //     } else {
    //       temp.push(element);
    //       this.ingredients[x]=temp;
    //       temp = [];

    //       x++;
    //     }
    //   }
    //   if(temp.length>0){
    //     this.ingredients[x+1]=temp;
    //   }
    // }

  }
  //GET PRODUCTS OF SAME CATEGORY
  getSameCategoryProducts() {
    var cat_id = this.product.category_details[0].category_id;

    if (cat_id) {
      this.applicationService.get("", `products/search?category_id=` + cat_id + "", "").then((response: any) => {
        this.other_products = response.result;



      }).catch((error: any) => {
        console.log(error);
      })
    }

  }

  //SELECTING VARIANT IN SELECTOR 
  select_variant() {
    this.selected_variant = this.product.product_variants.find(x => x.product_variant_id === this.selected_variant_id);
    if (this.selected_variant)
      this.selected_variant_seo_title = this.selected_variant.product_variant_seo_title;
    var doc = (document.getElementById("select_" + this.product.product_id) as HTMLElement);
    if (doc) {
      var mat_select_value_text = (doc.getElementsByClassName("mat-select-value")[0] as HTMLElement);
      if (mat_select_value_text) {

        mat_select_value_text.className = mat_select_value_text.className + " d-flex"
        mat_select_value_text.innerHTML = '<span class="mat-select-min-line white_text w-50 ng-tns-c81-2 ng-star-inserted">' + this.selected_variant?.product_variant_name + '</span></span>';
      }
    }

  }


  //SELECT RECIPE
  select_recipe(recipe_id: any) {
    this.view_selected_recipe = <RecipeInterface>this.recipes.find(recipe => recipe.recipe_id === recipe_id);
    // this.selected_section_text = this.view_selected_recipe.recipe_name;
    // this.other_recipes = this.recipes.filter(object => object.recipe_id !== this.view_selected_recipe.recipe_id);

    // var recipe_to_side_nav: SideNaveItemInterface = {
    //   name: "Recipes",tag:"", id: 4, active: true, children: [
    //     { name: this.view_selected_recipe.recipe_name ,tag:"", id: 1, active: true, children: [] },

    //   ]
    // }
    // this.items[3] = recipe_to_side_nav;
    // setTimeout(() => {
    //   this.side_nav.activate(4);
    // }, 1000);
    var data = {
      product: this.selected_variant_id,
      recipe: this.view_selected_recipe.recipe_id,
      product_seo: this.selected_variant?.product_variant_seo_title
    }


    this.goto_recipe(JSON.stringify(data));

  }


  //GET PRODUCTS OF RECIPE
  // get_recipe_products() {
  //   this.recipe_products = [];
  //   for (let index = 0; index < this.view_selected_recipe.recipe_ingredient.length; index++) {
  //     const element = this.view_selected_recipe.recipe_ingredient[index];
  //     if (element.product_variant_id) {
  //       this.applicationService.get("", `product-variants/view-variant?variant_id=` + element.product_variant_id, "").then((response: any) => {

  //         if (response.result) {
  //           this.recipe_products.push(response.result[0]);
  //         }
  //       }).catch((error: any) => {
  //         console.log(error);
  //       })
  //     }

  //   }

  // }


  goto_recipes(id: any) {

    this.router.navigate(['/recipe/' + this.product_url]);
  }

  scroll_left() {
    var p = document.getElementById("container");
    if (p) {
      if (p.scrollLeft == 0) {
        p.scrollLeft = 900;
      } else {
        p.scrollLeft = 0;
      }


    }
  }

  goto_recipe(text: any) {

    this.router.navigate(['view-recipe/' + text]) .then(() => {

   
        window.location.reload();
    
    });
  }



  add() { 
    this.to_cart_number=this.to_cart_number+1;
  }
  min() { 
    if(this.to_cart_number>1){
      this.to_cart_number=this.to_cart_number-1;
    }
    
  }
  addtocart() {
    // this.toastr.warning(" ", 'Online Shopping Coming soon..');
   // this.dialog.open(CartCommingSoonComponent, { width: 'auto' });
     if(this.selected_variant)
     this.appComponent.cartUpdate(this.selected_variant,this.to_cart_number,0);
  }
  isPrecise(num: number) {
    return Number(num).toFixed(2);
   }
}
