import { Component, ElementRef, OnInit, HostListener, AfterViewInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
;
@Component({
  selector: 'app-about-us-new',
  templateUrl: './about-us-new.component.html',
  styleUrls: ['./about-us-new.component.scss']
})
export class AboutUsNewComponent implements OnInit, AfterViewInit {
  @ViewChildren('page') pages: QueryList<ElementRef> | any;
  @ViewChild('side_nav') side_nav: SideNavComponent | any;
  @ViewChild('scroll_btn') scroll_btn: ElementRef | any;
  credentials_active = false;
  current_section = 1;
  data: any;
  home_view = true;
  items = [
    { name: "About Us", tag: "about_us", id: 1, active: true, children: [] },
    { name: "Credentials", tag: "credentials", id: 2, active: false, children: [] },
    { name: "Ravana Garden", tag: "ravana_garden", id: 3, active: false, children: [] },
    { name: "Footer", tag: "footer", id: 4, active: false, children: [] },
  ];
  selected_section_text = this.items[0].name;
  index = 0;

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          var element = entry.target;
          console.log(element);
          if (this.pages) {


            this.items.forEach(page => {
              if (page.tag === element.id) {
  this.current_section = page.id;
                this.side_nav.activate(page.id);
                this.selected_section_text = page.name;

                if (page.tag == 'home' || page.tag == 'footer') {
                  this.home_view = true;
                  if (page.tag == 'footer') {
                    this.scroll_btn.nativeElement.classList.remove('scroll_btn_down');
                    this.scroll_btn.nativeElement.classList.add('upside_down');
                    this.scroll_btn.nativeElement.classList.add('upside_down_up');
                  }
                } else {
                  this.home_view = false;
                  this.scroll_btn.nativeElement.classList.add('scroll_btn_down');
                  this.scroll_btn.nativeElement.classList.remove('upside_down');
                  this.scroll_btn.nativeElement.classList.remove('upside_down_up');

                }


                if (page.tag == 'credentials') {
                  this.credentials_active = true;
                } else {
                  this.credentials_active = false;
                }
              }

            });


          }

        }
      })
    }, { threshold: 0.1 }
  )

  constructor(route: ActivatedRoute) {
    this.data = route.snapshot.paramMap.get('data');
    console.log(this.data);
  }

  ngOnInit(): void {
    this.selected_section_text = this.items[0].name;
  }

  ngAfterViewInit(): void {
    var width = window.innerWidth;
    if (width > 980) {
      var page = document.querySelectorAll(".page");
      page.forEach((secs: Element) => {
        this.observer.observe(secs)
      });
    }
    if (this.data) {
      setTimeout(() => {
        this.pages?.toArray()[1].nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
     
    } else {
      this.pages?.toArray()[0].nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

  }
  getId(): number {
    if (this.current_section == this.items.length) {
      return this.current_section - 1;
    } else {
      return 0
    }
  }
  toNext() {
    // if(this.current_section==this.items.length){
    // this.toview(this.items[this.items.length-2 ]);
    // this.current_section=this.items.length-2 ;
    // }else{
    //   this.toview(this.items[this.current_section]);
    // }
  }

  toview(id: number) {
    this.index = (id - 2);
  }

}
