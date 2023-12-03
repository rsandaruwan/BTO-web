import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsPopupComponent } from './points-popup.component';

describe('PointsPopupComponent', () => {
  let component: PointsPopupComponent;
  let fixture: ComponentFixture<PointsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
