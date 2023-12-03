import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCommingSoonComponent } from './cart-comming-soon.component';

describe('CartCommingSoonComponent', () => {
  let component: CartCommingSoonComponent;
  let fixture: ComponentFixture<CartCommingSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCommingSoonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCommingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
