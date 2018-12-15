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
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel
  mostRecentBlogList: any = [];
  imageBaseUrl: string;
  homeBannerContentList: any = [];
  userId:string;
  mainCardCategoryId: any;
  subCategoryList: any = [];
  topCatList:any =[];
  isCard:boolean;

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
  now :any;
  daysLeft:any;
  endDate:any;
  today:any;
  daysPending:any;
  blogList: any=[];
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
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getMostRecentBlogList(this.userId);
    this.getHomeBannerContentList();
    this.getCategorySlugInfo("banking");
    this.topCategoryList();
  }

  getMostRecentBlogList(data) {
    this.blogService.getMostRecentBlogList(data).subscribe(
      res => {
        this.mostRecentBlogList = res['result']
        console.log("Most Recent Deals==>",this.mostRecentBlogList);
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
  goToDetails(blog_url) {
    console.log(blog_url);
    this.router.navigateByUrl('/banking/details/' + blog_url);
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
        console.log(res);
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
               console.log(this.subCategoryList);
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
        this.mainCardCategoryId = res['result']['id'];
        this.getBlogListByCategory(this.mainCardCategoryId,this.userId);
        this.getSubCategoryByCategory();
      },
      error => {
      }
    )
  }

  goToCategoryPage(slug: string) {
    this.router.navigateByUrl('cards/' + slug);
  }

  goToTopCategoryPage(slug) {
    this.router.navigateByUrl('banking' + '/' + slug);
  }

  topCategoryList() {
    this.blogService.getTopCategory().subscribe(
      res => {
        this.topCatList = res['result'];
        console.log("Top Cat List==>",this.topCatList);
      },
      error => {
      }
    )
  }

  getBlogListByCategory(mainCardCategoryId,user_id) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.blogService.getBlogListByCategory(mainCardCategoryId,user_id,params).subscribe(
      res => {
        console.log(res);
        this.categoryDetails = res['result']['category_details'];
       this.blogList = res['result']['bloglist'];
      for(var i = 0; i < this.blogList.length; i++) {
        this.daysPending =0;
        
       this.blogList[i].max_price = parseInt(this.blogList[i].max_price);
       this.blogList[i].sale_price = parseInt(this.blogList[i].sale_price);
      }
      console.log("Card Post ==> ",this.blogList);
       
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
        this.visibleKey = true;
      },
      error => {
      }
    )
  }


}
