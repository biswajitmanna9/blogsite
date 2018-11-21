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
    this.popularstore();
   // this.storeByCashback();
    this.maxDiscountCashBack();
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

}
