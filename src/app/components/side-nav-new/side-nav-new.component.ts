import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SideNaveItemInterface } from 'src/app/models/side_nav_item';

@Component({
  selector: 'app-side-nav-new',
  templateUrl: './side-nav-new.component.html',
  styleUrls: ['./side-nav-new.component.scss']
})
export class SideNavNewComponent implements OnInit {
  constructor() { }
  @ViewChild('expandButton') expandButton: ElementRef | undefined;
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  @Input() items!: Array<SideNaveItemInterface>;
  @Input() selected_section_text!: string;
  @Output() toview: EventEmitter<any> = new EventEmitter();
  panelOpenState=true; 
  ngOnInit(): void {}
  callparent(id: number) {
    this.toview.emit(id);
  }
  callparent1(id: any) {
    this.toview.emit(id);
  }
  ngAfterViewInit() {
    this.items.forEach(element => {
      if (element.active) {
        this.activate(element.id)
      }
    });
    if(this.drawer){
      var width = window.innerWidth;
      if (width < 1600) {
       //this.drawer.toggle();
      }
    }
  }

  activate(id: any) {
    var item_elements = document.querySelectorAll(".point");
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      const element1 = item_elements[index];
      // this.selected_section_text=element.name;
      if (element.id == id) {
        element.active = true;
        element1.className = "point active";
      } else {
        element.active = false;
        element1.className = "point ";
      }
    }
  }

}
