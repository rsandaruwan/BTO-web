import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit {
  @Input()
  rating!: number;

  remaining_count: Array<any> = []
  rating_count: Array<any> = []
  constructor() {
   
  }

  ngOnInit(): void {
   
    this.rating_count = new Array(this.rating);
    var remaining = 5 - this.rating;
    this.remaining_count = new Array(remaining);
  }

}
