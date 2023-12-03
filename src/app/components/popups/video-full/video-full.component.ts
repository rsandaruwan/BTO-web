import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-full',
  templateUrl: './video-full.component.html',
  styleUrls: ['./video-full.component.scss']
})
export class VideoFullComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VideoFullComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit(): void {
  }

}
