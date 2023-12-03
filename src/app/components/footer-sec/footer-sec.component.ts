import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-footer-sec',
  templateUrl: './footer-sec.component.html',
  styleUrls: ['./footer-sec.component.scss']
})
export class FooterSecComponent implements OnInit {
  router: any
  constructor(router: Router, private tokenStorage: TokenStorageService) {
    this.router = router;
  }

  ngOnInit(): void {
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
}
