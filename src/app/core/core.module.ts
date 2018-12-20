import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
// import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { environment } from '../../environments/environment';
// social login
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GoogleOAuthClientId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.FacebookAppId)
  }
]);

export function provideConfig() {
  return config;
}


// services
import { BlogService } from './services/blog.service';
import { NewsletterService } from './services/newsletter.service';
import { LoginService } from './services/login.service';
import { ReferralService } from './services/referral.service';
import { ResetpasswordService } from './services/resetpassword.service';
import { CouponService } from './services/coupon.service';
import { StoreService } from './services/store.service';
import { CashbackService } from './services/cashback.service';
import { ProfileService } from './services/profile.service';

// guard
import { AuthGuard } from './guard/auth.guard';

// Material
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatStepperIntl, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule,
} from '@angular/material';

// component
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { ReplyTreeComponent } from './components/reply-tree/reply-tree.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';

import { OwlModule } from 'ngx-owl-carousel';
import { LoadingComponent } from './components/loading/loading.component';
import { AdvertiseComponent } from './components/advertise/advertise.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      apiKey: 'AIzaSyB3FKbaqonmY-bDPanbzJSH9U7HXF8dpS4',
      libraries: ["places"]
    }),
    // JwSocialButtonsModule,
    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//
    SocialLoginModule,
    OwlModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    TestComponent,
    LoginComponent,
    BlogListComponent,
    CardListComponent,
    ReplyTreeComponent,
    SideNavComponent,
    LoadingComponent,
    AdvertiseComponent,
    ProfileSidebarComponent
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    // JwSocialButtonsModule,
    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//
    SocialLoginModule,
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    TestComponent,
    BlogListComponent,
    CardListComponent,
    ReplyTreeComponent,
    SideNavComponent,
    OwlModule,
    LoadingComponent,
    ProfileSidebarComponent
  ],
  entryComponents: [
    LoginComponent,
    AdvertiseComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        {
          provide: AuthServiceConfig,
          useFactory: provideConfig
        },
        BlogService,
        NewsletterService,
        LoginService,
        ReferralService,
        ResetpasswordService,
        CouponService,
        StoreService,
        CashbackService,
        ProfileService
      ]
    };
  }
}
