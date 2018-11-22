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
  filterAlphabets: any = [];
  allStore:any =[];
  paginationMaxSize: number;
  itemPerPage: number;
  defaultPagination: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  allStoreListCount:any;
  allStoreLength:number;
  imageBaseUrl: string;
  selectedItem:any;
  constructor(
    private couponService: CouponService,
    private router: Router,
    private toastr: ToastrService,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    //this.itemPerPage = Globals.itemPerPage;
    this.itemPerPage = 30;
    this.popularstore();
    this.maxDiscountList();
    this.getAlphabet();
    this.allStoreListing();
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

  allStoreListing() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.storeService.allStore(params).subscribe(
      res => {
        console.log("All Store List==>",res);
        this.allStore = res['result']['storelist'];
        this.allStoreLength = res['result'].length;
        this.allStoreListCount =  res['result']['total_count'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.allStoreListCount > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.allStoreListCount;
        }

      },
      error => {
      }
    )
  }

  pagination() {
    window.scroll(0,500);
    this.allStoreListing();
  };

  // storeListingSearch() {
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('page', '');
  //   this.storeService.allStore(params).subscribe(
  //     res => {
  //       console.log("All Store List==>",res);
  //       this.allStore = res['result']['storelist'];
  //     },
  //     error => {
  //     }
  //   )
  // }

  getAlphabet() {
    let alphabets = [];
    for (let i = 65; i <= 90; i++) {
      alphabets.push(String.fromCharCode(i));
      this.filterAlphabets = alphabets;
    }
    console.log(alphabets);
  }

  filterSearch(alphabet) {
    this.selectedItem = alphabet;
    this.storeService.searchStore(alphabet).subscribe(
      res => {
        console.log("All Store List==>",res);
        this.allStore = res['result'];
        this.allStoreLength = res['result'].length;
        this.allStoreListCount ='';
      },
      error => {
      }
    )
  }

  goToCouponDetails(id) {
    this.router.navigate(['/coupondetails',id]);
  }


}
