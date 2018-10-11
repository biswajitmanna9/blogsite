import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
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

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    JwSocialButtonsModule,
    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//
    SocialLoginModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    TestComponent,
    LoginComponent,
    BlogListComponent,
    CardListComponent,
    ReplyTreeComponent
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    JwSocialButtonsModule,
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
    ReplyTreeComponent
  ],
  entryComponents: [
    LoginComponent
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
        LoginService
      ]
    };
  }
}
