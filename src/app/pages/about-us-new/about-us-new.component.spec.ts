import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsNewComponent } from './about-us-new.component';

describe('AboutUsNewComponent', () => {
  let component: AboutUsNewComponent;
  let fixture: ComponentFixture<AboutUsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
