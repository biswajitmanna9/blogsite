import { Component, OnInit } from '@angular/core';
import { ReferralService } from "../../core/services/referral.service";
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  referralLinkList: any = [];
  userId: number;
  constructor(
    private referralService: ReferralService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
      this.getUserReferralList();
    }
  }

  getUserReferralList() {
    this.referralService.getUserReferralList(this.userId).subscribe(
      res => {
        console.log(res)
        this.referralLinkList = res['result']
      },
      error => {
        console.log(error)
      }
    )
  }

  transformDate(date) {
    var now = moment()
    var blog_date = moment.utc(date).local()
    if (moment(now).format('l') == moment(blog_date).format('l')) {
      return moment(blog_date).startOf('hour').fromNow();
    }
    else {
      return moment(blog_date).format('ll');
    }
  }

}
