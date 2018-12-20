import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../../core/services/profile.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReferralService } from "../../core/services/referral.service";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  editForm: FormGroup;
  editZipForm: FormGroup;
  userId: number;
  zip:string;
  profileDetails=[];
  user_id: string;
  editProfile: boolean;
  profileImageToUpload: File = null;
  profileImage: File = null;
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router,
    private referralService: ReferralService,
  ) { }

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');
    this.editForm = this.formBuilder.group({
      name: ["", Validators.required],
      contact: ["", Validators.required],
      email: ["", Validators.required],
      zipcode:["",Validators.required],
      profile_image: [""]
    });

    // this.editZipForm = this.formBuilder.group({
    //   zip:["",Validators.required],
    // });

    this.getProfileDetails(this.userId);
    this.getUserZipCode();

  }

  onFileChange(event) {
    this.profileImage = event.target.files[0];
    console.log(this.profileImage);
  }

  getProfileDetails(id) {
    this.profileService.getProfile(id).subscribe(
      res => {
        console.log("Profile Details==>",res);
        this.profileDetails = res['result'];
        this.editProfile = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserZipCode() {
    var data = {
      user_id: this.userId,
      zipcode: ""
    }
    this.referralService.getZipCode(data).subscribe(
      res => {
        this.zip = res['result']['zipcode'];
        console.log(this.zip);
      },
      error => {
        console.log(error)
      }
    )
  }
  updateProfile() {
    if (this.editForm.valid) {
      this.editForm.value.profile_image = '';
      console.log(this.editForm.value);

      this.profileService.updatemyProfile(this.userId,this.profileImage, this.editForm.value).subscribe(
        res => {
          this.profileDetails = res['result'];
          console.log(this.profileDetails);
          localStorage.setItem('userName', res['result']['name']);
          this.profileService.updateProfileStatus(true);
          // this.userName = res['result']['name'];
          this.toastr.success('Profile Update successfully', '', {
            timeOut: 3000,
          });
          this.getProfileDetails(localStorage.getItem('userId'));
        },
        error => {
          // console.log(error)
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.editForm)
    }
  }

  // updateUserZipCode() {
  //   var data = {
  //     user_id: this.userId,
  //     zipcode: this.editZipForm.value.zip
  //   }
  //   this.referralService.getZipCode(data).subscribe(
  //     res => {
  //       console.log(res);
  //       this.toastr.success('Zip Code Update successfully', '', {
  //         timeOut: 3000,
  //       });
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }


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
