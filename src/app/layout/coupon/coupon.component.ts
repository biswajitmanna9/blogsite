import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { CouponService } from '../../core/services/coupon.service';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  discountCouponList: any = [];
  popularstoree: any = [];
  constructor(
    private couponService: CouponService,
    private router: Router,
    private toastr: ToastrService,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.popularstore();
    this.maxDiscountList();
  }
  popularstore() {
    this.storeService.store().subscribe(
      res => {
        console.log("Store List==>",res);
        this.popularstoree = res['result'];
      },
      error => {
      }
    )
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
