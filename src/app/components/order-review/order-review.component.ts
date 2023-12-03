import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CartItemInterface } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress'];
  dataSource: MatTableDataSource<CartItemInterface>;
  delivery_option:'leave' | 'meet' ='leave';
  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

}
