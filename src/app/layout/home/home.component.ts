import { Component, OnInit,Input } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../../core/components/login/login.component';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertPromise } from 'selenium-webdriver';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mostRecentBlogList: any = [];
  imageBaseUrl: string;
  homeBannerContentList: any = [];
  userId:string;
  mainCardCategoryId: any;
  subCategoryList: any = [];
  constructor(
    private blogService: BlogService,
    private _sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    else {
      this.userId ="";
    }
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getMostRecentBlogList(this.userId);
    this.getHomeBannerContentList();
    this.getSubCategoryByCategory();
  }

  getMostRecentBlogList(data) {
    this.blogService.getMostRecentBlogList(data).subscribe(
      res => {
        this.mostRecentBlogList = res['result']
      },
      error => {
      }
    )
  }

  getHomeBannerContentList() {
    this.blogService.getHomeBannerContentList().subscribe(
      res => {
        this.homeBannerContentList = res['result']
        console.log("Banner List ==>",this.homeBannerContentList);
      },
      error => {
      }
    )
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.imageBaseUrl + image})`);
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

  goToDetails(blog) {
    this.router.navigateByUrl('/' + blog.parent_category_slug + '/details/' + blog.blog_url);
  }

  addLike(id, is_like,user_id) {
    if (localStorage.getItem('userId')) {
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
          this.getMostRecentBlogList(localStorage.getItem('userId'));
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
      })
    }

  }

  getSubCategoryByCategory() {
    this.mainCardCategoryId =2;
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
    //alert(this.router.navigateByUrl('cards/' + slug));
   
    this.router.navigateByUrl('cards/' + slug);
  }

  

}
