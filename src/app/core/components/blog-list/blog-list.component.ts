import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import * as Globals from '../../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../../../core/components/login/login.component';
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
  paginationMaxSize: number;
  itemPerPage: number;
  defaultPagination: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  blogListCount:any;
  userId:string;
  now :any;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {
    this.now = Date.now();
   }

  ngOnInit() {
    if(localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    else {
      this.userId ="";
    }
    this.imageBaseUrl = environment.imageBaseUrl;
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getBlogListByCategory();
  }

  pagination() {
    this.getBlogListByCategory();
  };


  getBlogListByCategory() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.blogService.getBlogListByCategory(this.blogCategoryId,this.userId,params).subscribe(
      res => {
        console.log(res);
        this.categoryDetails = res['result']['category_details'];
        this.blogList = res['result']['bloglist'];
        console.log("Deals Page Blog List==>",this.blogList);
        this.blogListCount =  res['result']['total_count'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.blogListCount > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.blogListCount;
        }
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
    if (blog.comments ==null) {
      return "0 Comment"
    }
    else {
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

  addLike(id, is_like, user_id) {
    console.log(is_like);
    if (user_id) {
      if (is_like == 0) {
        is_like = "1";
      }
      else {
        is_like = "0";
      }
      var data = {
        user_id: localStorage.getItem('userId'),
        post_id: id,
        is_like: is_like
      }
      this.blogService.userAddLike(data).subscribe(
        res => {
          this.getBlogListByCategory();
          if (res['result']['is_like'] == 1) {
            this.toastr.success('Liked Succesfully', '', {
              timeOut: 3000,
            });
          }
          else {
            this.toastr.success('Dislike Succesfully', '', {
              timeOut: 3000,
            });
          }
        },
        error => {
          // console.log(error)
        }
      )
    }
    else {
      let dialogRef = this.dialog.open(LoginComponent, {
        width: '525px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log(result)
      })
    }

  }


}
