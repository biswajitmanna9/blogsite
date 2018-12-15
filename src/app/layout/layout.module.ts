import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// core
import { CoreModule } from '../core/core.module';

// component
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { CouponComponent } from './coupon/coupon.component';
import { AboutUsComponent } from './about-us/about-us.component';
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



@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CoreModule
  ],
  declarations: [LayoutComponent, HomeComponent, BlogComponent, CouponComponent, AboutUsComponent, ContactUsComponent, BlogDetailsComponent, ErrorComponent, ResetPasswordComponent, AllblogComponent, StoreComponent, AllstoreComponent, CoupondetailsComponent, CashbackComponent, CashbackdetailsComponent, CreditcardComponent, BankingComponent]
})
export class LayoutModule { }
