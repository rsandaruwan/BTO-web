import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/services/application.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-cart-comming-soon',
  templateUrl: './cart-comming-soon.component.html',
  styleUrls: ['./cart-comming-soon.component.scss']
})
export class CartCommingSoonComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  messageFormControl = new FormControl('', [Validators.required]);

  errors: any = [];
  router: any;
  constructor(private applicationService: ApplicationService, private toastr: ToastrService,private dialogRef: MatDialogRef<CartCommingSoonComponent>, private tokenStorage: TokenStorageService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }
  sendMail() {
    var email = this.emailFormControl.value.trim();
    var name = "Product Request";
    var message = this.messageFormControl.value;
    if (email && name && message) {
      const data = {
        "email": email,
        "name": name,
        "message": message
      }
      this.applicationService.post(data, '', "contact/save-contact-us", "").then((response: any) => {
        this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
        this.messageFormControl = new FormControl('', [Validators.required]);
        this.toastr.success(response.message , 'Success');
        this.dialogRef.close();
      }).catch((error: any) => {
        console.log(error)
        this.errors = []
        if (error.status == 403) {
          this.router.navigate(['activate-account']);
        } else if (error.status == 422) {
          error.error.detail.map((errorData: any) => {
            this.errors[errorData.loc[1]] = errorData.msg
          });
        } else if (error.status == 401) {

          this.errors['password'] = error.error.msg

        }
        else {
          this.toastr.error(error.error.detail.result, 'Error');
        }
      })
    }else{
      this.toastr.error("Fill All Required Fields", 'Error');
    }

  }
}
