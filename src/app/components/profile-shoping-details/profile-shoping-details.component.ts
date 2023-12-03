import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DeliveryInfoInterface } from 'src/app/models/delivery_info.model';
import { UserInterface } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile-shoping-details',
  templateUrl: './profile-shoping-details.component.html',
  styleUrls: ['./profile-shoping-details.component.scss']
})
export class ProfileShopingDetailsComponent implements AfterViewInit {
  @ViewChild('def_header') def_header: ElementRef | any;
  @ViewChild('add_new_header') add_new_header: ElementRef | any;
  @ViewChild('def_body') def_body: ElementRef | any;
  @ViewChild('add_new_body') add_new_body: ElementRef | any;
  @ViewChild('edit_new_body') edit_new_body: ElementRef | any;
  user: UserInterface | undefined;
  delivery_infoArr: Array<DeliveryInfoInterface> | undefined;
  editing_address: DeliveryInfoInterface | undefined;

  newAddressFormControl = new FormControl('', [Validators.required]);
  newStreetNameFormControl = new FormControl('', [Validators.required]);
  newCityFormControl = new FormControl('', [Validators.required]);
  newDefFormControl=false;

  editAddressFormControl = new FormControl('', [Validators.required]);
  editStreetNameFormControl = new FormControl('', [Validators.required]);
  editCityFormControl = new FormControl('', [Validators.required]);
  editDeffFormControl=false;


  constructor(private tokenStorage: TokenStorageService) {
    this.user = tokenStorage.getUser();
    if (this.user) {
      this.delivery_infoArr = this.user.delivery_info;
    }
  }

  ngAfterViewInit(): void {
    this.editing_address = undefined;
    if (this.add_new_body && this.add_new_header) {
      this.add_new_body.nativeElement.style.display = 'none';
      this.add_new_header.nativeElement.style.display = 'none';
      this.def_body.nativeElement.style.display = 'block';
      this.def_header.nativeElement.style.display = 'grid';
      this.edit_new_body.nativeElement.style.display = 'none';
    }
  }

  ngOnInit(): void {
    if(!this.delivery_infoArr){
      this.add_view();
      this.newDefFormControl=true;
    }

  }

  editNewView(id: number) {
    if (this.delivery_infoArr)
      this.editing_address = this.delivery_infoArr[id];
      if(this.editing_address){
        this.editAddressFormControl = new FormControl(this.editing_address.shipping_address_no, [Validators.required]);
        this.editStreetNameFormControl = new FormControl(this.editing_address.shipping_address_street, [Validators.required]);
        this.editCityFormControl = new FormControl(this.editing_address.shipping_address_city, [Validators.required]);
      }
      
    if (this.edit_new_body && this.add_new_header) {
      this.edit_new_body.nativeElement.style.display = 'block';
      this.add_new_header.nativeElement.style.display = 'grid';
      this.def_body.nativeElement.style.display = 'none';
      this.def_header.nativeElement.style.display = 'none';
    }
  }

  cancel_edit_new_view() {
    this.ngAfterViewInit();

    this.newAddressFormControl = new FormControl('', [Validators.required]);
    this.newStreetNameFormControl = new FormControl('', [Validators.required]);
    this.newCityFormControl = new FormControl('', [Validators.required]);
    this.editAddressFormControl = new FormControl('', [Validators.required]);
    this.editStreetNameFormControl = new FormControl('', [Validators.required]);
    this.editCityFormControl = new FormControl('', [Validators.required]);
  }

  add_view() {


    if (this.add_new_body && this.add_new_header) {
      this.add_new_body.nativeElement.style.display = 'block';
      this.add_new_header.nativeElement.style.display = 'grid';
      this.def_body.nativeElement.style.display = 'none';
      this.def_header.nativeElement.style.display = 'none';
    }
  }
  cancel_add_view() {

    this.edit_new_body.nativeElement.style.display = 'none'

  }

}
