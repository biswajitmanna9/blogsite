import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

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

  getHomeBannerContentList(){
    this.blogService.getHomeBannerContentList().subscribe(
      res => {
        console.log(res)
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

}
