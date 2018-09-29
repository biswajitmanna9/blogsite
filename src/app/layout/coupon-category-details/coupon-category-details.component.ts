import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coupon-category-details',
  templateUrl: './coupon-category-details.component.html',
  styleUrls: ['./coupon-category-details.component.scss']
})
export class CouponCategoryDetailsComponent implements OnInit {
  coupon_category_id: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.coupon_category_id = this.route.snapshot.params['id']
  }

}
