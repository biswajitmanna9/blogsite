import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { CashbackService } from '../../core/services/cashback.service';


@Component({
  selector: 'app-cashbackdetails',
  templateUrl: './cashbackdetails.component.html',
  styleUrls: ['./cashbackdetails.component.scss']
})
export class CashbackdetailsComponent implements OnInit {
  cashbackList:any =[];
  storeName:string;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private cashbackService: CashbackService
  ) { }

  ngOnInit() {
    this.cashBcakListStore();
  }

  cashBcakListStore() {
    this.cashbackService.cashBackListByStore(this.route.snapshot.params['id']).subscribe(
      res => {
        console.log("Cash Back List==>",res);
        this.storeName = res['store_name']
        this.cashbackList = res['result'];
      },
      error => {
      }
    )
  }

}
