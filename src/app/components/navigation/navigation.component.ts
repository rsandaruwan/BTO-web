import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryInterface } from 'src/app/models/category';
import { SubCategoryInterface } from 'src/app/models/subcategory';
import { UserInterface } from 'src/app/models/user.model';
import { ApplicationService } from 'src/app/services/application.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

interface Region {
  flag: string;
  name: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() cart_qty!: number;
  @ViewChild('nav') navbar!: ElementRef;
  router: any;
  user:UserInterface | undefined;
  allcategory: Array<CategoryInterface> = [];
  subcategory: Array<SubCategoryInterface> = [];
  constructor(router: Router, private tokenStorage: TokenStorageService,private applicationService: ApplicationService) {
    this.router = router;
  }
  selectedValue: string | undefined;


  regions: Region[] = [
    {flag: '../../../assets/images/srilanka.png', name: 'Sri Lanka'},
    {flag: '../../../assets/images/uk.png', name: 'United Kingdom'},
    {flag: '../../../assets/images/aus.png', name: 'Australia'},
  ];


  ngOnInit(): void {
    this.getAllCategory();
    this.getAllSubCategory();
    this.user=this.tokenStorage.getUser();
  }
  navigate(path: string) {
    var data = "";
    if (!path) {
      path = '';
    }
    var our_credentials = false;
    if (path == 'our_credentials') {
      path = '/about-us'
      our_credentials = true
      data = "credentials";
    } else if (path == 'profile') {
      if (this.tokenStorage.getUser()) {

        console.log(this.tokenStorage.getUser())
      } else {
        path = 'login'
      }
    }
    var link = ['/' + path];
    if (data) {
      link = ['/' + path, data];

    }
    this.router.navigate(link)
      .then(() => {

        if ((path == '') || (path == 'about-us')) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
  }
  navigate1(value: string) {
    var data = "";
    if (value) {
      var data = value;
    }
   
    var link = ['/products' ];
    if (data) {
      link = ['/products' , data];

    }
    this.router.navigate(link)
      .then(() => {

       
          window.location.reload();
       
      });
  }

  toggle = true;
  menu_click() {

    if (this.navbar.nativeElement) {
      if (this.toggle) {
        this.navbar.nativeElement.classList.add('navbar_click_border');
        this.toggle = false;
      } else {
        this.navbar.nativeElement.classList.remove('navbar_click_border');
        this.toggle = true;
      }

    }
  }

   //GET ALL Category
   getAllCategory() {
    this.applicationService.get("", `category/view`, "").then((response: any) => {
      if (response.result) {
        this.allcategory = response.result;
      }

    }).catch((error: any) => {
    })
  }
  getAllSubCategory() {
    this.applicationService.get("", `sub-category/view`, "").then((response: any) => {
      if (response.result) {
        this.subcategory = response.result;
      }

    }).catch((error: any) => {
    })
  }
  signout(){
    this.tokenStorage.signOut();
    this.router.navigate(['/']).then(() => {

       
      window.location.reload();
   
  });
  }
}
