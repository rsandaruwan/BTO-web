import { Component, ElementRef, OnInit, AfterViewInit, QueryList, ViewChild, ViewChildren, HostBinding } from '@angular/core';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
import { SideNaveItemInterface } from 'src/app/models/side_nav_item';
import { Testimonial } from 'src/app/models/testimonial';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AboutUsIconInterface } from 'src/app/models/about_us_icons';
import { MatDialog } from '@angular/material/dialog';
import { VideoFullComponent } from 'src/app/components/popups/video-full/video-full.component';
@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.scss']
})
export class HomeNewComponent implements OnInit, AfterViewInit {
  @ViewChildren('page') pages: QueryList<ElementRef> | undefined;
  @ViewChild('side_nav') side_nav: SideNavComponent | any;
  @ViewChild('side_nav') side_nav1: ElementRef | any;
  @ViewChild('scroll_btn') scroll_btn: ElementRef | any;

  credentials_active = false;
  view_cover = true;
  view_content = false;
  items = [
    { name: "Home", tag: 'home', id: 1, active: true, children: [] },
    { name: "Our Credentials", tag: 'our_credentials', id: 2, active: false, children: [] },
    { name: "Testimonials", tag: 'testimonials', id: 3, active: false, children: [] },
    { name: "Our Concept", tag: 'our_concept', id: 4, active: false, children: [] },
    { name: "Footer", tag: 'footer', id: 5, active: false, children: [] }
  ];
  selected_section_text = "";
  home_view = true;
  concept_read_more = false;
  round_slider_item: any;
  testimonial_messages: any;
  round_slider_data: any;
  process_thead: any;
  rotation_count = 1;
  slider_active_number = 1;
  power = 2;
  hero_img: number = 1;
  read_more = false;
  testimonials: Array<Testimonial> = [
    { id: 1, type: "text", message: "When I travelled to Sri Lanka with my son, I discovered “back to origins” products, especially the yellow curry all in one mix. My son barely eats. Surprisingly, in Ravana Garden hotel, he ate the chicken curry and other veggies without reluctance. Then I noticed that most of the curries in the hotel used this yellow curry powder. He liked it because it isn't spicy (my son doesn't eat spicy food). My hotel research revealed that this all-in-one yellow curry powder is manufactured entirely of natural ingredients and contains no artificial flavors or preservatives, which I find encouraging. I promptly ordered a few packs and carried them to Australia where they are used in both my son's and our meals. This product created a happy mother. I highly recommend this curry powder and all Back to Origin products.", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu", resides: "Resides in Australia" },
    { id: 2, type: "text", message: "Back to origins is a fantastic range of sustainable, natural, authentic products. I've had the privilege of getting to know Rasika the founder, through Ravana Garden hotel, his passion for the planet and people is inspiring. It's wonderful to see this new aspect of the brand unravel since the pandemic changed the world. A very exciting range of unique spices.", img: "assets/images/testimanial/testimanial_2.webp", name: "Rebecca Woolford", resides: "Resides in UK" },
    { id: 3, type: "text", message: "These days it is quite difficult to trust the food items on shelves as there are allot of artificial preservatives added to prolong their shelf life. Back to Origins is one company that not only has very strict ethical sourcing standards but brings variety of great tasting household spices and other ingredients with no artificial preservatives. The flavour Back to Origins brings out in food, reminds me of the wonderful taste of food back in Sri Lanka when my parents & grandparents used only locally sourced fresh produce. Not only can we enjoy the same taste but we know that these foods do not contain any harmful ingredients. Food is medicine and that’s why I keep using Back to Origins products.", img: "assets/images/testimanial/testimanial_3.webp", name: "Varuna Gunatillake", resides: "Resides in Australia" },
    { id: 4, type: "text", message: "This range is so good. I've always wanted to make Sri Lankan cuisine at home but wasn't sure where to go for a natural, authentic range. Really, really impressed!", img: "assets/images/testimanial/testimanial_4.webp", name: "Vyen", resides: "Resides in Australia" },
    { id: 5, type: "text", message: "This is the easiest yellow curry I've ever cooked up! So smooth and comforting. I was amazed at how simple it is to make an authentic Sri-Lankan style curry in under 20 minutes.", img: "assets/images/testimanial/testimanial_5.webp", name: "Tiff", resides: "Resides in Australia" },
    { id: 6, type: "text", message: "When I travelled to Sri Lanka with my son, I discovered “back to origins” products, especially the yellow curry all in one mix. My son barely eats. Surprisingly, in Ravana Garden hotel, he ate the chicken curry and other veggies without reluctance. Then I noticed that most of the curries in the hotel used this yellow curry powder. He liked it because it isn't spicy (my son doesn't eat spicy food). My hotel research revealed that this all-in-one yellow curry powder is manufactured entirely of natural ingredients and contains no artificial flavors or preservatives, which I find encouraging. I promptly ordered a few packs and carried them to Australia where they are used in both my son's and our meals. This product created a happy mother. I highly recommend this curry powder and all Back to Origin products.", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu6", resides: "Resides in Australia" },
    { id: 7, type: "text", message: "Back to origins is a fantastic range of sustainable, natural, authentic products. I've had the privilege of getting to know Rasika the founder, through Ravana Garden hotel, his passion for the planet and people is inspiring. It's wonderful to see this new aspect of the brand unravel since the pandemic changed the world. A very exciting range of unique spices.", img: "assets/images/testimanial/testimanial_2.webp", name: "Rebecca Woolford", resides: "Resides in UK" },
    { id: 8, type: "text", message: "These days it is quite difficult to trust the food items on shelves as there are allot of artificial preservatives added to prolong their shelf life. Back to Origins is one company that not only has very strict ethical sourcing standards but brings variety of great tasting household spices and other ingredients with no artificial preservatives. The flavour Back to Origins brings out in food, reminds me of the wonderful taste of food back in Sri Lanka when my parents & grandparents used only locally sourced fresh produce. Not only can we enjoy the same taste but we know that these foods do not contain any harmful ingredients. Food is medicine and that’s why I keep using Back to Origins products.", img: "assets/images/testimanial/testimanial_3.webp", name: "Varuna Gunatillake", resides: "Resides in Australia" },
    { id: 9, type: "text", message: "This range is so good. I've always wanted to make Sri Lankan cuisine at home but wasn't sure where to go for a natural, authentic range. Really, really impressed!", img: "assets/images/testimanial/testimanial_4.webp", name: "Vyen", resides: "Resides in Australia" },
    { id: 10, type: "text", message: "This is the easiest yellow curry I've ever cooked up! So smooth and comforting. I was amazed at how simple it is to make an authentic Sri-Lankan style curry in under 20 minutes.", img: "assets/images/testimanial/testimanial_5.webp", name: "Tiff", resides: "Resides in Australia" },
    { id: 11, type: "text", message: "These days it is quite difficult to trust the food items on shelves as there are allot of artificial preservatives added to prolong their shelf life. Back to Origins is one company that not only has very strict ethical sourcing standards but brings variety of great tasting household spices and other ingredients with no artificial preservatives. The flavour Back to Origins brings out in food, reminds me of the wonderful taste of food back in Sri Lanka when my parents & grandparents used only locally sourced fresh produce. Not only can we enjoy the same taste but we know that these foods do not contain any harmful ingredients. Food is medicine and that’s why I keep using Back to Origins products.", img: "assets/images/testimanial/testimanial_3.webp", name: "Varuna Gunatillake", resides: "Resides in Australia" },
    { id: 12, type: "text", message: "Back to origins is a fantastic range of sustainable, natural, authentic products. I've had the privilege of getting to know Rasika the founder, through Ravana Garden hotel, his passion for the planet and people is inspiring. It's wonderful to see this new aspect of the brand unravel since the pandemic changed the world. A very exciting range of unique spices.", img: "assets/images/testimanial/testimanial_2.webp", name: "Rebecca Woolford", resides: "Resides in UK" },
    { id: 13, type: "text", message: "When I travelled to Sri Lanka with my son, I discovered “back to origins” products, especially the yellow curry all in one mix. My son barely eats. Surprisingly, in Ravana Garden hotel, he ate the chicken curry and other veggies without reluctance. Then I noticed that most of the curries in the hotel used this yellow curry powder. He liked it because it isn't spicy (my son doesn't eat spicy food). My hotel research revealed that this all-in-one yellow curry powder is manufactured entirely of natural ingredients and contains no artificial flavors or preservatives, which I find encouraging. I promptly ordered a few packs and carried them to Australia where they are used in both my son's and our meals. This product created a happy mother. I highly recommend this curry powder and all Back to Origin products.", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu", resides: "Resides in Australia" },
    { id: 14, type: "text", message: "This is the easiest yellow curry I've ever cooked up! So smooth and comforting. I was amazed at how simple it is to make an authentic Sri-Lankan style curry in under 20 minutes.", img: "assets/images/testimanial/testimanial_5.webp", name: "Tiff", resides: "Resides in Australia" },
    // { id: 9, type: "video", message: "https://res.cloudinary.com/ambrum/video/upload/v1688638235/bto/Back_To_Origins__A_Sneak_Peek_x3zyin.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu9", resides: "Resides in Australia" },


  ];
  icons: Array<AboutUsIconInterface> = [
    { icon_id: 0, icon_name: "360° Sustainability, Netherlands", icon_image: "assets/images/icons/icon_1.webp", icon_description: "Sustainability means meeting our own needs without compromising the ability of future generations to meet their own needs. 360o Sustainability Certification considers almost all aspects of ecological, social and economic dimensions, recognizing that all must be considered together to find lasting prosperity. 360o Sustainability Certification provides guidelines to business entities to carry out their business and operational activities without an adverse effect on the environment and its stakeholders while enhancing profit generation. 360o Sustainability Certification, certified by Control Union Certifications of Netherlands is a framework developed by BTO itself, recognizing that we value sustainability above all. It displays Ravana Gardens’ commitments on maximizing social and economic benefits to the local community and minimizing negative impacts, energy management and net zero carbon emission,  conserving biodiversity, ecosystems and landscapes, solid waste management and pollution control,  water resource and wastewater management, and food quality and safety. We develop and promote sustainable products, and inspire others to join us on our sustainable journey, which we believe is the best way to protect our planet. Accordingly, we work together to reverse the alarming decline in our planet's overall environmental health." },
    { icon_id: 1, icon_name: "PLANT BASED, USA", icon_image: "assets/images/icons/icon_2.webp", icon_description: "The Plant-Based Certification Program is applicable at any step of the food industry, and it sets requirements for products and by-products from non-animal origins. All raw materials used by Back To Origins comply to the Plant-Based regulations and is certified by Control Union Certifications of North America." },
    { icon_id: 2, icon_name: "ISO 22000 : 2018", icon_image: "assets/images/icons/icon_3.webp", icon_description: "ISO 22000 sets out the requirements for a food safety management system and maps out what an organization needs to do to demonstrate its ability to control food safety hazards in order to ensure that food is safe. It can be used by any organization regardless of its size or position in the food chain. Back To Origins conforms to ISO 22000 : 2018 regulations in its processes and activities and is certified by TNV Certification Pvt Ltd. (accredited by United Accreditation Foundation)." },
    { icon_id: 3, icon_name: "HACCP", icon_image: "assets/images/icons/icon_4.webp", icon_description: "HACCP certification is a guarantee that your organization is producing and trading in safe food management practice. It is the globally identified method for identifying the food safety methods and eliminating the risk related to the safety of the food. All our processes conform to this global food safety management standard. TNV Certification Pvt. Ltd certifies our conformity to HACCP processes and activities." },
    { icon_id: 4, icon_name: "GOOD MANUFACTURING PRACTICE", icon_image: "assets/images/icons/icon_5.webp", icon_description: "Good manufacturing practices (GMP) are the practices required in order to conform to the guidelines recommended by agencies that control the authorization and licensing of the manufacture and sale of food. These guidelines provide minimum requirements that a manufacturer must meet to assure that their products are consistently high in quality, from batch to batch, for their intended use, and the main purpose of GMP is always to prevent harm from occurring to the end user. Our GMP certification is certified by TNV Certification Pvt. Ltd." },
    { icon_id: 5, icon_name: "Gluten-free", icon_image: "assets/images/icons/icon_6.webp", icon_description: "Gluten is a protein naturally found in some grains such as wheat, barley, rye etc. For some people, gluten can trigger severe autoimmune response (ex: Celiac disease) or other unpleasant symptoms. Back to Origins products such as Pure Ceylon Yellow Curry Powder, Ceylon Specialty Coffee with Traditional Herbs & Spices, Ceylon Eleven Spice Seasoning, Ceylon Aromatic All-Purpose Seasoning and Southern Coast Tamarind Spread are totally gluten-free. That is proven by laboratory tests (Test method: ELISA,R-biopharm RIDASCREEN R7001) conducted by Bureau Veritas." },
    { icon_id: 6, icon_name: "Made with Natural Ingredients", icon_image: "assets/images/icons/icon_7.webp", icon_description: "All our products are sustainably produced made with all natural ingredients based on plants with minimal impact to the environment, which is certified by Control Union Certifications of Netherland. Our main aim is to produce our products purely by the use of natural ingredients." },
    { icon_id: 7, icon_name: "No artificial flavors/ preservatives/ additives", icon_image: "assets/images/icons/icon_8.webp", icon_description: "We strictly follow a “No preservatives, additives, artificial flavor enhancers (MSGs) usage policy on our products which is certified by Control Union Certifications of Netherland. We strive to produce our products purely based on natural ingredients. Thereby we attempt to contribute to the health and wellness of our customers." },
  ];
  home_volume = false;
  video_play = false;
  read_more_testimonial_para = 0;
  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    // this.breakpointObserver.observe([Breakpoints.XLarge])
    //   .subscribe(result => {
    //     this.isBigScreen = result.matches;
    //   });
  }


  current_section = 1;

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
                if (page.tag == 'our_credentials') {
                  this.credentials_active = true;
                } else {
                  setTimeout(() => {
                    this.credentials_active = false;
                  }, 500);

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

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 720) {
      this.concept_read_more = false;
    }

    setTimeout(() => {
      this.view_cover = false;
    }, 5500);
    setTimeout(() => {
      var vid = <HTMLVideoElement>document.querySelectorAll('.homeVideo')[0];

      if (vid) {
        vid.muted = true;
        vid.play();


        vid.playbackRate = 0.5;
      }
      this.view_content = true;
      this.pages?.toArray()[0].nativeElement.scrollIntoView();
    }, 4000);
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

    setInterval(() => {
      this.CalHeroAnimation();
    }, 6000);

    // Testimonial
    this.testimonials_arraysetup();
    this.round_slider_item = document.getElementsByClassName('round_slider_item');
    this.testimonial_messages = document.getElementsByClassName('testimonial_message');
    this.round_slider_data = document.getElementsByClassName('item_data');
    var xr = 0;
    for (let index = 0; index < this.round_slider_item.length; index++) {
      const elementl = (this.round_slider_item[index] as HTMLElement)
      const elementl_data = (this.round_slider_data[index] as HTMLElement)
      elementl.style.rotate = xr + "deg";
      elementl_data.style.rotate = -xr + "deg";
      xr = xr + 25.71
    }

    this.testimonial_slider_select(2)
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
  CalHeroAnimation() {

    if (this.hero_img < 5) {
      this.hero_img++;
    } else {
      this.hero_img = 1;
    }
  }


 
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
  expan_video() {
    var vid = <HTMLVideoElement>document.querySelectorAll('.our_concept_video')[0];
    if (vid) {
      var wi = '50vw';
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (width < 720) {
        wi = '100vw';

      }

      this.dialog.open(VideoFullComponent, { width: wi, data: vid.src });
    }
  }
  testimonials_arraysetup() {
    var array = this.testimonials;
    let nextId = array.length + 1;
    let nextobject = array.length;

    if (array.length < 14) {
      while (array.length < 14) {

        var temp = array;
        var temp_new_obj: Testimonial = {
          message: "",
          id: -2,
          type: "",
          img: "",
          name: "",
          resides: ""
        }
        // var newobject = <Testimonial>temp[array.length - nextobject];
        // var temp_test = {
        //   id: nextId,
        //   message: newobject.message,
        //   img: newobject.img,
        //   name: newobject.name,
        //   resides: newobject.resides
        // };


        array[nextId - 1] = temp_new_obj;


        nextId++;
        if (nextobject == 1) {
          nextobject = this.testimonials.length;
        } else {
          nextobject--;
        }


      }
    }
    // } else if (array.length > 14) {
    //   array.splice(14, array.length - 14);
    // }
    this.testimonials = array;

  }

  // testimonial
  testimonial_slider_select(id: number) {
    if (id > 0) {
      var difference = this.slider_active_number - id;

      var change_number = 0;
      if (difference > 0) {
        if (difference > (2)) {
          if (difference == 13) {
            change_number = 3;
          } else {
            change_number = 4;
          }
        } else if (difference == 2) {
          change_number = 1;
        } else {
          change_number = 2;
        }
      } else if (difference < 0) {
        if (difference < (-2)) {

          if (difference == (-13)) {
            change_number = 2;
          } else {
            change_number = 1;
          }

        } else if (difference == (-2)) {
          change_number = 4;
        } else {
          change_number = 3;
        }
      }

      this.slider_active_number = id;
      var round_slider_parent = document.getElementById('round_slider_parent');
      if (round_slider_parent) {
        var deg = 1;
        if (round_slider_parent.style.rotate) {
          var t: any;
          t = (round_slider_parent.style.rotate.split("deg")[0]);
          deg = t / 1;
        }

        var deg_change = 0;
        switch (change_number) {
          case 1:
            deg_change = (2 * 25.71);
            deg = (deg + deg_change);
            if (this.rotation_count == 1) {
              this.rotation_count = 13;
            } else {
              this.rotation_count = this.rotation_count - 2;
            }
            break;

          case 2:
            deg_change = (25.71);
            deg = (deg + deg_change);


            if (this.rotation_count == 1) {
              this.rotation_count = 14;
            } else {
              this.rotation_count = this.rotation_count - 1;
            }

            break;

          case 3:
            deg_change = (-25.71);
            deg = (deg + deg_change);
            if (this.rotation_count == 14) {
              this.rotation_count = 1;
            } else {
              this.rotation_count = this.rotation_count + 1;
            }

            break;

          case 4:
            deg_change = (-2 * 25.71);
            deg = (deg + deg_change);
            if (this.rotation_count == 13) {
              this.rotation_count = 1;
            } else {
              this.rotation_count = this.rotation_count + 2;
            }

            break;

        }

        round_slider_parent.style.rotate = deg + "deg";
        this.activate_testimonial_slider()

        setTimeout(() => {
          for (let index = 0; index < this.round_slider_data.length; index++) {
            const element_data = (this.round_slider_data[index] as HTMLElement)
            var t: any;
            t = (element_data.style.rotate.split("deg")[0]);
            var item_deg = t / 1;
            element_data.style.rotate = ((item_deg - deg_change)) + "deg";
          }
        }, 100);
      }

    }
  }

  activate_testimonial_slider() {
    this.not_line_six(this.read_more_testimonial_para);
    for (let index = 0; index < (this.round_slider_item.length); index++) {
      const elementl = (this.round_slider_item[index] as HTMLElement)
      if (index == (this.slider_active_number - 1)) {
        elementl.className = "round_slider_item active"
        if (this.testimonials[index].type == 'text') {
          this.testimonial_messages[index].className = "testimonial_message active"
        } else {
          var video_element = this.testimonial_messages[index].querySelectorAll('.video_controler')[0];
          this.testimonial_messages[index].className = "testimonial_message testimonial_video active p-0"
          if (video_element) {
            video_element.classList.remove('d-none');
            this.video_play = false;
          }
        }

      } else {
        elementl.className = "round_slider_item ";
        if (this.testimonials[index].type == 'text') {
          this.testimonial_messages[index].className = "testimonial_message ";
        } else {
          var video_element = this.testimonial_messages[index].querySelectorAll('.video')[0];
          this.testimonial_messages[index].className = "testimonial_message p-0";
          if (video_element) {
            video_element.currentTime = 0;
            video_element.pause();
          }
        }
      }
    }
  }

  videoControl(id: number) {
    this.video_play = !this.video_play;
    var video_controller_element = document.getElementById('video_controler_' + id);

    var video_element = this.testimonial_messages[id - 1].querySelectorAll('.video')[0];
    if (video_controller_element && video_element) {
      var icon = video_controller_element.getElementsByTagName('mat-icon')[0];
      if (this.video_play) {
        icon.classList.add('d-none');
        video_element.play();
      } else {
        icon.classList.remove('d-none');
        video_element.pause();
      }
    }
  }

  toview(i: SideNaveItemInterface) {
    if (this.pages) {
      var pages_array = this.pages.toArray();

      pages_array.forEach(element => {
        if (element.nativeElement.id === i.tag) {
          element.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      });

    }
  }



  not_line_six(id: any) {

    var para = document.getElementById("testimonial_para_" + id);
    var para_btn = document.getElementById("read_more_testimonial_para_btn_" + id);


    if (para && para_btn) {
      if (this.read_more_testimonial_para == id) {
        this.read_more = false;
        para.classList.add('six_line');
        para_btn.innerHTML = "Read More"
        this.read_more_testimonial_para = 200;
        this.testimonial_messages[id - 1].className = "testimonial_message active ";
      } else {
        this.read_more = true;
        para.classList.remove("six_line");
        this.read_more_testimonial_para = id;
        para_btn.innerHTML = "Read Less";
        this.testimonial_messages[id - 1].className = "testimonial_message active pb-1";

      }

    }
  }
  stringCharacters(str: string) {
    if(window.innerWidth<500){
      if (str.length < 250) {
        return false;
      } else {
        return true;
      }
    }else{
      if (str.length < 650) {
        return false;
      } else {
        return true;
      }
    }
   

  }

  detectMob(): boolean {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
  ConceptReadMoreText = "Read More"
  ConceptReadMore() {

    if (this.concept_read_more) {
      this.ConceptReadMoreText = "Read More";
    } else {
      this.ConceptReadMoreText = "Read Less";
    }
    this.concept_read_more = !this.concept_read_more;
  }
}
