import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import * as moment from 'moment';
import { UserInterface } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('step1') step1: ElementRef | any;
  @ViewChild('step2') step2: ElementRef | any;
  selected = new FormControl('mr', [Validators.required]);
  countryCode = new FormControl('+45', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('');
  mobileNumberFormControl = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  birthdayFormControl = new FormControl('',);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirm_passwordFormControl = new FormControl('', [Validators.required]);
  verification_codeFormControl = new FormControl('', [Validators.required]);
  remember = false;
  errors: any = [];
  router: any;
  path:string | undefined;
  is_register:boolean ;
  user: UserInterface | undefined;
  constructor(private route: ActivatedRoute,private applicationService: ApplicationService, private toastr: ToastrService, private tokenStorage: TokenStorageService,router: Router) {
    this.router = router;
   this.path=route.snapshot.routeConfig?.path;

   
   if(this.path=='register'){
    this.is_register=true;
   }else{
    this.is_register=false;
   }
  }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  //  this.step2.nativeElement.classList.add('d-none');
  }

  register() {
    var pw = this.passwordFormControl.value;
    var title = this.selected.value;
    var email = this.emailFormControl.value;
    var country_code = this.countryCode.value;
    var first_name = this.firstNameFormControl.value;
    var last_name = this.lastNameFormControl.value;
    var mobile = this.mobileNumberFormControl.value;
    var b_day = moment(this.birthdayFormControl.value).format("YYYY-MM-DD");
    var cpw = this.confirm_passwordFormControl.value;
    if (first_name && email && mobile && pw) {


    if (pw === cpw) {
      var data = {
        first_name: first_name,
        last_name: last_name,
        otp_request: "email",
        mobile: mobile,
        email: email,
        country_code: country_code,
        birth_day: b_day,
        nic_number: "199626503260",
        password: pw
      }
      this.applicationService.post(data, '', "user/register", "").then((response: any) => {

        this.user = response.result;
        this.step1.nativeElement.classList.add('d-none');
        this.step2.nativeElement.classList.remove('d-none');

      }).catch((error: any) => {
        console.log(error)
        this.errors = []
        if (error.status == 403) {
         this.router.navigate(['activate-account']);
        } else if (error.status == 422) {
          error.error.detail.map((errorData: any) => {
            this.errors[errorData.loc[1]] = errorData.msg
          });
        } else {
          this.toastr.error(error.error.detail.result, 'Error');
        }
      })
    } else {
      this.confirm_passwordFormControl = new FormControl('', [Validators.required]);
      this.errors['c_password'] = "Password Not Matched"
    }
    } else {
    }


  }
  resend() {
    var data = {
      registered_email: this.user?.email
    }
    this.applicationService.post(data, '', "user/resend-activation-email", "").then((response: any) => {

      console.log('resend-activation-email response');
      console.log(response);

    }).catch((error: any) => {
      console.log(error)
      this.errors = []
      if (error.status == 403) {
        // this.router.navigate(['activate-account']);
      } else if (error.status == 422) {
        error.error.detail.map((errorData: any) => {
          this.errors[errorData.loc[1]] = errorData.msg
        });
      } else {
        this.toastr.error(error.error.detail.result, 'Error');
      }
    })
  }
  verify() {
    var data = {
      username: this.user?.email,
      code: this.verification_codeFormControl.value
    }
    this.applicationService.post(data, '', "user/activate", "").then((response: any) => {

      console.log('verification');
      console.log(response);
      this.user = response.result;
      if (this.user) {
        this.tokenStorage.saveUser(this.user);
        this.tokenStorage.saveToken(this.user.token);
        this.router.navigate(['/'])
      }
    }).catch((error: any) => {
      console.log('  verification  error')
      console.log(error)
      this.errors = []
      if (error.status == 403) {
        this.router.navigate(['activate-account']);
        this.toastr.error(error.error.detail.result, 'Error');
      } else if (error.status == 422) {
        error.error.detail.map((errorData: any) => {
          this.errors[errorData.loc[1]] = errorData.msg
        });
      } else if (error.status == 404) {
          this.errors['activation_code'] = error.error.message
          
     
      }
      else {
        this.toastr.error(error.error.detail.result, 'Error');
      }
    })
  }

}
