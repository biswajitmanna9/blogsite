import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../../core/services/store.service';
import { BlogService } from '../../core/services/blog.service';
import { CouponService } from '../../core/services/coupon.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  popularstoree: any = [];
  storebyCashback: any = [];
  blogList: any=[];
  couponList: any = [];
  imageBaseUrl: string;
  blogCategoryId:number;
  defaultPagination:number;
  userId:string;
  constructor(
    private storeService: StoreService,
    private router: Router,
    private toastr: ToastrService,
    private blogService:BlogService,
    private couponService:CouponService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    else {
      this.userId ="";
    }
    this.imageBaseUrl = environment.imageBaseUrl;
    this.defaultPagination = 1;
    this.getAlphabet();
    this.popularstore();
    this.storeByCashback();
    this.getBlogListByCategory();
    this.maxDiscountList();
  }
  getAlphabet() {
    let alphabets = [];
    for (let i = 65; i <= 90;i++) {
        alphabets.push(String.fromCharCode(i));
    }
    console.log(alphabets);
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

  storeByCashback() {
    this.storeService.storeCashBack().subscribe(
      res => {
        console.log("Store List By Cashback==>",res);
        this.storebyCashback = res['result'];
      },
      error => {
      }
    )
  }

  getBlogListByCategory() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.blogCategoryId =3; // For Deals 
    this.blogService.getBlogListByCategory(this.blogCategoryId,this.userId,params).subscribe(
      res => {
        console.log(res);
        this.blogList = res['result']['bloglist'];
      },
      error => {
      }
    )
  }

  maxDiscountList() {
    this.couponService.maxDiscountCouponList().subscribe(
      res => {
        console.log("Coupon List==>", res);
        this.couponList = res['result'];
        console.log(this.couponList);
      },
      error => {
      }
    )
  }


}
