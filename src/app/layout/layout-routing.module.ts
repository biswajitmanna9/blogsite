import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { CouponComponent } from './coupon/coupon.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { ErrorComponent } from './error/error.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AllblogComponent } from './allblog/allblog.component';
import { StoreComponent } from './store/store.component';
import { AllstoreComponent } from './allstore/allstore.component';
import { CoupondetailsComponent } from './coupondetails/coupondetails.component';
import { CashbackComponent } from './cashback/cashback.component';
import { CashbackdetailsComponent } from './cashbackdetails/cashbackdetails.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { BankingComponent } from './banking/banking.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: '/', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'my-profile', component: MyprofileComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      { path: 'store/coupons', component: CouponComponent },
      { path: 'store/coupondetails/:id', component: CoupondetailsComponent },
      { path: 'store/cashback', component: CashbackComponent },
      { path: 'store/cashbackdetails/:id', component: CashbackdetailsComponent },
      { path: 'creditcard', component: CreditcardComponent },
      { path: 'banking', component: BankingComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'allblog', component: AllblogComponent },
      { path: 'allblog/:search_key', component: AllblogComponent },
      { path: 'store', component: StoreComponent },
      { path: 'allstore', component: AllstoreComponent },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
      { path: 'add-referral', loadChildren: './add-referral/add-referral.module#AddReferralModule', canActivate: [AuthGuard] },
      { path: '404', component: ErrorComponent },
      { path: ':cat_slug', component: BlogComponent },
      { path: ':cat_slug/details/:blog_slug', component: BlogDetailsComponent },
      { path: ':cat_slug/:sub_cat_slug', component: BlogComponent },
      { path: ':cat_slug/:sub_cat_slug/:sub_child_cat_slug', component: BlogComponent },
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
