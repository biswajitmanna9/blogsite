import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from "../core/services/blog.service";
import { ReferralService } from "../core/services/referral.service";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  code: string;
  currentLat: number;
  currentLong: number;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private referralService: ReferralService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        console.log(params);

        this.code = params.code;
        console.log(this.code);
      }
    );

    this.currentLat = +localStorage.getItem('currentLat');
    this.currentLong = +localStorage.getItem('currentLong');
    this.getApplyLink();
  }

  getApplyLink() {
    this.blogService.getApplyLink(this.code, this.currentLat, this.currentLong).subscribe(
      res => {
        console.log(res)
        if (res['result'] != null) {
          window.location.href = res['result']['referral_link']
          if (res['result']['id'] != undefined) {
            this.updateReferral(res['result']['id'])
          }
        }

      },
      error => {
        console.log(error)
      }
    )
  }

  updateReferral(id) {
    var data = {
      referral_id: id
    }
    this.referralService.updateReferral(data).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

}
