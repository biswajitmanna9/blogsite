import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../../core/components/login/login.component';
import { LoginService } from '../../core/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blogCategorySlug: string;
  blogSlug: string;
  blogDetails: any;
  blogId: number;
  isVisible: boolean;
  imageBaseUrl: string;
  blogCategoryName: string;
  blogList: any = [];
  blogCategoryId: number;
  commentForm: FormGroup;
  replyForm: FormGroup;
  userName: string;
  userId: number;
  userPic: string;
  private loggedIn: boolean;
  selectedToggleArea: number;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService
  ) {
    this.route.params.subscribe(val => {
      if (val['cat_slug']) {
        this.blogCategorySlug = val['cat_slug'];
      }
      if (val['blog_slug']) {
        this.blogSlug = val['blog_slug'];
      }
      this.loadData();
    });

    loginService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
  }

  loadData() {
    if (this.blogCategorySlug != undefined) {
      this.getCategorySlugInfo(this.blogCategorySlug)
    }
    if (this.blogSlug != undefined) {
      this.getBlogSlugInfo(this.blogSlug)
    }

    this.commentForm = this.formBuilder.group({
      title: ["", Validators.required],
      post_id: [""],
      user_id: [""],
      comment_parent: [""]
    });

    this.replyForm = this.formBuilder.group({
      title: ["", Validators.required],
      post_id: [""],
      user_id: [""],
      comment_parent: [""]
    });
    this.loadUserInfo();
  }

  loadUserInfo() {
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    }

    if (localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName');
    }

    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
    }
  }

  private changeStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }

  getCategorySlugInfo(slug) {
    this.blogService.getSlugInfo(slug).subscribe(
      res => {
        // console.log(res)
        this.blogCategoryId = res['result']['id']
        this.blogCategoryName = res['result']['title']
        this.getBlogListByCategory();
      },
      error => {
        // console.log(error)
        this.router.navigateByUrl('/404');
      }
    )
  }

  getBlogListByCategory() {
    this.blogService.getBlogListByCategory(this.blogCategoryId).subscribe(
      res => {
        // console.log(res)        
        for (var i = 0; i < res['result']['bloglist'].length; i++) {
          var x = res['result']['bloglist'][i]
          if (i < 5) {
            this.blogList.push(x)
          }
        }
      },
      error => {
        // console.log(error)
      }
    )
  }

  getBlogSlugInfo(slug) {
    this.blogService.getSlugInfo(slug).subscribe(
      res => {
        // console.log(res)
        this.blogId = +res['result']['id']
        this.getBlogDetails();
      },
      error => {
        // console.log(error)
        this.router.navigateByUrl('/404');
      }
    )
  }

  getBlogDetails() {
    this.blogService.getBlogDetails(this.blogId).subscribe(
      res => {
        console.log(res)
        this.blogDetails = res['result'];
        this.isVisible = true;
      },
      error => {
        // console.log(error)
      }
    )
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.imageBaseUrl + image})`);
  }

  goToDetails(blog_url) {
    this.router.navigateByUrl('/' + this.blogCategorySlug + '/details/' + blog_url);
  }


  toggleReplySec(id) {
    this.selectedToggleArea = id;
    this.replyForm.reset();
  }

  toggleSelectedToggleArea(id) {
    this.selectedToggleArea = id;
    this.replyForm.reset();
  }

  refreshAllData() {
    this.getBlogDetails()
  }

  comment() {
    if (!this.loggedIn) {
      this.openLoginModal()
    }
    else {
      this.commentForm.patchValue({
        post_id: this.blogId,
        user_id: this.userId,
        comment_parent: ''
      })
      if (this.commentForm.valid) {
        this.blogService.addcomment(this.commentForm.value).subscribe(
          res => {
            // console.log(res);
            this.toastr.success('Comment has been submitted', '', {
              timeOut: 3000,
            });
            this.commentForm.reset();
            this.getBlogDetails()
          },
          error => {
            // console.log(error)
          }
        )

      } else {
        this.markFormGroupTouched(this.commentForm)
      }
    }

  }

  reply(comment) {
    if (!this.loggedIn) {
      this.openLoginModal()
    }
    else {
      if (this.replyForm.valid) {

      } else {
        this.markFormGroupTouched(this.replyForm)
      }
      this.replyForm.patchValue({
        post_id: this.blogId,
        user_id: this.userId,
        comment_parent: +comment['id']
      })
      if (this.replyForm.valid) {
        this.blogService.addcomment(this.replyForm.value).subscribe(
          res => {
            // console.log(res);
            this.toastr.success('Comment has been submitted', '', {
              timeOut: 3000,
            });
            this.replyForm.reset();
            this.selectedToggleArea = null;
            this.getBlogDetails()
          },
          error => {
            // console.log(error)
          }
        )

      } else {
        this.markFormGroupTouched(this.replyForm)
      }
    }

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

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
    };
  }

}
