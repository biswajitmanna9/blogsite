import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { BlogService } from '../../services/blog.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;
  private user: SocialUser;
  loggedIn: boolean;
  categoryList: any = [];
  user_pic_letter: string;
  cards_category_list: any = [];
  stroes_category_list: any = []
  banks_category_list: any =[];
  searchKey:any;
  userId:any;

  menuList: any;
  selected: any = {};


  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private blogService: BlogService,
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) {
    loginService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
  }

  ngOnInit() {
    this.loadUserInfo();
    this.getCategoryList();

    this.searchForm = this.formBuilder.group({
      search: ["", Validators.required]
    });
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.user_pic_letter = localStorage.getItem('userName').charAt(0)
    }
    else {
      this.authService.authState.subscribe((user) => {
        this.user = user;
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
    })
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  getCategoryList() {
    this.blogService.getCategoryList().subscribe(
      res => {
        this.categoryList = res['result']
        var cards_category = this.categoryList.filter(x => x.category_slug == "cards")
        if(cards_category != undefined){
          this.cards_category_list = cards_category[0]['sub_category_details'];
        }
        var banks_category = this.categoryList.filter(x => x.category_slug == "banking")
        if(banks_category != undefined){
          this.banks_category_list = banks_category[0]['sub_category_details'];
        }

        var stores_category = this.categoryList.filter(x => x.category_slug == "stores")
        if(stores_category != undefined){
          this.stroes_category_list = stores_category[0]['sub_category_details'];
        }
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

  goToPage(url_slug) {
      this.router.navigate(['/' + url_slug]);
  }

  goToStorePage(url_slug,cat_id) {
    if(url_slug=='coupons' || cat_id==32) {
      this.router.navigate(['/store/' + url_slug]);
    }
    else if(url_slug=='cashback' || cat_id==31) {
      this.router.navigate(['/store/' + url_slug]);
    }
    else {
      this.router.navigate(['/stores/' + url_slug]);
    }
  }

  searchBlog() {
    this.searchKey = this.searchForm.value.search
    this.router.navigate(['/allblog/' + this.searchKey]);
  }

  // select(type, item, $event) {
  //   this.selected[type] = (this.selected[type] === item ? null : item);
  //   $event ? $event.stopPropagation() : null;
  // }
  // isActive(type, item) {
  //   if(item=='deals' || item=='coupon' || item=='cashback' ) {
  //     item ==1;
  //   }
  //   return this.selected[type] === item;
  // }

}
