import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

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
        this.categoryDetails = res['result']['category_details'];
        this.blogList = res['result']['bloglist']
        this.visibleKey = true
      },
      error => {
      }
    )
  }

  goToDetails(blog_url) {
    this.router.navigateByUrl('/' + this.blogCategorySlug + '/details/' + blog_url);
  }

}
