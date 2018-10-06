import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blogCategorySlug: string;
  blogSlug: string;
  blogDetails: any;
  blogId: number;
  isVisible: boolean;
  imageBaseUrl: string;
  blogCategoryName: string;
  blogList: any = [];
  blogCategoryId: number;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
  ) {
    this.route.params.subscribe(val => {
      if (val['cat_slug']) {
        this.blogCategorySlug = val['cat_slug'];
      }
      if (val['blog_slug']) {
        this.blogSlug = val['blog_slug'];
      }
      // console.log(val)
      this.loadData();
    });

  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
  }

  loadData() {
    if (this.blogCategorySlug != undefined) {
      this.getCategorySlugInfo(this.blogCategorySlug)
    }
    if (this.blogSlug != undefined) {
      this.getBlogSlugInfo(this.blogSlug)
    }
  }

  getCategorySlugInfo(slug) {
    this.blogService.getSlugInfo(slug).subscribe(
      res => {
        // console.log(res)
        this.blogCategoryId = res['result']['id']
        this.blogCategoryName = res['result']['title']
        // console.log(this.blogId)
        this.getBlogListByCategory();
      },
      error => {
        // console.log(error)
        this.router.navigateByUrl('/404');
      }
    )
  }

  getBlogListByCategory() {
    this.blogService.getBlogListByCategory(this.blogCategoryId).subscribe(
      res => {
        console.log(res)
        this.blogList = res['result']['bloglist']
        // console.log(this.blogList)
      },
      error => {
        // console.log(error)
      }
    )
  }

  getBlogSlugInfo(slug) {
    this.blogService.getSlugInfo(slug).subscribe(
      res => {
        // console.log(res)
        this.blogId = res['result']['id']
        // console.log(this.blogId)
        this.getBlogDetails();
      },
      error => {
        // console.log(error)
        this.router.navigateByUrl('/404');
      }
    )
  }

  getBlogDetails() {
    this.blogService.getBlogDetails(this.blogId).subscribe(
      res => {
        // console.log(res)
        this.blogDetails = res['result'];
        // console.log(this.blogDetails)
        this.isVisible = true;
      },
      error => {
        // console.log(error)
      }
    )
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.imageBaseUrl + image})`);
  }

  goToDetails(blog_url) {
    this.router.navigateByUrl('/' + this.blogCategorySlug + '/details/' + blog_url);
  }

}
