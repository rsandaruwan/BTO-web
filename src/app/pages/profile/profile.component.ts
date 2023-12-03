import { Component, AfterViewInit, ViewChildren, ViewChild, QueryList, ElementRef, HostListener } from '@angular/core';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
import { InstagramInterface } from 'src/app/models/instagramdata';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {
  @ViewChildren('page') pages: QueryList<ElementRef> | any;
  @ViewChild('side_nav') side_nav: SideNavComponent | any;
  @ViewChild('scroll_btn') scroll_btn: ElementRef | any;

  items = [
    { name: "My Profile",tag:"", id: 1, active: true, children: [] },
    { name: "Shipping Details",tag:"", id: 2, active: false, children: [] },
    { name: "Change Password",tag:"", id: 3, active: false, children: [] },
    { name: "Saved Carts",tag:"", id: 4, active: false, children: [] },
    { name: "Past Orders",tag:"", id: 5, active: false, children: [] },
    { name: "Track My Order",tag:"", id: 6, active: false, children: [] },
  ];

  selected_section_text = this.items[0].name;
  instagram_data: InstagramInterface | undefined;
  in_footer = false;

  constructor(sharedService: SharedService) {
    setTimeout(() => {
      this.instagram_data = <InstagramInterface>sharedService.data;
    }, 3000);
  }
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          var element = entry.target;





          if (element.id == "instagram_feed") {
            this.in_footer = true;
            this.scroll_btn.nativeElement.classList = "scroll_btn upside_down d-none d-md-block";
          } else {
            this.in_footer = false;
            this.scroll_btn.nativeElement.classList = "scroll_btn  d-none d-md-block";
          }


        }
      })
    }, { threshold: 0.1 }
  )
  ngAfterViewInit(): void {
    var width = window.innerWidth;
    if (width > 980) {
      var page = document.querySelectorAll(".page");
      page.forEach((secs: Element) => {
        this.observer.observe(secs)
      });
    }
  }























  index = 0;
  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent | any) {
    var width = window.innerWidth;
    if (width > 765) {
      let delta = 0;
      if (event['wheelDelta']) {
        delta = event['wheelDelta'];
      }
      const timeNow = new Date().getTime();

      // if (
      //   timeNow - this.lastAnimation < this.idlePeriod + this.animationDuration
      // ) {
      //   event.preventDefault();
      //   return;
      // }

      if (delta < 0) {
        setTimeout(() => {
          this.clickNext();
          //   this.clickNext();
          //   // this.ingredient_img_img = "ingredient_img_img";
        }, 800);




      } else {
        setTimeout(() => {
          this.clickPrev();
          //   this.clickNext();
          //   // this.ingredient_img_img = "ingredient_img_img";
        }, 800);



      }

      // this.lastAnimation = timeNow;
    }

  }
  clickPrev() {

    this.selected_section_text = this.items[this.index - 1].name;
    if (this.index <= (this.pages.length - 1)) {
      if (this.index < 0) { return; }
      // this.togglePageContent(this.index, 'hide');
      this.index--;

      this.pages.forEach((page: { nativeElement: { scrollIntoView: (arg0: { behavior: string; }) => void; }; }, i: number) => {
        if (i === this.index) {
          // this.togglePageContent(i, 'show');
          page.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
      this.side_nav.activate(this.index + 1)
    }
  }
  clickNext() {
    this.selected_section_text = this.items[this.index + 1].name;
    if (this.index < (this.pages.length - 1)) {
      if (this.index > 4) return;
      // this.togglePageContent(this.index, 'hide');
      this.index++;
      this.pages.forEach((page: { nativeElement: { scrollIntoView: (arg0: { behavior: string; }) => void; }; }, i: number) => {
        if (i === this.index) {
          // this.togglePageContent(i, 'show');
          page.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
      this.side_nav.activate(this.index + 1)
    }

  }
  toview(id: number) {
    this.index = (id - 2);
    this.clickNext();
  }
  scrollbtnclick() {
    if (this.in_footer) {
      this.clickPrev();
    } else {
      this.clickNext();
    }
  }
}
