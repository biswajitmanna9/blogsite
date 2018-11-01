import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from "../core/services/blog.service";

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
    private blogService: BlogService
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
        // window.location.href = "https://www.google.com";
      },
      error => {
        console.log(error)
      }
    )
  }

}
