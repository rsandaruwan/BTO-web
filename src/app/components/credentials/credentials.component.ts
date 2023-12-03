import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AboutUsIconInterface } from 'src/app/models/about_us_icons';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  @ViewChild('credentials_content') credentials_content: ElementRef | any;
  @ViewChild('description') description: ElementRef | any;
  @ViewChild('readBtn') readBtn: ElementRef | any;
  
  @Input('is_active') is_active: boolean | undefined;
  icons: Array<AboutUsIconInterface> = [
    { icon_id: 0, icon_name: "360° Sustainability, Netherlands", icon_image: "assets/images/icons/icon_1.webp", icon_description: "Sustainability means meeting our own needs without compromising the ability of future generations to meet their own needs. 360o Sustainability Certification considers almost all aspects of ecological, social and economic dimensions, recognizing that all must be considered together to find lasting prosperity. 360o Sustainability Certification provides guidelines to business entities to carry out their business and operational activities without an adverse effect on the environment and its stakeholders while enhancing profit generation. 360o Sustainability Certification, certified by Control Union Certifications of Netherlands is a framework developed by BTO itself, recognizing that we value sustainability above all. It displays Ravana Gardens’ commitments on maximizing social and economic benefits to the local community and minimizing negative impacts, energy management and net zero carbon emission,  conserving biodiversity, ecosystems and landscapes, solid waste management and pollution control,  water resource and wastewater management, and food quality and safety. We develop and promote sustainable products, and inspire others to join us on our sustainable journey, which we believe is the best way to protect our planet. Accordingly, we work together to reverse the alarming decline in our planet's overall environmental health." },
    { icon_id: 1, icon_name: "PLANT BASED, USA", icon_image: "assets/images/icons/icon_2.webp", icon_description: "The Plant-Based Certification Program is applicable at any step of the food industry, and it sets requirements for products and by-products from non-animal origins. All raw materials used by Back To Origins comply to the Plant-Based regulations and is certified by Control Union Certifications of North America." },
    { icon_id: 2, icon_name: "Gluten-free", icon_image: "assets/images/icons/icon_6.webp", icon_description: "Gluten is a protein naturally found in some grains such as wheat, barley, rye etc. For some people, gluten can trigger severe autoimmune response (ex: Celiac disease) or other unpleasant symptoms. Back to Origins products such as Pure Ceylon Yellow Curry Powder, Ceylon Specialty Coffee with Traditional Herbs & Spices, Ceylon Eleven Spice Seasoning, Ceylon Aromatic All-Purpose Seasoning and Southern Coast Tamarind Spread are totally gluten-free. That is proven by laboratory tests (Test method: ELISA,R-biopharm RIDASCREEN R7001) conducted by Bureau Veritas." },
    { icon_id: 3, icon_name: "No artificial flavors/ preservatives/ additives", icon_image: "assets/images/icons/icon_8.webp", icon_description: "We strictly follow a “No preservatives, additives, artificial flavor enhancers (MSGs) usage policy on our products which is certified by Control Union Certifications of Netherland. We strive to produce our products purely based on natural ingredients. Thereby we attempt to contribute to the health and wellness of our customers." },
    { icon_id: 4, icon_name: "GOOD MANUFACTURING PRACTICE", icon_image: "assets/images/icons/icon_5.webp", icon_description: "Good manufacturing practices (GMP) are the practices required in order to conform to the guidelines recommended by agencies that control the authorization and licensing of the manufacture and sale of food. These guidelines provide minimum requirements that a manufacturer must meet to assure that their products are consistently high in quality, from batch to batch, for their intended use, and the main purpose of GMP is always to prevent harm from occurring to the end user. Our GMP certification is certified by TNV Certification Pvt. Ltd." },
    { icon_id: 5, icon_name: "ISO 22000 : 2018", icon_image: "assets/images/icons/icon_3.webp", icon_description: "ISO 22000 sets out the requirements for a food safety management system and maps out what an organization needs to do to demonstrate its ability to control food safety hazards in order to ensure that food is safe. It can be used by any organization regardless of its size or position in the food chain. Back To Origins conforms to ISO 22000 : 2018 regulations in its processes and activities and is certified by TNV Certification Pvt Ltd. (accredited by United Accreditation Foundation)." },
    { icon_id: 6, icon_name: "Made with Natural Ingredients", icon_image: "assets/images/icons/icon_7.webp", icon_description: "All our products are sustainably produced made with all natural ingredients based on plants with minimal impact to the environment, which is certified by Control Union Certifications of Netherland. Our main aim is to produce our products purely by the use of natural ingredients." },
    { icon_id: 7, icon_name: "HACCP", icon_image: "assets/images/icons/icon_4.webp", icon_description: "HACCP certification is a guarantee that your organization is producing and trading in safe food management practice. It is the globally identified method for identifying the food safety methods and eliminating the risk related to the safety of the food. All our processes conform to this global food safety management standard. TNV Certification Pvt. Ltd certifies our conformity to HACCP processes and activities." },
   
  ];
  temp!: AboutUsIconInterface;
  constructor() { }

  ngOnInit(): void {

  }
  changeActive(id: any) {
  var temp=this.icons[id];
  var selected_position_value = this.icons[id];
  var top = this.icons[0];
  this.temp = selected_position_value;
  this.icons[id] = top;
  this.icons[0] = this.temp;
  this.countLines()

  }
  readMore(){

  }
  readLess(){

  }

  lines = 4;
  countLines() {
    setTimeout(() => {

      var para = this.description.nativeElement;
      var para_btn = this.readBtn.nativeElement;
      if (para  ) {
        para.classList.remove('six_line')
        var divHeight = para.offsetHeight
        // var lineHeight = parseInt(el.style.lineHeight);
        this.lines = divHeight / 17;
        if (this.lines > 6) {
          para.classList.add('six_line')
          if ( para_btn){
            para_btn.innerHTML = "Read More"
            this.is_read_more=true;
          }
        }else{
          para.classList.remove('six_line')
          if ( para_btn){
            para_btn.innerHTML = "Read Less"
            this.is_read_more=false;
          }
        }
      }
    }, 500);

  }


is_read_more=true;
  not_line_six() {
   
    var para = this.description.nativeElement;
    var para_btn = this.readBtn.nativeElement;
  
    if (para  ) {
     
      // para.classList.remove('six_line')
      // var divHeight = para.offsetHeight
      // var lineHeight = parseInt(para.style.lineHeight);
      // this.lines = divHeight / 17;
      if (!this.is_read_more) {
        para.classList.add('six_line')
        if ( para_btn){
          para_btn.innerHTML = "Read More"
          this.is_read_more=true;
        }
       
      }else{
        para.classList.remove('six_line')
        if ( para_btn){
          para_btn.innerHTML = "Read Less"
          this.is_read_more=false;
        }
      }
    }


    
  }
 
}
