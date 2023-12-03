import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from './services/application.service';
import { SpinnerService } from './services/spinner/spinner.service';
import { AnimationOptions } from "ngx-lottie";
import { SharedService } from './services/shared.service';
import { InstagramInterface } from './models/instagramdata';
import { ProductVariantInterface } from './models/product_variant';
import { CartItemInterface } from './models/cart-item.model';
import { CartInterface } from './models/cart.model';
import { CartStorageService } from './services/cart-storage.service';
import { TokenStorageService } from './services/token-storage.service';
import { elementAt } from 'rxjs';
import { DeliveryInfoInterface } from './models/delivery_info.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'back_to_origin';
  cart: CartInterface | undefined;
  cart_qty = 0;
  options: AnimationOptions = {
    path: "assets/videos/leaves.json"
  };
  public currency = "";
  constructor(
    private http: HttpClient,
    private router: Router,
    public spinnerService: SpinnerService,
    private applicationService: ApplicationService,
    private sharedService: SharedService,
    private cartStorage: CartStorageService,
    private tokenStorage: TokenStorageService
  ) {

    this.http.get(environment.data).subscribe((data: any) => {
      this.currency = data.currency;


    });
    this.instagram_data();
    this.getCart();
  }

  public async getCurrencyLogo(): Promise<any> {
    var x = await this.http.get(environment.data).subscribe((data: any) => {
      this.currency = data.currency;
      
    });
    return x;
  }
  onActivate() {
    // window.scroll(0,0);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)

  }
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   console.log("scrollOffset")
  //   console.log(scrollOffset)
  // }

  public instagram_data() {

    //   this.applicationService.get("", `social-media/get-insta-feed`, "").then((response: any) => {
    //     // this.featured_products = response.result;
    //     this.sharedService.data =response.result.business_discovery;
    //     console.log(this.sharedService.data)
    //     console.log("response.result")
    //     console.log(response.result.business_discovery)

    //   }).catch((error: any) => {
    //     console.log(error);
    //   })




    // var access_token = "EAACUqCRmNvYBADPHxgz3QG7jA9EV1sxQtZAM2u7H7uKAjUDrwOCnbFpyW9PrrMj6DhEbBimt4G3ZBVOnhiG8zkc5z4KVK8JmfNxsCVbPtm3e055n7zeSRRsj4qTFloA5tIhZC38JHpMPkmvf1CoDsxZBYmEbbjiqf3u15CGG9couLcGPIGn9C9gIoffU0EUKjcAU8DB7T7tjYyjbtZCxj";
    // var instagram_name = "frontend_adventure";
    // fetch("https://graph.facebook.com/v16.0/17841458233469061?fields=business_discovery.username(" + instagram_name + ")%7Busername%2Cmedia_count%2Cmedia%7Bid%2Cmedia_type%2Cpermalink%2Cmedia_url%2Cchildren%7Bmedia_url%7D%7D%7D&access_token=" + access_token)
    //   .then(response => response.text())
    //   .then(result => {
    //     this.sharedService.data = <InstagramInterface>JSON.parse(result).business_discovery;
    //     console.log(this.sharedService.data)
    //   })
    //   .catch(error => console.log('error', error));
  }

  public cartUpdate(product: ProductVariantInterface, qty: number, type: number) {
    if (product)
      var new_product: CartItemInterface;
    new_product = {
      product_images: product.product_images[0].image_path,
      product_price: product.product_price,
      qty: qty,
      product_variant_id: product.product_variant_id,
      product_id: product.product_id,
      product_variant_name: product.product_variant_name,
      product_variant_seo_title: product.product_variant_seo_title,
    }
    if (this.tokenStorage.getUser()) {
      //USER IN
      console.log(this.tokenStorage.getUser())
    } else {
      //NO USER
      if (this.cart) {
        //HAVE SESSION CART
        let item = this.cart.cart_items.find((element: CartItemInterface) => element.product_variant_id == product.product_variant_id);
        if (item) {
          //ITEM ALREADY IN CART
          if (type == 0) {
            //ADD
            item.qty += qty;
            var x = 0;
            var selected = 0;
            this.cart.cart_items.forEach((element: CartItemInterface) => {
              if (element.product_variant_id == product.product_variant_id) {
                selected = x;
              }
              x++;
            });
            this.cart.cart_items[selected] = item;

            this.cart.sub_total = this.cart.sub_total + (product.product_price * qty);
          } else if (type == 1) {
            //MIN
            item.qty -= 1;
            var x = 0;
            var selected = 0;
            this.cart.cart_items.forEach((element: CartItemInterface) => {
              if (element.product_variant_id == product.product_variant_id) {
                selected = x;
              }
              x++;
            });
            this.cart.cart_items[selected] = item;

            this.cart.sub_total = this.cart.sub_total - (product.product_price);
          }



        } else {
          //ITEM NEW TO CART
          this.cart.cart_items.push(new_product)
          this.cart.sub_total = this.cart.sub_total + (product.product_price * qty);
        }

      } else {
        // NO SESSION CART

        this.cart = {
          cart_items: [new_product],
          sub_total: (product.product_price * qty),
          delivery_info: undefined
        }
      }
    }
    this.setCart()
  }

  public cartUpdate1(product: CartItemInterface, qty: number, type: number) {
    if (product)
      var new_product: CartItemInterface;
    new_product = product;
    if (this.tokenStorage.getUser()) {
      //USER IN
      console.log(this.tokenStorage.getUser())
    } else {
      //NO USER
      if (this.cart) {
        //HAVE SESSION CART
        let item = this.cart.cart_items.find((element: CartItemInterface) => element.product_variant_id == product.product_variant_id);
        if (item) {
          //ITEM ALREADY IN CART
          if (type == 0) {
            //ADD
            item.qty += qty;
            var x = 0;
            var selected = 0;
            this.cart.cart_items.forEach((element: CartItemInterface) => {
              if (element.product_variant_id == product.product_variant_id) {
                selected = x;
              }
              x++;
            });
            this.cart.cart_items[selected] = item;

            this.cart.sub_total = this.cart.sub_total + (product.product_price * qty);
          } else if (type == 1) {
            //MIN
            item.qty -= 1;
            var x = 0;
            var selected = 0;
            this.cart.cart_items.forEach((element: CartItemInterface) => {
              if (element.product_variant_id == product.product_variant_id) {
                selected = x;
              }
              x++;
            });
            this.cart.cart_items[selected] = item;

            this.cart.sub_total = this.cart.sub_total - (product.product_price);
          } else if (type == 2) {
            //REMOVE

            var x = 0;
            var selected = 0;
            this.cart.cart_items.forEach((element: CartItemInterface) => {
              if (element.product_variant_id == product.product_variant_id) {
                selected = x;
              }
              x++;
            });
            this.cart.cart_items.splice(selected, 1);

            this.cart.sub_total = this.cart.sub_total - (product.product_price * item.qty);
          }



        } else {
          //ITEM NEW TO CART
          this.cart.cart_items.push(new_product)
          this.cart.sub_total = this.cart.sub_total + (product.product_price * qty);
        }

      } else {
        // NO SESSION CART

        this.cart = {
          cart_items: [new_product],
          sub_total: (product.product_price * qty),
          delivery_info: undefined
        }
      }
    }
    this.setCart()
  }
  public cartUpdateDeliveryInfo(delivery_info: DeliveryInfoInterface) {

    if (this.tokenStorage.getUser()) {
      //USER IN
      console.log(this.tokenStorage.getUser())
    } else {
      //NO USER
      if (this.cart) {
        this.cart.delivery_info = delivery_info;
      }

    }
    this.setCart()
  }
  public getCart() {
    let cart = this.cartStorage.getCart();
    if (cart) {
      this.cart = cart;
      this.changeCartQTY();
    } else {
      this.cart = undefined;
      this.cart_qty = 0;
    }


  }
  changeCartQTY() {
    this.cart_qty = 0;
    if (this.cart)
      this.cart.cart_items.forEach((element: CartItemInterface) => {
        this.cart_qty += element.qty;

      });
  }
  public setCart() {
    if (this.cart) {
      let cart_text = JSON.stringify(this.cart);
      if (cart_text)
        this.cartStorage.saveCart(cart_text);
      this.getCart();
    }
  }
  public clearCart() {
    if (this.cart) {
      this.cart.sub_total = 0;
      this.cart.cart_items = [];
      let cart_text = JSON.stringify(this.cart);
      if (cart_text)
        this.cartStorage.saveCart(cart_text);
      this.getCart();
    }
  }


}
