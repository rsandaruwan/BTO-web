import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { InstagramInterface } from 'src/app/models/instagramdata';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  instagram_data:InstagramInterface|undefined;
  constructor( sharedService: SharedService) {
    setTimeout(() => {
      this.instagram_data=<InstagramInterface>sharedService.data;

      console.log("footer", this.instagram_data);
      
    }, 3000);
  }

  ngOnInit(): void {
  }

}
