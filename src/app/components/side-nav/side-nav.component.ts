import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, Input,  ElementRef, Output, EventEmitter  } from '@angular/core';

import { SideNaveItemInterface } from 'src/app/models/side_nav_item';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  constructor() { }
  // @ViewChildren('item') item_elements: QueryList<ElementRef> | any;
  @Input()
  items!: Array<SideNaveItemInterface>;
  @Output() toview: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {

  }

  callparent(id:number){
    this.toview.emit(id);
  }
  ngAfterViewInit() {
    this.items.forEach(element => {
      if (element.active) {
        this.activate(element.id)
      }
    });
  }

  activate(id: any) {
  
    var item_elements = document.querySelectorAll(".point");
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      const element1 = item_elements[index];
      
      if (element.id == id) {
        element.active = true;
        element1.className = "point active";
      }else {
        
     
        element.active = false;
        element1.className = "point ";
      }
    }

  }

}
