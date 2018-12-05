import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Globals from '../../core/globals';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../../core/components/login/login.component';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-allblog',
  templateUrl: './allblog.component.html',
  styleUrls: ['./allblog.component.scss']
})
export class AllblogComponent implements OnInit {
  // @Input('blogCategoryId') blogCategoryId;
  // @Input('categoryName') categoryName;
  // @Input('blogCategorySlug') blogCategorySlug;
  blogList: any = [];
  imageBaseUrl: string;
  paginationMaxSize: number;
  itemPerPage: number;
  defaultPagination: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  blogListCount:any;
  userId:string;
  visibleKey: boolean;
  blogLinks:string;
  isSearch:number;
  itemName:any;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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

    //this.blogCategorySlug = 'deals';
    if(this.route.snapshot.params['search_key']) {
      this.getSearchBlogList(this.route.snapshot.params['search_key']);
    }
    else {
      this.getBlogList();
    }
  }

  getBlogList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    this.blogService.getAllBlogList(this.userId,params).subscribe(
      res => {
        console.log(res);
        this.blogList = res['result']['bloglist'];
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

  getSearchBlogList(search_key) {
    this.blogService.getAllSearchBlogList(search_key,this.userId).subscribe(
      res => {
        //alert(res['result']['bloglist'].length);
        console.log("Search List==>",res.length);
        this.blogList = res['result']['bloglist'];
        this.blogLinks = res['result']['links'];
        this.visibleKey = true
        this.isSearch =1;
      },
      error => {
      }
    )
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

  pagination() {
    this.getBlogList();
  };

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
          this.getBlogList();
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
  goToDetails(category_slug,blog_url) {
    this.router.navigateByUrl('/' + category_slug + '/details/' + blog_url);
  }
  onChange(event: any) {
    this.blogList=[];
    this.blogListCount="";
      this.itemName = event.target.value;
      if(this.itemName == 'recent') {
        this.blogService.getMostRecentBlogList(this.userId).subscribe(
          res => {
            console.log("Item List==>",res);
            this.blogList = res['result'];
            console.log("Item Blog List==>", this.blogList);
            this.blogLinks = res['result']['links'];
            this.visibleKey = true
          },
          error => {
          }
        )
      }
      else if(this.itemName == 'popular')  {
        this.blogService.getPopularSearch(this.userId).subscribe(
          res => {
            console.log("Item List==>",res);
            this.blogList = res['result']['bloglist'];
            console.log("Item Blog List==>", this.blogList);
            this.blogLinks = res['result']['links'];
            this.visibleKey = true
          },
          error => {
          }
        )
      }
      else {
        this.getBlogList();
      }
      
  }


}
