import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mostRecentBlogList: any = [];
  imageBaseUrl: string;
  homeBannerContentList: any = [];
  constructor(
    private blogService: BlogService,
    private _sanitizer: DomSanitizer,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getMostRecentBlogList();
    this.getHomeBannerContentList();
  }

  getMostRecentBlogList() {
    this.blogService.getMostRecentBlogList().subscribe(
      res => {
        console.log(res)
        this.mostRecentBlogList = res['result']
      },
      error => {
        // console.log(error)
      }
    )
  }

  getHomeBannerContentList() {
    this.blogService.getHomeBannerContentList().subscribe(
      res => {
        // console.log(res)
        this.homeBannerContentList = res['result']
      },
      error => {
        // console.log(error)
      }
    )
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.imageBaseUrl + image})`);
  }

  transformDate(date) {
    console.log(date)
    var d1 = new Date();
    var now = this.datePipe.transform(d1, 'yyyy-MM-dd')
    var blog_date = this.datePipe.transform(date, 'yyyy-MM-dd')
    if (now == blog_date) {
      console.log(new Date(d1))
      console.log(new Date(date))
      var diffTime = new Date(d1).getTime() - new Date(date).getTime();
      return this.msToTime(diffTime) + " Before"
    }
    else {
      return this.datePipe.transform(date, 'mediumDate');
    }

  }

  msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    if (hours < 24 && hours > 0) {
      return hours + " Hrs";
    }
    else if (minutes < 60 && minutes > 0) {
      return minutes + " Min";
    }
    if (seconds < 60) {
      return seconds + " Sec";
    }
  }

}
