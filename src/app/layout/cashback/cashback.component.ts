import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../../core/services/store.service';
import { CashbackService } from '../../core/services/cashback.service';
@Component({
  selector: 'app-cashback',
  templateUrl: './cashback.component.html',
  styleUrls: ['./cashback.component.scss']
})
export class CashbackComponent implements OnInit {
  userId:string;
  popularstoree: any = [];
  storebyCashback: any = [];
  cashBackList: any =[];
  paginationMaxSize: number;
  itemPerPage: number;
  defaultPagination: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  allStoreListCount:any;
  allStoreLength:number;
  filterAlphabets: any = [];
  allStore:any =[];
  constructor(
    private storeService: StoreService,
    private router: Router,
    private toastr: ToastrService,
    private cashbackService: CashbackService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    else {
      this.userId ="";
    }
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    //this.itemPerPage = Globals.itemPerPage;
    this.itemPerPage = 30;
    this.popularstore();
   // this.storeByCashback();
    this.maxDiscountCashBack();
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

  // storeByCashback() {
  //   this.storeService.storeCashBack().subscribe(
  //     res => {
  //       console.log("Store List By Cashback==>",res);
  //       this.storebyCashback = res['result'];
  //     },
  //     error => {
  //     }
  //   )
  // }

  maxDiscountCashBack() {
    this.cashbackService.maxDiscountCashBackList().subscribe(
      res => {
        console.log("Coupon List==>", res);
        this.cashBackList = res['result'];
        console.log(this.cashBackList);
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
    this.allStoreListing();
  };

  getAlphabet() {
    let alphabets = [];
    for (let i = 65; i <= 90; i++) {
      alphabets.push(String.fromCharCode(i));
      this.filterAlphabets = alphabets;
    }
    console.log(alphabets);
  }

  filterSearch(value) {
    this.storeService.searchStore(value).subscribe(
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
