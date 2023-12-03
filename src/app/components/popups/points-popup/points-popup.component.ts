import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductInterface } from 'src/app/models/product';
import { FeatuedProductPopupComponent } from '../featued-product-popup/featued-product-popup.component';

@Component({
  selector: 'app-points-popup',
  templateUrl: './points-popup.component.html',
  styleUrls: ['./points-popup.component.scss']
})
export class PointsPopupComponent implements OnInit {
  product!: ProductInterface;

  constructor(
    public dialogRef: MatDialogRef<FeatuedProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.product=data.product;
  }

  ngOnInit(): void {
  }
}
