import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/services/application.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  remember_me_checked = new FormControl('');
  remember=false;
  errors: any = [];
  router: any;
  userToken: string | undefined;
  hide = true;
  hide1 = true;
  hide2 = true;
  constructor(private applicationService: ApplicationService, private toastr: ToastrService  , private tokenStorage: TokenStorageService,router: Router) {
    this.router = router;
   }

  ngOnInit(): void {
  }
  login(){
    const data = {
      "username": this.emailFormControl.value.trim(),
      "password": this.passwordFormControl.value
    }
    this.applicationService.post(data, '', "user/login", "").then((response: any) => {

      this.userToken = response.token;
        this.tokenStorage.saveUser(response.result);
        this.tokenStorage.saveToken(response.token);
        if(this.remember_me_checked.value){
          this.tokenStorage.saveRememberMe(data);
         }else{
          this.tokenStorage.removeRememberMe();
         }
         this.router.navigate(['/']);
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
  }

}
