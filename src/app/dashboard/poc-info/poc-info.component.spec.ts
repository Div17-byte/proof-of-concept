import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocInfoComponent } from './poc-info.component';

describe('PocInfoComponent', () => {
  let component: PocInfoComponent;
  let fixture: ComponentFixture<PocInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
