import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupondetailsComponent } from './coupondetails.component';

describe('CoupondetailsComponent', () => {
  let component: CoupondetailsComponent;
  let fixture: ComponentFixture<CoupondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
