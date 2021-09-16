import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOtpComponent } from './dialog-otp.component';

describe('DialogOtpComponent', () => {
  let component: DialogOtpComponent;
  let fixture: ComponentFixture<DialogOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
