import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { BlogService } from '../../services/blog.service';

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
    private blogService: BlogService
  ) { }

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   console.log(user)
    //   this.loggedIn = (user != null);
    //   localStorage.setItem('isLoggedin', 'true');
    // });
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
    }
    this.getCategoryList();
  }

  login() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.user = result;
        this.loggedIn = (result != null);
        localStorage.setItem('isLoggedin', 'true');
      }
    })
  }

  logout() {
    // this.authService.signOut();
    localStorage.clear();
    this.loggedIn = false;
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
        return 'dropdown'
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

}
