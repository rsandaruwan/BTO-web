import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserInterface } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  user: UserInterface | undefined;

  selected = new FormControl('mr', [Validators.required]);
  countryCode = new FormControl('+45', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('');
  mobileNumberFormControl = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  birthdayFormControl = new FormControl('',);

  constructor(private tokenStorage: TokenStorageService) {
    this.user = tokenStorage.getUser()
  }

  ngOnInit(): void {
    if (this.user) {
      this.selected = new FormControl('mr', [Validators.required]);
      this.countryCode = new FormControl(this.user.country_code, [Validators.required]);
      this.firstNameFormControl = new FormControl(this.user.first_name, [Validators.required]);
      this.lastNameFormControl = new FormControl(this.user.last_name);
      this.mobileNumberFormControl = new FormControl(this.user.mobile, [Validators.required, Validators.maxLength(10)]);
      this.emailFormControl = new FormControl(this.user.email, [Validators.required, Validators.email]);
      this.birthdayFormControl = new FormControl(this.user.birth_day,);
    }
  }

}
