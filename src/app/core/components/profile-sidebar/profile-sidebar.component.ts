//import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

// services
import { LoginService } from '../../../core/services/login.service';
import { ProfileService } from '../../../core/services/profile.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {
  loggedIn: boolean;
  profileDetails: any;
  user_id: string;
  imageBaseUrl: string;
  name: string;
  profile_image:any;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private profileService: ProfileService,
  ) { 
    profileService.getProfileUpdateStatus.subscribe(status => this.profileUpdateStatus(status));
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.user_id = localStorage.getItem('userId');
    this.getProfileDetails(this.user_id);
  }

  getProfileDetails(id) {
    this.profileService.getProfile(id).subscribe(
      res => {
        this.profileDetails = res['result'];
        this.name = res['result']['name'];
        this.profile_image = res['result']['profile_image'];
        console.log(this.profileDetails);
      },
      error => {
        console.log(error);
      }
    );
  }

  private profileUpdateStatus(status: boolean) {
    if (status) {
      this.getProfileDetails(this.user_id);
    }
  }


}
