import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCategoryDetailsComponent } from './coupon-category-details.component';

describe('CouponCategoryDetailsComponent', () => {
  let component: CouponCategoryDetailsComponent;
  let fixture: ComponentFixture<CouponCategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponCategoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
