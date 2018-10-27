import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../services/login.service';

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
  constructor(
    private blogService: BlogService,
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {
    loginService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.loadUserInfo();
    this.getBlogListByCategory();
    this.getTagListByCategory();
    this.getSubCategoryByCategory();
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

  openLoginModal() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
    })
  }

}
