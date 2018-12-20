import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../../core/components/login/login.component';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertPromise } from 'selenium-webdriver';
import { OwlCarousel } from 'ngx-owl-carousel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel
  mostRecentBlogList: any = [];
  imageBaseUrl: string;
  homeBannerContentList: any = [];
  userId:string;
  mainCardCategoryId: any;
  subCategoryList: any = [];
  topCatList:any =[];
  isCard:boolean;
  now :any;
  daysLeft:any;
  endDate:any;
  today:any;
  daysPending:any;
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
    this.getCategorySlugInfo("cards");
    this.topCategoryList();
  }

  getMostRecentBlogList(data) {
    this.blogService.getMostRecentBlogList(data).subscribe(
      res => {
        console.log( res['result']);
        this.mostRecentBlogList = res['result'];
        for (var i = 0; i < this.mostRecentBlogList.length; i++) {
          this.daysPending = 0;
          var today = moment(new Date()).format("YYYY-MM-DD");
          var endDealsDate = moment(new Date(this.mostRecentBlogList[i].deals_end_datetime)).format("YYYY-MM-DD");
          var endDate = moment(endDealsDate, "YYYY-MM-DD");
          this.daysPending = moment.duration(endDate.diff(today)).asDays()
         // console.log(this.daysPending);
          this.mostRecentBlogList[i].daysPending = this.daysPending;
          this.mostRecentBlogList[i].max_price = parseInt(this.mostRecentBlogList[i].max_price);
          this.mostRecentBlogList[i].sale_price = parseInt(this.mostRecentBlogList[i].sale_price);

          this.mostRecentBlogList[i].highest_cashback = Math.round(this.mostRecentBlogList[i].highest_cashback);
        }
       // console.log("Most Recent Deals==>",this.mostRecentBlogList);
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
   // console.log(blog.parent_category_slug);
   // console.log(blog.blog_url);
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
    //this.mainCardCategoryId =2;
    this.blogService.getSubCategoryByCategory(this.mainCardCategoryId).subscribe(
      res => {
       // console.log(res);
        res['result'].forEach(x => {
          var data = {
            category_name: x.category_name,
            category_slug: x.category_slug,
            category_image: x.image,
            id: x.id
          }
         
          this.subCategoryList.push(data);
          // if (x.sub_category_details.length > 0) {
          //   x.sub_category_details.forEach(y => {
          //     var Sub_data = {
          //       category_name: y.category_name,
          //       category_slug: y.category_slug,
          //       category_image: y.image,
          //       id: y.id
          //     }
          //     this.subCategoryList.push(Sub_data)
          //     console.log(this.subCategoryList);
          //   })
          // }
        })
      },
      error => {
        // console.log(error)
      }
    )
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

  goToCategoryPage(slug: string) {
    this.router.navigateByUrl('cards/' + slug);
  }

  goToTopCategoryPage(parent_url,slug) {
    this.router.navigateByUrl(parent_url + '/' + slug);
  }

  topCategoryList() {
    this.blogService.getTopCategory().subscribe(
      res => {
        this.topCatList = res['result'];
       // console.log("Top Cat List==>",this.topCatList);
      },
      error => {
      }
    )
  }

  

}
