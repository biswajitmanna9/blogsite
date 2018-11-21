import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { CouponService } from '../../core/services/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  discountCouponList: any = [];
  constructor(
    private couponService: CouponService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.maxDiscountList();
  }
  maxDiscountList() {
    this.couponService.maxDiscountCouponList().subscribe(
      res => {
        console.log("Coupon List==>", res);
        this.discountCouponList = res['result'];
        console.log(this.discountCouponList);
      },
      error => {
      }
    )
  }

}
