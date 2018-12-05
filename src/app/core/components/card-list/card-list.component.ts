import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../services/login.service';
import * as Globals from '../../../core/globals';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
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
  @Input() opened = false;
  private loggedIn: boolean;
  mainCardCategoryId: string;
  userId: string;
  paginationMaxSize: number;
  itemPerPage: number;
  defaultPagination: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  blogListCount: any;
  constructor(
    private blogService: BlogService,
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {
    loginService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
  }

  ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    else {
      this.userId = "";
    }
    this.imageBaseUrl = environment.imageBaseUrl;
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.loadUserInfo();
    this.getBlogListByCategory();
    this.getTagListByCategory();
    this.getCategorySlugInfo(this.blogCategorySlug);
  }

  getCategorySlugInfo(slug) {
    this.blogService.getSlugInfo(slug).subscribe(
      res => {
        this.mainCardCategoryId = res['result']['id']
        this.getSubCategoryByCategory();
      },
      error => {
      }
    )
  }

  private changeStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
    }
  }

  itemToggle(item: any) {
    item.opened = !item.opened;
  }

  getBlogListByCategory() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.blogService.getBlogListByCategory(this.blogCategoryId, this.userId, params).subscribe(
      res => {
        this.categoryDetails = res['result']['category_details'];
        this.blogList = res['result']['bloglist'];
        this.blogListCount = res['result']['total_count'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.blogListCount > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.blogListCount;
        }
        this.visibleKey = true
      },
      error => {
        // console.log(error)
      }
    )
  }

  pagination() {
    this.getBlogListByCategory();
  };


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
    this.blogService.getSubCategoryByCategory(this.mainCardCategoryId).subscribe(
      res => {
        console.log(res);
        res['result'].forEach(x => {
          var data = {
            category_name: x.category_name,
            category_slug: x.category_slug,
            category_image: x.image,
            id: x.id
          }
         
          this.subCategoryList.push(data);
          if (x.sub_category_details.length > 0) {
            x.sub_category_details.forEach(y => {
              var Sub_data = {
                category_name: y.category_name,
                category_slug: y.category_slug,
                category_image: y.image,
                id: y.id
              }
              this.subCategoryList.push(Sub_data)
            })
          }
        })
      },
      error => {
        // console.log(error)
      }
    )
  }

  goToCategoryPage(slug: string) {
    this.goToPageByCategorySlugChecking(slug)
  }

  goToPageByCategorySlugChecking(slug) {
    this.blogService.getSlugInfo(slug).subscribe(
      res => {
        var parent_Slug;
        var grand_parent_slug;
        if (res['result']['parent'] != undefined) {
          parent_Slug = res['result']['parent'][0]['slug'];
          if (res['result']['parent'][0]['grand_parent'] != undefined) {
            grand_parent_slug = res['result']['parent'][0]['grand_parent'][0]['slug'];
          }
        }

        if (grand_parent_slug != undefined && parent_Slug != undefined) {
          this.router.navigateByUrl('/' + grand_parent_slug + '/' + parent_Slug + '/' + slug);
        }
        else if (parent_Slug != undefined) {
          this.router.navigateByUrl('/' + parent_Slug + '/' + slug);
        }

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

  openLoginModal() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  tagFilterList(tag_name) {
    this.blogService.getBlogListByTag(this.blogCategoryId, tag_name).subscribe(
      res => {
        this.categoryDetails = res['result']['category_details'];
        this.blogList = res['result']['bloglist'];
        this.blogListCount = res['result']['total_count'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.blogListCount > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.blogListCount;
        }
        this.visibleKey = true
      },
      error => {
        // console.log(error)
      }
    )
  }

}
