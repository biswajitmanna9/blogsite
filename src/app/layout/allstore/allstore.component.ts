import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from '../../core/services/store.service';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-allstore',
  templateUrl: './allstore.component.html',
  styleUrls: ['./allstore.component.scss']
})
export class AllstoreComponent implements OnInit {
  userId:string;
  popularstoree: any = [];
  storebyCashback: any =[];
  filterAlphabets: any = [];
  constructor(
    private storeService: StoreService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    else {
      this.userId ="";
    }
    this.getAlphabet();
    this.popularstore();
    this.storeByCashback();
  }

  getAlphabet() {
    let alphabets = [];
    for (let i = 65; i <= 90;i++) {
        alphabets.push(String.fromCharCode(i));
        this.filterAlphabets = alphabets;
    }
    console.log(alphabets);
  }

  filterSearch(value) {
   // alert(value);
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

}
