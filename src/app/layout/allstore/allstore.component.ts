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
  allStore:any =[];
  filterAlphabets: any = [];
  paginationMaxSize: number;
  itemPerPage: number;
  defaultPagination: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  allStoreListCount:any;
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
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    //this.itemPerPage = Globals.itemPerPage;
    this.itemPerPage = 30;
    this.allStoreListing();

  }

  allStoreListing() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.storeService.allStore(params).subscribe(
      res => {
        console.log("All Store List==>",res);
        
        this.allStore = res['result']['storelist'];
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

}
