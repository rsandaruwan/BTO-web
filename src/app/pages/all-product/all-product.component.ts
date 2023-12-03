import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CategoryInterface } from 'src/app/models/category';
import { ProductInterface } from 'src/app/models/product';
import { ApplicationService } from 'src/app/services/application.service';
import { FormControl, Validators } from '@angular/forms';
import { CategoryHasSubCategoryInterface } from 'src/app/models/categoryhassubcategory';
import { SubCategoryInterface } from 'src/app/models/subcategory';
import { ProductVariantInterface } from 'src/app/models/product_variant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit , AfterViewInit{
  selected = 'option3';
  selected_page = 1;
  categoryOption: string | undefined;
  subcategoryOption: string ="";
  noresult_text="";
  title='All Products';
  //SIDE NAV ITEMS
  items = [
    { name: "name 1",tag:"", id: 1, active: true, type: true, children: [] },
    { name: "name 2",tag:"", id: 2, active: false, type: true, children: [] },
  ];

  products: Array<ProductInterface> = [];
  products_variants: Array<ProductVariantInterface> = [];
  allcategory: Array<CategoryInterface> = [];
  subcategory: Array<SubCategoryInterface> = [];
  data: any;
  pagination: number[] = [];
  more_pagination = false;
  searchFormControl = new FormControl('', [Validators.required, Validators.email]);
  search_text = ""
  constructor(private applicationService: ApplicationService,route: ActivatedRoute) {
    this.data = route.snapshot.paramMap.get('sub_cat');
    console.log(this.data);
  }
  ngAfterViewInit(): void {
    window.scroll(0,0);
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProductsVariants();
    this.getAllCategory();
    this.getAllSubCategory();
    setTimeout(() => {
      window.scroll(0,0);
    }, 500);

  }

  //GET ALL PRODUCTS
  getAllProducts() {
    this.applicationService.get("", `products/view?page_id=` + this.selected_page + `&status_id=1`, "").then((response: any) => {
      this.products = response.result;
      this.set_Pagination(response.number_of_pages);

    }).catch((error: any) => {
    })
  }
  //GET ALL PRODUCT VARIANTS
  getAllProductsVariants() {
    this.applicationService.get("", `product-variants/view?page_id=` + this.selected_page + `&status_id=1`, "").then((response: any) => {
      this.products_variants = response.result;
      this.set_Pagination(response.number_of_pages);

    }).catch((error: any) => {
    })
  }

  //Search PRODUCTS
  searchProducts() {
    this.applicationService.get("", `products/search?product_name=` + this.selected_page, "").then((response: any) => {
      this.products = response.result;
      this.set_Pagination(response.number_of_pages);
    }).catch((error: any) => {
      if(error.status=="404"){
        this.products=[];
        this.products_variants=[];
        this.set_Pagination(0);
        this.noresult_text="No Results Found!";
      }
      console.log(error);
    })
  }

  //GET ALL Category
  getAllCategory() {
    this.applicationService.get("", `category/view`, "").then((response: any) => {
      if (response.result) {
        this.allcategory = response.result;
      }

    }).catch((error: any) => {
    })
  }

  //GET ALL SUB CATEGORIES
  getAllSubCategory() {
    this.applicationService.get("", `sub-category/view`, "").then((response: any) => {
      if (response.result) {
        this.subcategory = response.result;
        if(this.data){
          this.subcategoryOption = this.subcategory.find((element: SubCategoryInterface) => element.sub_category_name == this.data)?.sub_category_id+"";
        
          this.search();
        }
      }

    }).catch((error: any) => {
    })
  }

  //SET PRODUCT PAGINATION
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

  get_subcategories() {

    setTimeout(() => {
      this.search();
      if(this.categoryOption){
        this.subcategory = [];
        this.applicationService.get("", `category-has-sub-category/view?category_id=` + this.categoryOption, "").then((response: any) => {
          if (response) {
            // this.products = response.result;
          
            for (let index = 0; index < response.length; index++) {
              const element: CategoryHasSubCategoryInterface = response[index];
              this.subcategory[index] = <SubCategoryInterface><unknown>element.sub_category_details[0];
             
            }
          }
  
  
        }).catch((error: any) => {
          if(error.status=="404"){
            this.getAllSubCategory();
          }
        })
      }else{
        this.getAllSubCategory();
      }
    
      
    }, 100);
  }
 
  subcategory_select() {
    setTimeout(() => {
      this.search();
     
      var selected_cat=this.subcategory.find((element)=>element.sub_category_id==this.subcategoryOption);
      if(selected_cat){
        this.title=selected_cat.sub_category_name
      }else{
        this.title='All Products';
      }
    }, 100);
  }


  //SEARCH
  search_by_text(event: any) {
    this.search_text = event.target.value;
    this.search();
  }

  search() {
    var url = "products/search";
    var execute = true;
    this.noresult_text="";
    if (this.search_text) {
      url += `?product_name=${this.search_text}`;
    }
    if (this.subcategoryOption) {
      url += `${url.includes("?") ? "&" : "?"}sub_category_id=${this.subcategoryOption}`;
    }
    if (this.categoryOption) {
      url += `${url.includes("?") ? "&" : "?"}category_id=${this.categoryOption}`;
    }
 
    if((!this.search_text && !this.subcategoryOption && !this.categoryOption ) || url=="products/search"){
      execute=false;
    }
  

    if (execute) {

      this.applicationService.get("", url, "").then((response: any) => {
        if (response.result) {
          this.products = response.result;
          this.products_variants=[];
          this.products.forEach((element:ProductInterface) => {
            element.product_variants.forEach((element1:ProductVariantInterface) => {
              this.products_variants.push(element1)
            });
          });
        

          this.set_Pagination(response.number_of_pages);

        }

      }).catch((error: any) => {
        if(error.status=="404"){
          this.products=[];
          this.products_variants=[];
          this.set_Pagination(0);
          this.noresult_text="No Results Found!";
        }
        console.log(error);
      })

    }else{
      this.getAllProductsVariants();
    }
  }
}