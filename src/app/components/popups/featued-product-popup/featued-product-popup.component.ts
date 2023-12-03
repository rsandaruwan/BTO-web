import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AnyARecord } from 'dns';
import { ProductInterface } from 'src/app/models/product';

@Component({
  selector: 'app-featued-product-popup',
  templateUrl: './featued-product-popup.component.html',
  styleUrls: ['./featued-product-popup.component.scss']
})
export class FeatuedProductPopupComponent implements OnInit {
  product!: ProductInterface;

  constructor(
    public dialogRef: MatDialogRef<FeatuedProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.product=data.product;
  }

  ngOnInit(): void {
  }

}
