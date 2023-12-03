import { Component, ElementRef, HostListener, AfterViewInit, QueryList, ViewChild, ViewChildren, Input } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
import { CartItemInterface } from 'src/app/models/cart-item.model';
import { CartInterface } from 'src/app/models/cart.model';
import { InstagramInterface } from 'src/app/models/instagramdata';
import { SideNaveItemInterface } from 'src/app/models/side_nav_item';
import { UserInterface } from 'src/app/models/user.model';
import { CartStorageService } from 'src/app/services/cart-storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements AfterViewInit {
  @ViewChild('cart_view') cart_view: ElementRef | any;
  @ViewChild('checkout') checkout: ElementRef | any;
  @ViewChild('order-review') order_review: ElementRef | any;

  currency:string=this.appComponent.currency;

  displayedColumns: string[] = ['product_name', 'price', 'qty', 'discount', 'total'];
  dataSource!: MatTableDataSource<CartItemInterface>;
  router: any;


  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  selected_section_text = 'Shopping Cart';
  instagram_data: InstagramInterface | undefined;
  in_footer = false;
  cart!: CartInterface;
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          var element = entry.target;

          if (element.id == "instagram_feed") {
            this.in_footer = true;
          } else {
            this.in_footer = false;
          }


        }
      })
    }, { threshold: 0.1 }
  )

user:UserInterface | undefined;
  constructor(router: Router,private tokeStorage:TokenStorageService, private cartStorage: CartStorageService, private appComponent: AppComponent) {
    this.router = router;
this.user=tokeStorage.getUser();
    // Assign the data to the data source for the table to render
    this.getCartData();
    setTimeout(() => {
      this.currency=this.appComponent.currency;
      
    }, 1000);
  }
  getCartData() {
    let cart= this.cartStorage.getCart();
    if (cart) {
      this.cart = cart;
      this.dataSource = new MatTableDataSource(this.cart.cart_items);
      this.dataSource.paginator = this.paginator;
    } else {
      this.cart = {
        cart_items: [],
        sub_total: 0,
        delivery_info:undefined
      }
      this.dataSource = new MatTableDataSource();
      this.dataSource.paginator = this.paginator;
    }

  }


  getCartQTY():number {
   var cart_qty = 0;
    if (this.cart){
      this.cart.cart_items.forEach((element: CartItemInterface) => {
        cart_qty += element.qty;
 
       });
    }
    return cart_qty;  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

   setTimeout(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   }, 500);
  }

  // checkout() {
  //   this.router.navigate(['/checkout']);
  // }

  index = 0;

  // clickPrev() {
  //   this.selected_section_text = this.items[this.index - 1].name;
  //   if (this.index <= (this.pages.length - 1)) {
  //     if (this.index < 0) return;
  //     // this.togglePageContent(this.index, 'hide');
  //     this.index--;
  //     this.pages.forEach((page: { nativeElement: { scrollIntoView: (arg0: { behavior: string; }) => void; }; }, i: number) => {
  //       if (i === this.index) {
  //         // this.togglePageContent(i, 'show');
  //         page.nativeElement.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     });
  //     this.side_nav.activate(this.index + 1)
  //   }
  // }
  // clickNext() {
  //   this.selected_section_text = this.items[this.index + 1].name;
  //   if (this.index < (this.pages.length - 1)) {
  //     if (this.index > 4) return;
  //     // this.togglePageContent(this.index, 'hide');
  //     this.index++;
  //     this.pages.forEach((page: { nativeElement: { scrollIntoView: (arg0: { behavior: string; }) => void; }; }, i: number) => {
  //       if (i === this.index) {
  //         // this.togglePageContent(i, 'show');
  //         page.nativeElement.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     });
  //     this.side_nav.activate(this.index + 1)
  //   }

  // }

  show = 1;
  next(id: number) {

    switch (id) {
      case 2:
        this.show = 2;
        // this.items[0].active = false;
        // this.items[1].active = true;


        break;
      case 3:
       // this.show = 3;
        // this.items[1].children[0].active = false;
        // this.items[1].children[1].active = true;
        break;

      default:
        this.show = 1;

        // this.items[1].active = false;
        // this.items[0].active = true;

        break;

    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  toview(id: number) {
    this.index = (id - 2);
  }
  addone(selected_variant: CartItemInterface) {

    if (selected_variant)
      this.appComponent.cartUpdate1(selected_variant, 1, 0);
    this.getCartData();
  }
  mineone(selected_variant: CartItemInterface) {

    if (selected_variant)
      this.appComponent.cartUpdate1(selected_variant, 1, 1);
    this.getCartData();
  }
  removeone(selected_variant: CartItemInterface) {

    if (selected_variant)
      this.appComponent.cartUpdate1(selected_variant, 1, 2);
    this.getCartData();
  }
  clearCart() {
    this.appComponent.clearCart();
    this.getCartData();
  }
  isPrecise(num: number) {
   return Number(num).toFixed(2);
  }
  saveCart(){
    
  }
}
