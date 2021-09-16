import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocViewComponent } from './poc-view.component';

describe('PocViewComponent', () => {
  let component: PocViewComponent;
  let fixture: ComponentFixture<PocViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
