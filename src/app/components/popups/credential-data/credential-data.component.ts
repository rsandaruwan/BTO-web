import { Component, ElementRef, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credential-data',
  templateUrl: './credential-data.component.html',
  styleUrls: ['./credential-data.component.scss']
})
export class CredentialDataComponent implements OnInit ,AfterViewInit {
  @ViewChild("new_process_item_content") new_process_item_content: ElementRef | any;

  constructor(
    public dialogRef: MatDialogRef<CredentialDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

  }
  ngAfterViewInit(): void {
    if (this.new_process_item_content) {
      this.new_process_item_content.nativeElement.className="new_process_item_content pt-2 "+this.data.side+" ";
    
    }
  }

  ngOnInit(): void {
    
  }


}
