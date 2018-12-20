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
  allStoreListCount:any;
  allStoreLength:number;
  filterAlphabets: any = [];
  allStore:any =[];
  selectedItem:any;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  itemPerPage: number;
  paginationMaxSize: number;
  
  constructor(
    private storeService: StoreService,
    private router: Router,
    private toastr: ToastrService,
    private blogService:BlogService,
    private couponService:CouponService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    if(localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    else {
      this.userId ="";
    }
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.itemPerPage = 10;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.getAlphabet();
    this.popularstore();
    this.storeByCashback();
    this.getBlogListByCategory();
    this.maxDiscountList();
    this.getAlphabet();
    this.allStoreListing();
  }
  getAlphabet() {
    let alphabets = [];
    for (let i = 65; i <= 90; i++) {
      alphabets.push(String.fromCharCode(i));
      this.filterAlphabets = alphabets;
    }
  }

  popularstore() {
    this.storeService.store().subscribe(
      res => {
        console.log("Popular Store List==>",res);
        this.popularstoree = res['result'];
      },
      error => {
      }
    )
  }

  storeByCashback() {
    this.storeService.storeCashBack().subscribe(
      res => {
        console.log("Todays store==>",res);
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
        console.log("Deals Listing",res);
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
        console.log("Coupon List==>",this.couponList);
      },
      error => {
      }
    )
  }

  onNavigate(url){
    window.open("http://www."+ url, "_blank");
  }

  goToCashBackDetails(id) {
    this.router.navigate(['store/cashbackdetails',id]);
  }
  goToDealsDetails(url) {
    this.router.navigate(['/deals','details',url]);
  }
  goToCouponDetails(id) {
    this.router.navigate(['store/coupondetails',id]);
  }

  allStoreListing() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.storeService.allStore(params).subscribe(
      res => {
        console.log("All Store List==>",res);
        this.allStore = res['result']['storelist'];
        this.allStoreLength = res['result'].length;
       // alert(res['result']['total_count']);
        this.allStoreListCount =  res['result']['total_count'];

        console.log( "Total Count==>",this.allStoreListCount);
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        console.log("defaultPagination no==>",this.defaultPagination);
        console.log("Item per Page ==>",this.itemPerPage);
        this.lower_count = this.itemNo + 1;
        console.log("Lower Count==>",this.lower_count);
        if (this.allStoreListCount > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.allStoreListCount;
        }
        console.log("Upper Count==>",this.upper_count);
      },
      error => {
      }
    )
  }

  pagination() {
    window.scroll(0,500);
    this.allStoreListing();
  };

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

}
