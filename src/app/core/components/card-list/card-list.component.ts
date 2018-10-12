import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input('blogCategoryId') blogCategoryId;
  @Input('categoryName') categoryName;
  @Input('blogCategorySlug') blogCategorySlug;
  blogList: any = [];
  imageBaseUrl: string;
  pageHeading: string;
  tagList: any = [];
  subCategoryList: any = [];
  categoryDetails: any;
  visibleKey: boolean;
  constructor(
    private blogService: BlogService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getBlogListByCategory();
    this.getTagListByCategory();
    this.getSubCategoryByCategory();
  }

  getBlogListByCategory() {
    this.blogService.getBlogListByCategory(this.blogCategoryId).subscribe(
      res => {
        console.log(res)
        this.categoryDetails = res['result']['category_details'];
        this.blogList = res['result']['bloglist'];
        this.visibleKey = true
      },
      error => {
        // console.log(error)
      }
    )
  }

  goToDetails(blog_url) {
    this.router.navigateByUrl('/' + this.blogCategorySlug + '/details/' + blog_url);
  }

  getTagListByCategory() {
    this.blogService.getTagListByCategory(this.blogCategoryId).subscribe(
      res => {
        // console.log(res)
        this.tagList = res['result']
      },
      error => {
        // console.log(error)
      }
    )
  }

  getSubCategoryByCategory() {
    this.blogService.getSubCategoryByCategory(this.blogCategoryId).subscribe(
      res => {
        // console.log(res)
        this.subCategoryList = res['result']
      },
      error => {
        // console.log(error)
      }
    )
  }

  displayRightPanelCss() {
    return {
      'col-md-9': this.subCategoryList.length > 0,
      'col-md-12': this.subCategoryList.length == 0
    };
  }

  displayTrfarentCss(blog) {
    return {
      'trfarent-bg': blog.blog_content != ""
    };
  }

}
