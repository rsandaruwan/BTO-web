import { Component, OnInit } from '@angular/core';
import { Testimonial } from 'src/app/models/testimonial';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  home_view = true;

  round_slider_item: any;
  testimonial_messages: any;
  round_slider_data: any;
  process_thead: any;
  rotation_count = 1;
  slider_active_number = 1;
  power = 2;
  read_more = false;
  testimonials: Array<Testimonial> = [
    { id: 1, type: "text", message: "When I travelled to Sri Lanka with my son, I discovered “back to origins” products, especially the yellow curry all in one mix. My son barely eats. Surprisingly, in Ravana Garden hotel, he ate the chicken curry and other veggies without reluctance. Then I noticed that most of the curries in the hotel used this yellow curry powder. He liked it because it isn't spicy (my son doesn't eat spicy food). My hotel research revealed that this all-in-one yellow curry powder is manufactured entirely of natural ingredients and contains no artificial flavors or preservatives, which I find encouraging. I promptly ordered a few packs and carried them to Australia where they are used in both my son's and our meals. This product created a happy mother. I highly recommend this curry powder and all Back to Origin products.", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu", resides: "Resides in Australia" },
    { id: 2, type: "text", message: "Back to origins is a fantastic range of sustainable, natural, authentic products. I've had the privilege of getting to know Rasika the founder, through Ravana Garden hotel, his passion for the planet and people is inspiring. It's wonderful to see this new aspect of the brand unravel since the pandemic changed the world. A very exciting range of unique spices.", img: "assets/images/testimanial/testimanial_2.webp", name: "Rebecca Woolford", resides: "Resides in UK" },
    { id: 3, type: "text", message: "These days it is quite difficult to trust the food items on shelves as there are allot of artificial preservatives added to prolong their shelf life. Back to Origins is one company that not only has very strict ethical sourcing standards but brings variety of great tasting household spices and other ingredients with no artificial preservatives. The flavour Back to Origins brings out in food, reminds me of the wonderful taste of food back in Sri Lanka when my parents & grandparents used only locally sourced fresh produce. Not only can we enjoy the same taste but we know that these foods do not contain any harmful ingredients. Food is medicine and that’s why I keep using Back to Origins products.", img: "assets/images/testimanial/testimanial_3.webp", name: "Varuna Gunatillake", resides: "Resides in Australia" },
    { id: 4, type: "video", message: "https://res.cloudinary.com/drh4ncfbh/video/upload/v1687145222/bto/Back_To_Origins__A_Sneak_Peek_dvvjnc.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu4", resides: "Resides in Australia" },
    { id: 5, type: "text", message: "When I travelled to Sri Lanka with my son, I discovered “back to origins” products, especially the yellow curry all in one mix. My son barely eats. Surprisingly, in Ravana Garden hotel, he ate the chicken curry and other veggies without reluctance. Then I noticed that most of the curries in the hotel used this yellow curry powder. He liked it because it isn't spicy (my son doesn't eat spicy food). My hotel research revealed that this all-in-one yellow curry powder is manufactured entirely of natural ingredients and contains no artificial flavors or preservatives, which I find encouraging. I promptly ordered a few packs and carried them to Australia where they are used in both my son's and our meals. This product created a happy mother. I highly recommend this curry powder and all Back to Origin products.", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu5", resides: "Resides in Australia" },
    { id: 6, type: "text", message: "When I travelled to Sri Lanka with my son, I discovered “back to origins” products, especially the yellow curry all in one mix. My son barely eats. Surprisingly, in Ravana Garden hotel, he ate the chicken curry and other veggies without reluctance. Then I noticed that most of the curries in the hotel used this yellow curry powder. He liked it because it isn't spicy (my son doesn't eat spicy food). My hotel research revealed that this all-in-one yellow curry powder is manufactured entirely of natural ingredients and contains no artificial flavors or preservatives, which I find encouraging. I promptly ordered a few packs and carried them to Australia where they are used in both my son's and our meals. This product created a happy mother. I highly recommend this curry powder and all Back to Origin products.", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu6", resides: "Resides in Australia" },
    { id: 7, type: "text", message: "When I travelled to Sri Lanka with my son, I discovered “back to origins” products, especially the yellow curry all in one mix. My son barely eats. Surprisingly, in Ravana Garden hotel, he ate the chicken curry and other veggies without reluctance. Then I noticed that most of the curries in the hotel used this yellow curry powder. He liked it because it isn't spicy (my son doesn't eat spicy food). My hotel research revealed that this all-in-one yellow curry powder is manufactured entirely of natural ingredients and contains no artificial flavors or preservatives, which I find encouraging. I promptly ordered a few packs and carried them to Australia where they are used in both my son's and our meals. This product created a happy mother. I highly recommend this curry powder and all Back to Origin products.", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu7", resides: "Resides in Australia" },
    { id: 8, type: "video", message: "https://res.cloudinary.com/drh4ncfbh/video/upload/v1687145222/bto/Back_To_Origins__A_Sneak_Peek_dvvjnc.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu8", resides: "Resides in Australia" },
    { id: 9, type: "video", message: "https://res.cloudinary.com/drh4ncfbh/video/upload/v1687145222/bto/Back_To_Origins__A_Sneak_Peek_dvvjnc.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu9", resides: "Resides in Australia" },
    { id: 10, type: "video", message: "https://res.cloudinary.com/drh4ncfbh/video/upload/v1687145222/bto/Back_To_Origins__A_Sneak_Peek_dvvjnc.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu10", resides: "Resides in Australia" },
    { id: 11, type: "video", message: "https://res.cloudinary.com/drh4ncfbh/video/upload/v1687145222/bto/Back_To_Origins__A_Sneak_Peek_dvvjnc.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu11", resides: "Resides in Australia" },
    { id: 12, type: "video", message: "https://res.cloudinary.com/drh4ncfbh/video/upload/v1687145222/bto/Back_To_Origins__A_Sneak_Peek_dvvjnc.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu12", resides: "Resides in Australia" },
    { id: 13, type: "video", message: "https://res.cloudinary.com/drh4ncfbh/video/upload/v1687145222/bto/Back_To_Origins__A_Sneak_Peek_dvvjnc.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu13", resides: "Resides in Australia" },
    { id: 14, type: "video", message: "https://res.cloudinary.com/drh4ncfbh/video/upload/v1687145222/bto/Back_To_Origins__A_Sneak_Peek_dvvjnc.mp4", img: "assets/images/testimanial/testimanial_1.webp", name: "Kanishka Menu14", resides: "Resides in Australia" },


  ];


  constructor() { }
  current_section = 1;

 


  ngOnInit(): void {
 
  }

 

  ngAfterViewInit(): void {
   


  

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
    var our_concept = document.getElementById('our_concept');
    if (our_concept) {
      our_concept_video = our_concept.getElementsByTagName('video')[0]
      if (our_concept_video)
        our_concept_video.play();
      our_concept_video.muted = true;
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
  video_play = false;
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
       if(this.testimonials[index]){
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


  read_more_testimonial_para = 0

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

 
}
