import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProfileService } from "../../core/services/profile.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  editForm: FormGroup;
  newpassword: number;
  confpassword:string;
  profileDetails=[];
  user_id: string;
  editProfile: boolean;
  userId:number;
  userEmail:any;
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = +localStorage.getItem('userId');
    this.userEmail = localStorage.getItem('userEmail');
    this.editForm = this.formBuilder.group({
      newpassword: ["", Validators.required],
      confpassword: ["", Validators.required],
    });

   
  }

  updateProfile() {
    if (this.editForm.valid) {
     
    // console.log(CryptoJS.md5(this.userEmail));
    this.editForm.value.password = this.editForm.value.newpassword;
    this.editForm.value.email = this.userEmail;
    this.editForm.value.action_mode = 'change_password';
    console.log(this.editForm.value);
      this.profileService.updatePassword(this.editForm.value).subscribe(
        res => {
          // localStorage.setItem('isLoggedin', 'true');
          // localStorage.setItem('userId', res['result']['id']);
          // localStorage.setItem('userName', res['result']['name']);
          // localStorage.setItem('userEmail', res['result']['email']);
          this.toastr.success('Update Password successfully', '', {
            timeOut: 3000,
          });
          // this.loginService.loginStatus(true);
          // this.dialogRef.close(true);
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
