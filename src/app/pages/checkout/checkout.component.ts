import { ArrayType } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Output, EventEmitter, AfterViewChecked, ElementRef } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CartInterface } from 'src/app/models/cart.model';
import { DeliveryInfoInterface } from 'src/app/models/delivery_info.model';
import { LocationInterface } from 'src/app/models/location.model';
import { ShippingOptionInterface } from 'src/app/models/shippingoptions.model';
import { UserInterface } from 'src/app/models/user.model';
import { ApplicationService } from 'src/app/services/application.service';
import { CartStorageService } from 'src/app/services/cart-storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Output() continue: EventEmitter<any> = new EventEmitter();
  @ViewChild('paymentForm') paymentForm: ElementRef | undefined;
  posting = false;
  subcategoryOption: number = 4;
  shiping_addres_selction: 'new' | 'saved' = 'new';
  shiping_addres_selction_checked = true;
  shipping_method_id: string = "";
  total = 0;
  selected_store = 0;
  selected_wareHouses = 0;

  currency:string=this.appComponent.currency;
  stores: Array<LocationInterface> | undefined = [];
  WareHouses: Array<LocationInterface> | undefined = []
  list = [
    { pickup_points: [] },
    {
      pickup_points: [
        { address: "Northern Suburbs - Spice Morang, 3/24 Oleander Drive, Mill Park, Victoria 3082.  Note: Closed on Tuesdays", tel: "0 449 981 960 ", user: "Nissindu" },
        { address: "Western Suburbs - Star Lanka Foods, 66 Kings Road, St Albans, Victoria 3021. ", tel: "0 393 621 734 ", user: "Shyamaleen" },
      ]
    },
    {
      pickup_points: [
        { address: "AMK Products. 37 Atlantic Drive, Keysborough, Victoria 3173. ", tel: "0 421 484 290", user: "Assen" }
      ]
    },
  ];
  selected = this.list[1];
  user: UserInterface | undefined;
  same_as_billing_details = true;
  cart: CartInterface | undefined;
  delivery_info: DeliveryInfoInterface | undefined;
  selected_delivery_info: number = 0;
  selected_shipping_address_type: 'Home' | 'Work' | 'Other' = 'Home';
  selected_shipping_address_type_disable: boolean = false;

  BillingNameFormControl = new FormControl('', [Validators.required]);
  BillingEmailFormControl = new FormControl('', [Validators.required, Validators.email]);
  BillingPhoneNumberFormControl = new FormControl('', [Validators.required, Validators.maxLength(10)]);

  RecipientNameFormControl = new FormControl({ value: '', disabled: this.same_as_billing_details }, [Validators.required]);
  RecipientPhoneNumberFormControl = new FormControl({ value: '', disabled: this.same_as_billing_details }, [Validators.required, Validators.maxLength(10)]);

  ShippingAddressNameFormControl = new FormControl('', [Validators.required]);
  ShippingAddressFormControl = new FormControl('', [Validators.required]);
  ShippingStreetNameFormControl = new FormControl('', [Validators.required]);
  ShippingCityFormControl = new FormControl('', [Validators.required]);
  ShippingStateFormControl = new FormControl('', [Validators.required]);
  ShipingAddresSelctionCityFormControl = new FormControl(this.shiping_addres_selction, [Validators.required]);
  SetAsDefaultFormControl = new FormControl(false, [Validators.required]);
  setasdefault = true;

  NoteFormControl = new FormControl('',);
  same_as_my_details = false;
  selected_delivery_info_data: any

  constructor(private tokenStorage: TokenStorageService, private cartStorage: CartStorageService, private appComponent: AppComponent, private applicationService: ApplicationService) {
    setTimeout(() => {
      this.currency=this.appComponent.currency;
      
    }, 1000);
  }
  ngAfterViewChecked(): void {
    if (this.posting && this.paymentForm) {
      this.paymentForm.nativeElement.submit();
    }
  }
  ngAfterViewInit(): void {
  }

  callparent() {
    if (!this.BillingEmailFormControl.hasError('email')) {
      var billing_name = this.BillingNameFormControl.value;
      var billing_email = this.BillingEmailFormControl.value;
      var billing_phone = this.BillingPhoneNumberFormControl.value;
      var recipient_name = "";
      var recipient_phone = "";


      if (this.same_as_billing_details) {
        recipient_name = billing_name;
        recipient_phone = billing_phone;
      } else {
        recipient_name = this.RecipientNameFormControl.value;
        recipient_phone = this.RecipientPhoneNumberFormControl.value;
      }

      var shipping_address_name = this.ShippingAddressNameFormControl.value;
      var shipping_address_no = this.ShippingAddressFormControl.value;
      var shipping_address_street = this.ShippingStreetNameFormControl.value
      var shipping_address_city = this.ShippingCityFormControl.value;
      var shipping_address_state = this.ShippingStateFormControl.value;
      var shipping_address_default = this.SetAsDefaultFormControl.value;

  


      var note = this.NoteFormControl.value;

      if (billing_name && billing_email && billing_phone && recipient_name && recipient_phone && shipping_address_no && shipping_address_street && shipping_address_city && shipping_address_state) {
        if (this.delivery_info) {
          var delivery_info_new = {
            name: shipping_address_name,
            default: shipping_address_default,
            type: this.selected_shipping_address_type,
            shipping_method: this.delivery_info.shipping_method,
            shipping_method_id: this.shipping_method_id,
            billing_name: billing_name,
            billing_email: billing_email,
            billing_phone: billing_phone,
            recipient_name: recipient_name,
            recipient_phone: recipient_phone,
            shipping_address_no: shipping_address_no,
            shipping_address_street: shipping_address_street,
            shipping_address_city: shipping_address_city,
            shipping_address_state: shipping_address_state,
            notes: note
          }

          if (this.cart) {
            this.cart.delivery_info = delivery_info_new;

            // this.appComponent.cartUpdateDeliveryInfo(delivery_info_new);
            console.log(this.cart);

            // if (this.user) {
            //   this.shiping_addres_selction = this.ShipingAddresSelctionCityFormControl.value;
            //   if (this.shiping_addres_selction == 'new') {
            //     console.log('delivery info', delivery_info_new)
            //     if (this.user.delivery_info) {
            //       if (shipping_address_default) {
            //         var def_address = this.user.delivery_info.find(element =>  element.default == true );
            //         if (def_address) {
            //           def_address.default = false;
            //         }
            //       }
            //       this.user.delivery_info.push(delivery_info_new)
            //     } else {
            //       this.user.delivery_info = [delivery_info_new];
            //     }
            //     this.selected_delivery_info_data = delivery_info_new;
            //      this.tokenStorage.saveUser(this.user);
            //     console.log(this.user);
            //   } else {
            //     if (this.user.delivery_info) {
            //       this.selected_delivery_info_data = this.user.delivery_info[this.selected_delivery_info];
            //       if (this.SetAsDefaultFormControl.value) {
            //         console.log(this.user.delivery_info)
            //         var def_address = this.user.delivery_info.find(element =>  element.default == true );

            //         if (def_address) {
            //           def_address.default = false;
            //         }
            //       }
            //     }


            //   }

            // }
            var data = {
              "cart_items": this.cart.cart_items,
              "delivery_info": this.cart.delivery_info,
              "currency": "AUD",

            }

            this.applicationService.post(data, '', "order/guest/add", "").then((response: any) => {
              console.log(response);

              if (response.success) {
                document.location.href = response.payment_url;
              }



            }).catch((error: any) => {
              console.log(error)

            })


            this.continue.emit();
          } else {
          }



        }
      } else {

      }
    }


  }

  ngOnInit(): void {
    this.cart = this.cartStorage.getCart();
    this.user = this.tokenStorage.getUser();
    this.getShippingOptions();
    var is_user_and_delivery_info = false;
    if (this.user) {
      this.same_as_my_details = true;
      this.shiping_addres_selction = this.ShipingAddresSelctionCityFormControl.value;
      if (this.user.delivery_info) {
        this.shiping_addres_selction_checked = false;
        this.delivery_info = this.user?.delivery_info[0];
        is_user_and_delivery_info = true;
        this.shiping_addres_selction = 'saved'

      } else {
        this.SetAsDefaultFormControl = new FormControl(true, [Validators.required]);
        this.shiping_addres_selction_checked = true;
        this.shiping_addres_selction = 'new'
        this.delivery_info = {
          name: "",
          type: 'Home',
          default: true,
          shipping_method: 1,
          shipping_method_id: this.shipping_method_id,
          billing_name: this.user.first_name + " " + this.user.last_name,
          billing_email: this.user.email,
          billing_phone: this.user.mobile + "",
          recipient_name: this.user.first_name + " " + this.user.last_name,
          recipient_phone: this.user.mobile + "",
          shipping_address_no: "",
          shipping_address_street: "",
          shipping_address_city: "",
          shipping_address_state: "",
          notes: ""
        }
      }
      this.ShipingAddresSelctionCityFormControl = new FormControl(this.shiping_addres_selction, [Validators.required]);
    } else {
      if (this.cart) {
        if (this.cart.delivery_info) {
          this.delivery_info = this.cart.delivery_info;
        } else {
          this.delivery_info = {
            name: "",
            type: 'Home',
            default: false,
            shipping_method: 1,
            shipping_method_id: "",
            billing_name: "",
            billing_email: "",
            billing_phone: "",
            recipient_name: "",
            recipient_phone: "",
            shipping_address_no: "",
            shipping_address_street: "",
            shipping_address_city: "",
            shipping_address_state: "",
            notes: ""
          }
        }
      } else {
        this.delivery_info = {
          name: "",
          type: 'Home',
          default: false,
          shipping_method: 1,
          shipping_method_id: "",
          billing_name: "",
          billing_email: "",
          billing_phone: "",
          recipient_name: "",
          recipient_phone: "",
          shipping_address_no: "",
          shipping_address_street: "",
          shipping_address_city: "",
          shipping_address_state: "",
          notes: ""
        }
      }

    }


    this.BillingNameFormControl = new FormControl(this.delivery_info.billing_name, [Validators.required]);
    this.BillingEmailFormControl = new FormControl(this.delivery_info.billing_email, [Validators.required, Validators.email]);
    this.BillingPhoneNumberFormControl = new FormControl(this.delivery_info.billing_phone, [Validators.required, Validators.maxLength(10)]);

    this.RecipientNameFormControl = new FormControl({ value: this.delivery_info.recipient_name, disabled: this.same_as_billing_details }, [Validators.required]);
    this.RecipientPhoneNumberFormControl = new FormControl({ value: this.delivery_info.recipient_phone, disabled: this.same_as_billing_details }, [Validators.required, Validators.maxLength(10)]);

    if (is_user_and_delivery_info) {
      this.selected_shipping_address_type = this.delivery_info.type;
      this.selected_shipping_address_type_disable = true;
      this.ShippingAddressNameFormControl = new FormControl({ value: this.delivery_info.name, disabled: true }, [Validators.required]);
      this.ShippingAddressFormControl = new FormControl({ value: this.delivery_info.shipping_address_no, disabled: true }, [Validators.required]);
      this.ShippingStreetNameFormControl = new FormControl({ value: this.delivery_info.shipping_address_street, disabled: true }, [Validators.required]);
      this.ShippingCityFormControl = new FormControl({ value: this.delivery_info.shipping_address_city, disabled: true }, [Validators.required]);
      this.ShippingStateFormControl = new FormControl({ value: this.delivery_info.shipping_address_state, disabled: true }, [Validators.required]);
      this.SetAsDefaultFormControl = new FormControl(this.delivery_info.default, [Validators.required]);
      if (this.user?.delivery_info)
        if (this.user.delivery_info.length > 1) {
          this.setasdefault = false;
        }
        else {
          this.setasdefault = true;
        }

    } else {
      this.ShippingAddressNameFormControl = new FormControl(this.delivery_info.name, [Validators.required]);
      this.ShippingAddressFormControl = new FormControl(this.delivery_info.shipping_address_no, [Validators.required]);
      this.ShippingStreetNameFormControl = new FormControl(this.delivery_info.shipping_address_street, [Validators.required]);
      this.ShippingCityFormControl = new FormControl(this.delivery_info.shipping_address_city, [Validators.required]);
      this.ShippingStateFormControl = new FormControl(this.delivery_info.shipping_address_state, [Validators.required]);
    }


    this.NoteFormControl = new FormControl(this.delivery_info.notes);


  }
  warehouse: ShippingOptionInterface | undefined = undefined;
  store: ShippingOptionInterface | undefined = undefined;
  stranded: ShippingOptionInterface | undefined = undefined;
  shipping_options: Array<ShippingOptionInterface> = [];
  getShippingOptions() {
    this.applicationService.get("", `shipping/`, "").then((response: any) => {
      this.shipping_options = response;
      this.warehouse = this.shipping_options.find(element => element.method_type == 3);
      this.WareHouses = this.warehouse?.locations;
      this.store = this.shipping_options.find(element => element.method_type == 2);
      this.stores = this.store?.locations;
      this.stranded = this.shipping_options.find(element => element.method_type == 4);
      if(this.stranded)
     this.shipping_method_id=this.stranded?.shipping_method_id

    }).catch((error: any) => {
      console.log(error);
      if (error.status == "404") {

      }
    })
  }

  billing_namePress() {
    if (this.same_as_billing_details)
      this.RecipientNameFormControl = new FormControl({ value: this.BillingNameFormControl.value, disabled: this.same_as_billing_details }, [Validators.required]);
  }
  billing_phonePress() {
    if (this.same_as_billing_details)
      this.RecipientPhoneNumberFormControl = new FormControl({ value: this.BillingPhoneNumberFormControl.value, disabled: this.same_as_billing_details }, [Validators.required]);
  }

  select_delivery_method() {
    setTimeout(() => {
      if (this.subcategoryOption) {
        if (this.delivery_info)
          this.delivery_info.shipping_method = this.subcategoryOption;
        if (this.subcategoryOption == 2) {
          if (this.stores) {
            this.ShippingAddressNameFormControl = new FormControl({ value: this.stores[this.selected_store].address_name, disabled: true }, [Validators.required]);
            this.ShippingAddressFormControl = new FormControl({ value: this.stores[this.selected_store].location_no_or_lane, disabled: true }, [Validators.required]);
            this.ShippingStreetNameFormControl = new FormControl({ value: this.stores[this.selected_store].street_name, disabled: true }, [Validators.required]);
            this.ShippingCityFormControl = new FormControl({ value: this.stores[this.selected_store].city, disabled: true }, [Validators.required]);
            this.ShippingStateFormControl = new FormControl({ value: this.stores[this.selected_store].state, disabled: true }, [Validators.required]);
            this.ShippingAddressNameFormControl.setValue(this.stores[this.selected_store].address_name);
            this.ShippingAddressFormControl.setValue(this.stores[this.selected_store].location_no_or_lane);
            this.ShippingStreetNameFormControl.setValue(this.stores[this.selected_store].street_name);
            this.ShippingCityFormControl.setValue(this.stores[this.selected_store].city);
            this.ShippingStateFormControl.setValue(this.stores[this.selected_store].state);
            if (this.store?.shipping_method_id)
              this.shipping_method_id = this.store?.shipping_method_id;
          }
        } else if (this.subcategoryOption == 3) {
          if (this.WareHouses) {
            this.ShippingAddressNameFormControl = new FormControl({ value: this.WareHouses[this.selected_wareHouses].address_name, disabled: true }, [Validators.required]);
            this.ShippingAddressFormControl = new FormControl({ value: this.WareHouses[this.selected_wareHouses].location_no_or_lane, disabled: true }, [Validators.required]);
            this.ShippingStreetNameFormControl = new FormControl({ value: this.WareHouses[this.selected_wareHouses].street_name, disabled: true }, [Validators.required]);
            this.ShippingCityFormControl = new FormControl({ value: this.WareHouses[this.selected_wareHouses].city, disabled: true }, [Validators.required]);
            this.ShippingStateFormControl = new FormControl({ value: this.WareHouses[this.selected_wareHouses].state, disabled: true }, [Validators.required]);
            this.ShippingAddressNameFormControl.setValue(this.WareHouses[this.selected_wareHouses].address_name);
            this.ShippingAddressFormControl.setValue(this.WareHouses[this.selected_wareHouses].location_no_or_lane);
            this.ShippingStreetNameFormControl.setValue(this.WareHouses[this.selected_wareHouses].street_name);
            this.ShippingCityFormControl.setValue(this.WareHouses[this.selected_wareHouses].city);
            this.ShippingStateFormControl.setValue(this.WareHouses[this.selected_wareHouses].state);
            if (this.warehouse?.shipping_method_id)
              this.shipping_method_id = this.warehouse?.shipping_method_id;
          }
        } else {

          if (this.delivery_info) {
            this.ShippingAddressNameFormControl = new FormControl({ value: this.delivery_info.name, disabled: false }, [Validators.required]);
            this.ShippingAddressFormControl = new FormControl({ value: this.delivery_info.shipping_address_no, disabled: false }, [Validators.required]);
            this.ShippingStreetNameFormControl = new FormControl({ value: this.delivery_info.shipping_address_street, disabled: false }, [Validators.required]);
            this.ShippingCityFormControl = new FormControl({ value: this.delivery_info.shipping_address_city, disabled: false }, [Validators.required]);
            this.ShippingStateFormControl = new FormControl({ value: this.delivery_info.shipping_address_state, disabled: false }, [Validators.required]);
            this.ShippingAddressNameFormControl.setValue(this.delivery_info.name);
            this.ShippingAddressFormControl.setValue(this.delivery_info.shipping_address_no);
            this.ShippingStreetNameFormControl.setValue(this.delivery_info.shipping_address_street);
            this.ShippingCityFormControl.setValue(this.delivery_info.shipping_address_city);
            this.ShippingStateFormControl.setValue(this.delivery_info.shipping_address_state);
            if (this.stranded?.shipping_method_id)
            this.shipping_method_id = this.stranded?.shipping_method_id;
          } else {
            this.ShippingAddressNameFormControl = new FormControl('', [Validators.required]);
            this.ShippingAddressFormControl = new FormControl('', [Validators.required]);
            this.ShippingStreetNameFormControl = new FormControl('', [Validators.required]);
            this.ShippingCityFormControl = new FormControl('', [Validators.required]);
            this.ShippingStateFormControl = new FormControl('', [Validators.required]);
            if (this.stranded?.shipping_method_id)
            this.shipping_method_id = this.stranded?.shipping_method_id;
          }

        }
      }
    }, 500);




  }

  SameAsMyDetails() {
    if (!this.same_as_my_details) {

      if (this.user) {
        this.BillingNameFormControl = new FormControl(this.user.first_name + " " + this.user.last_name, [Validators.required]);
        this.BillingEmailFormControl = new FormControl(this.user.email, [Validators.required, Validators.email]);
        this.BillingPhoneNumberFormControl = new FormControl(this.user.mobile, [Validators.required, Validators.maxLength(10)]);

        if (this.same_as_billing_details) {
          this.RecipientNameFormControl = new FormControl({ value: '', disabled: !this.same_as_billing_details }, [Validators.required]);
          this.RecipientPhoneNumberFormControl = new FormControl({ value: '', disabled: !this.same_as_billing_details }, [Validators.required, Validators.maxLength(10)]);
        } else {
          this.RecipientNameFormControl = new FormControl({ value: this.BillingNameFormControl.value, disabled: !this.same_as_billing_details }, [Validators.required]);
          this.RecipientPhoneNumberFormControl = new FormControl({ value: this.BillingPhoneNumberFormControl.value, disabled: !this.same_as_billing_details }, [Validators.required, Validators.maxLength(10)]);
        }

      }

    } else {
      this.BillingNameFormControl = new FormControl('', [Validators.required]);
      this.BillingEmailFormControl = new FormControl('', [Validators.required, Validators.email]);
      this.BillingPhoneNumberFormControl = new FormControl('', [Validators.required, Validators.maxLength(10)]);

    }

  }
  select_delivery_address_method() {
    this.shiping_addres_selction = this.ShipingAddresSelctionCityFormControl.value;
    if (this.shiping_addres_selction == 'new') {
      this.selected_shipping_address_type_disable = false;
      this.selected_shipping_address_type = 'Home';
      this.ShippingAddressNameFormControl = new FormControl({ value: '', disabled: false }, [Validators.required]);
      this.ShippingAddressFormControl = new FormControl({ value: '', disabled: false }, [Validators.required]);
      this.ShippingStreetNameFormControl = new FormControl({ value: '', disabled: false }, [Validators.required]);
      this.ShippingCityFormControl = new FormControl({ value: '', disabled: false }, [Validators.required]);

      this.SetAsDefaultFormControl = new FormControl(false, [Validators.required]);
      this.setasdefault = false;


    } else {

      if (this.delivery_info) {
        this.selected_shipping_address_type = this.delivery_info.type;
        this.selected_shipping_address_type_disable = true;
        this.ShippingAddressNameFormControl = new FormControl({ value: this.delivery_info.name, disabled: true }, [Validators.required]);
        this.ShippingAddressFormControl = new FormControl({ value: this.delivery_info.shipping_address_no, disabled: true }, [Validators.required]);
        this.ShippingStreetNameFormControl = new FormControl({ value: this.delivery_info.shipping_address_street, disabled: true }, [Validators.required]);
        this.ShippingCityFormControl = new FormControl({ value: this.delivery_info.shipping_address_city, disabled: true }, [Validators.required]);
        this.SetAsDefaultFormControl = new FormControl(this.delivery_info.default, [Validators.required]);

        if (this.user?.delivery_info)
          if (this.user.delivery_info.length > 1) {
            this.setasdefault = false;
          }
          else {
            this.setasdefault = true;
          }
      }
    }

  }

  select_delivery_address() {

    if (this.user) {
      if (this.user.delivery_info)
        this.delivery_info = this.user.delivery_info[this.selected_delivery_info];
      this.select_delivery_address_method();
    }

  }

  SameAsBilling(value: boolean) {
    this.same_as_billing_details = (value);
    if (!this.same_as_billing_details) {
      this.RecipientNameFormControl = new FormControl({ value: '', disabled: false }, [Validators.required]);
      this.RecipientPhoneNumberFormControl = new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(10)]);
    } else {
      this.RecipientNameFormControl = new FormControl({ value: this.BillingNameFormControl.value, disabled: true }, [Validators.required]);
      this.RecipientPhoneNumberFormControl = new FormControl({ value: this.BillingPhoneNumberFormControl.value, disabled: true }, [Validators.required, Validators.maxLength(10)]);
    }

  }

  SetAsDefault() {

  }


}
