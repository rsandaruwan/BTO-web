import { Component, Input, AfterViewInit, AfterContentInit, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ProductInterface } from 'src/app/models/product';
import { ProductVariantInterface } from 'src/app/models/product_variant';
import { CartCommingSoonComponent } from '../popups/cart-comming-soon/cart-comming-soon.component';
import { AnimationOptions } from 'ngx-lottie';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {

  @Input() product: ProductVariantInterface | undefined;
  btn_click_status = false;
  selected_variant: ProductVariantInterface | undefined;
  selected_variant_id = "";
  selected_variant_seo_title = "";
  count = 1;


  options: AnimationOptions = {
    path: "assets/videos/tick1.json"
  };
  currency:string=this.appComponent.currency;
  constructor(private appComponent: AppComponent,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {


  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.product) {
        var doc = (document.getElementById("select_" + this.product.product_id) as HTMLElement);

        if (doc) {

          var mat_select_value_text = (doc.getElementsByClassName("mat-select-value")[0] as HTMLElement);

          if (mat_select_value_text) {

            mat_select_value_text.className = mat_select_value_text.className + " d-flex"
            mat_select_value_text.innerHTML = '<span class="mat-select-min-line w-75 white_text ng-tns-c81-2 ng-star-inserted" style="overflow: hidden;">' + this.product.product_variant_name + '</span><span class="mat-select-min-line w-25 white_text ng-tns-c81-2 ng-star-inserted" style="text-align: end;" style="overflow: hidden;">' + this.product.product_price + '</span></span>';
          } else {
          }
        } else {
        }
      }
    }, 1000);


  }

  ngOnInit(): void {
    if (this.product) {
      this.selected_variant = this.product;
      this.selected_variant_id = this.product.product_variant_id;
      this.selected_variant_seo_title = this.product.product_variant_seo_title;
    }
  }



  add() { this.count++; }
  min() {
    if (this.count > 1) {
      this.count--;
    }
  }

  select_variant() {
    // this.selected_variant=this.product.product_variants.find(x => x.product_variant_id === this.selected_variant_id);
    this.selected_variant = this.product;
    if (this.selected_variant)
      this.selected_variant_seo_title = this.selected_variant.product_variant_seo_title;
    if (this.product) {
      var doc = (document.getElementById("select_" + this.product.product_id) as HTMLElement);
      if (doc) {
        var mat_select_value_text = (doc.getElementsByClassName("mat-select-value")[0] as HTMLElement);
        if (mat_select_value_text) {

          mat_select_value_text.className = mat_select_value_text.className + " d-flex"
          mat_select_value_text.innerHTML = '<span class="mat-select-min-line w-75 white_text ng-tns-c81-2 ng-star-inserted" style="overflow: hidden;">' + this.selected_variant?.product_variant_name + '</span><span class="mat-select-min-line w-25 white_text ng-tns-c81-2 ng-star-inserted" style="text-align: end;" style="overflow: hidden;">' + this.selected_variant?.product_price + '</span></span>';

        }
      }
    }
  }
  addtocart() {
    // this.toastr.warning(" ", 'Online Shopping Coming soon..');
    // this.dialog.open(CartCommingSoonComponent, { width: 'auto' });
    this.toastr.success("Item Successfully added to the Cart" );
    if (this.selected_variant)
      this.appComponent.cartUpdate(this.selected_variant, this.count, 0);
    this.btn_click_status = true;
    setTimeout(() => {
      this.btn_click_status = false;
    }, 1500);
  }

}
