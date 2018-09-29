import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { CouponComponent } from './coupon/coupon.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';
import { BlogCategoryDetailsComponent } from './blog-category-details/blog-category-details.component';
import { CouponCategoryDetailsComponent } from './coupon-category-details/coupon-category-details.component';
import { AuthGuard } from '../core/guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: '/', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/:id', component: BlogCategoryDetailsComponent },
      { path: 'blog-details/:id', component: BlogDetailsComponent },
      { path: 'coupon', component: CouponComponent },
      { path: 'coupon/:id', component: CouponCategoryDetailsComponent },
      { path: 'coupon-details/:id', component: CouponDetailsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
