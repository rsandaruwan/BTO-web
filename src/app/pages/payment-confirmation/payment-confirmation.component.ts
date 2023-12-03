import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ApplicationService } from 'src/app/services/application.service';
import * as moment from 'moment';
import { CartStorageService } from 'src/app/services/cart-storage.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit {
  currency:string=this.appComponent.currency;
  options: AnimationOptions = {
    path: "assets/videos/payment.json"
  };
  options1: AnimationOptions = {
    path: "assets/videos/cart.json"
  };
  params: any;
  error: any;
  response: any;
  paid_date: string | undefined;
  paid_time: string | undefined;
  gross_total: number = 0;
 router;
  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,router: Router,private appComponent: AppComponent) {
    this.router = router;
    setTimeout(() => {
      this.currency=this.appComponent.currency;
      
    }, 1000);
    this.route.queryParams.subscribe(params => {
      // let date = params['startdate'];
      this.params = params;
      
      console.log(params); // Print the parameter to the console. 
    });


  }

  ngOnInit(): void {
    if(this.params.transactionId){
      var data = {
        "transaction_id": this.params.transactionId,
        "state": this.params.state,
        "signature": this.params.signature
  
      }
      this.applicationService.post(data, '', "order/payment/validate", "").then((response: any) => {
        this.response = response;
        response.items.forEach((element: any) => {
          this.gross_total += element.product_price * element.qty
        });
        this.paid_date = moment(response.payment_done_at).format('DD MMM YYYY');
        this.paid_time = moment(response.payment_done_at).format('hh:mm A');
        this.appComponent.clearCart()
        // if (response.success) {
        //   document.location.href = response.payment_url;
        // }
  
  
  
      }).catch((error: any) => {
        if (error.status == 500) {
          this.error = error;
        }

      })
    }else{
      this.toHome();
    }
   
  }

  toProduct(){
    this.router.navigate(['/products']); 
  }
  toCart(){
    this.router.navigate(['/cart']); 
  }
 toHome(){
  this.router.navigate(['/']); 
  }
}
