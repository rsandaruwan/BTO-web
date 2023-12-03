import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavNewComponent } from './side-nav-new.component';

describe('SideNavNewComponent', () => {
  let component: SideNavNewComponent;
  let fixture: ComponentFixture<SideNavNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
