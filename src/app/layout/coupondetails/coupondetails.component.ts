import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CouponService } from '../../core/services/coupon.service';

@Component({
  selector: 'app-coupondetails',
  templateUrl: './coupondetails.component.html',
  styleUrls: ['./coupondetails.component.scss']
})
export class CoupondetailsComponent implements OnInit {
  couponListing:any =[];
  storeName:string;
  storeUrl:string;
  hideme=[];
  show:number;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private couponService: CouponService
  ) { }

  ngOnInit() {
    this.couponList();
  }
  couponList() {
    this.couponService.couponListByStore(this.route.snapshot.params['id']).subscribe(
      res => {
        console.log("Coupon List==>",res);
        this.storeName = res['store_details']['name'];
        this.storeUrl = res['store_details']['url']
        this.couponListing = res['result'];
      },
      error => {
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

  onNavigate(url){
    window.open("http://www."+ url, "_blank");
  }

  showCode(index){
    this.show = index;
 };


}
