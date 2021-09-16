import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPocComponent } from './request-poc.component';

describe('RequestPocComponent', () => {
  let component: RequestPocComponent;
  let fixture: ComponentFixture<RequestPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
