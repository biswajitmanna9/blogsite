import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  @Input('blogCategoryId') blogCategoryId;
  @Input('categoryName') categoryName;
  @Input('blogCategorySlug') blogCategorySlug;
  blogList: any = [];
  imageBaseUrl: string;
  pageHeading: string;
  categoryDetails: any;
  visibleKey: boolean;
  blogLinks:string;
  constructor(
    private blogService: BlogService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getBlogListByCategory();
  }

  getBlogListByCategory() {
    this.blogService.getBlogListByCategory(this.blogCategoryId).subscribe(
      res => {
        console.log(res);
        this.categoryDetails = res['result']['category_details'];
        this.blogList = res['result']['bloglist'];
        this.blogLinks = res['result']['links'];
        this.visibleKey = true
      },
      error => {
      }
    )
  }

  goToDetails(blog_url) {
    this.router.navigateByUrl('/' + this.blogCategorySlug + '/details/' + blog_url);
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

}
