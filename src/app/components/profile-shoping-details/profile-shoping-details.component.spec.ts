import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShopingDetailsComponent } from './profile-shoping-details.component';

describe('ProfileShopingDetailsComponent', () => {
  let component: ProfileShopingDetailsComponent;
  let fixture: ComponentFixture<ProfileShopingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileShopingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileShopingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
