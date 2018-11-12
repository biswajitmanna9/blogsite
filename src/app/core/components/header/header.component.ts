import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { BlogService } from '../../services/blog.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  categoryList: any = [];
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router,
    private loginService: LoginService
  ) {
    loginService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
  }

  ngOnInit() {
    this.loadUserInfo();
    this.getCategoryList();
  }


  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
    }
    else {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(user)
        this.loggedIn = (user != null);
        if (this.loggedIn) {
          localStorage.setItem('isLoggedin', 'true');
        }
      });
    }
  }

  private changeStatus(status: boolean) {
    if (status) {
      this.loadUserInfo();
    }
  }

  login() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
    })
  }

  logout() {
    // this.authService.signOut();
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  getCategoryList() {
    this.blogService.getCategoryList().subscribe(
      res => {
        // console.log(res)
        this.categoryList = res['result']
      },
      error => {
        // console.log(error)
      }
    )
  }

  displayDropdownCss(category: any) {
    if (category.sub_category_details != undefined) {
      if (category.sub_category_details.length > 0) {
        return 'dropdown ' + category.category_slug
      }
    }
    else if (category.sub_sub_category_details != undefined) {
      if (category.sub_sub_category_details.length > 0) {
        return 'dropdown'
      }
    }
  }

  displayDropdownToggleCss(category: any) {
    if (category.sub_category_details != undefined) {
      if (category.sub_category_details.length > 0) {
        return 'dropdown-toggle'
      }
    }
    else if (category.sub_sub_category_details != undefined) {
      if (category.sub_sub_category_details.length > 0) {
        return 'dropdown-toggle'
      }
    }
  }

  goTo(url_slug) {
    if (url_slug != "cards") {
      this.router.navigate(['/' + url_slug]);
    }

  }

}
