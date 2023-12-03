import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, HostListener, AfterViewInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
import { SideNaveItemInterface } from 'src/app/models/side_nav_item';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChildren('page') pages: QueryList<ElementRef> | any;
  @ViewChild('side_nav') side_nav: SideNavComponent | any;
  @ViewChild('scroll_btn') scroll_btn: ElementRef | any;
  items = [
    { name: "Home", tag: 'home', id: 1, active: true, children: [] },
    { name: "Our Credentials", tag: 'our_credentials', id: 2, active: false, children: [] },
    { name: "Testimonials", tag: 'testimonials', id: 3, active: false, children: [] },
    { name: "Our Concept", tag: 'our_concept', id: 4, active: false, children: [] },
    { name: "Footer", tag: 'footer', id: 5, active: false, children: [] }
  ];
  selected_section_text = this.items[0].name;
  current_section = 1;
  index = 0;

 

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    // this.breakpointObserver.observe([Breakpoints.XLarge])
    //   .subscribe(result => {
    //     this.isBigScreen = result.matches;
    //   });
  }


  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          var element = entry.target;
          if (this.pages) {

            this.items.forEach(page => {
              if (page.tag === element.id) {
                this.current_section = page.id;
                if (page.tag == 'home' || page.tag == 'footer') {
                  if (page.tag == 'footer') {
                    this.scroll_btn.nativeElement.classList.remove('scroll_btn_down');
                    this.scroll_btn.nativeElement.classList.add('upside_down');
                    this.scroll_btn.nativeElement.classList.add('upside_down_up');
                  }
                } else {
                  this.scroll_btn.nativeElement.classList.add('scroll_btn_down');
                  this.scroll_btn.nativeElement.classList.remove('upside_down');
                  this.scroll_btn.nativeElement.classList.remove('upside_down_up');

                }
               

                this.side_nav.activate(page.id);
                this.selected_section_text = page.name;
              }
            });

          }


        }
      })
    }, { threshold: 0.1 }
  )


  ngOnInit(): void {
    this.selected_section_text = this.items[0].name;

  
  }
  //Floating button click
  toNext() {
    // if(this.current_section==this.items.length){
    // this.toview(this.items[this.items.length-2 ]);
    // this.current_section=this.items.length-2 ;
    // }else{
    //   this.toview(this.items[this.current_section]);
    // }
  }
  getId(): number {
    if (this.current_section == this.items.length) {
      return this.current_section - 1;
    } else {
      return 0
    }
  }

  ngAfterViewInit(): void {

    var width = window.innerWidth;
    if (width > 980) {
      var page = document.querySelectorAll(".page");
      page.forEach((secs: Element) => {
        this.observer.observe(secs)
      });
    }


    setTimeout(() => {
      this.pages?.toArray()[0].nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 1000);

 

    // Testimonial
   
 


    setTimeout(() => {
      let iframe = document.getElementById('instagram-embed-0') as HTMLElement;


    }, 5000);

    var our_concept_video: HTMLVideoElement;
    var our_concept_video1: HTMLVideoElement;
    var our_concept = document.getElementById('our_concept');
    if (our_concept) {
      our_concept_video = our_concept.getElementsByTagName('video')[0]
      our_concept_video1 = our_concept.getElementsByTagName('video')[1]
      if (our_concept_video && our_concept_video1)
        our_concept_video.play();
      our_concept_video.muted = true;
      our_concept_video1.play();
      our_concept_video1.muted = true;
    }


  }


  // featured_products_setup() {
  //   var fp_items = document.getElementsByClassName('fpitem');
  //   var delta_d = 360 / (fp_items.length + 1);
  //   var start_point = 180;


  //   var individual_items = document.getElementsByClassName('individual_item');
  //   var fproducts_curcle = (document.getElementsByClassName('fproducts_curcle')[0] as HTMLElement);
  //   fproducts_curcle.style.rotate = start_point + "deg";

  //   var fp_deg = 0;
  //   for (let index = 0; index < fp_items.length + 1; index++) {
  //     const element_data = (individual_items[index] as HTMLElement)
  //     const element = (fp_items[index] as HTMLElement)
  //     fp_deg = fp_deg + delta_d;
  //     if (element) { element.style.rotate = fp_deg + "deg"; }
  //     element_data.style.rotate = (180 - (fp_deg) + delta_d) + "deg";
  //   }
  //   (individual_items[0] as HTMLElement).style.rotate = "0deg";
  // }
  home_volume = false;
  home_vol() {
    var vid = <HTMLVideoElement>document.querySelectorAll('.homeVideo')[0];
    var vol = document.getElementById('volume-change');

    if (vid && vol) {
      if (this.home_volume) {
        vid.muted = true;
        vol.innerHTML = "volume_off";
        this.home_volume = false;
      } else {
        vid.muted = false;
        vol.innerHTML = "volume_up";
        this.home_volume = true;
      }
    }
  }






  toview(i: SideNaveItemInterface) {
    if (this.pages) {
      var pages_array = this.pages.toArray();

      pages_array.forEach((element:any) => {
        if (element.nativeElement.id === i.tag) {
          element.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      });

    }
  }

  read_more_testimonial_para = 0


}
