import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialDataComponent } from './credential-data.component';

describe('CredentialDataComponent', () => {
  let component: CredentialDataComponent;
  let fixture: ComponentFixture<CredentialDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
