import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import { Router } from '@angular/router';

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
    private router: Router,
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
    var now = moment()
    var blog_date = moment.utc(date).local()
    // console.log(now)
    // console.log(blog_date)      
    if (moment(now).format('l') == moment(blog_date).format('l')) {
      return moment(blog_date).startOf('hour').fromNow();
    }
    else {
      return moment(blog_date).format('ll');
    }

  }

  getBlogCount(blog) {
    if (blog.comments.approved == undefined) {
      return "0 Comment"
    }
    else if (blog.comments.approved < 2) {
      return blog.comments.approved + " Comment"
    }
    else {
      return blog.comments.approved + " Comments"
    }
  }

  goToDetails(blog) {
    this.router.navigateByUrl('/' + blog.parent_category_slug + '/details/' + blog.blog_url);
  }

}
