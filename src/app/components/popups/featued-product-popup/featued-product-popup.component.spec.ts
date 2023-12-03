import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatuedProductPopupComponent } from './featued-product-popup.component';

describe('FeatuedProductPopupComponent', () => {
  let component: FeatuedProductPopupComponent;
  let fixture: ComponentFixture<FeatuedProductPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatuedProductPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatuedProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
