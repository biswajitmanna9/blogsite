import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetpasswordService } from "../../core/services/resetpassword.service";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  userEmail:string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetpasswordService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
   this.route.queryParams.subscribe(params => {
    this.userEmail = params['key'];
});
    this.resetForm = this.formBuilder.group({
      password: ["", Validators.required],
      confpassword: ["", Validators.required]
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      if (this.resetForm.value.password == this.resetForm.value.confpassword) {
       this.resetForm.value.email =  this.userEmail;
        this.resetPasswordService.userResetPassword(this.resetForm.value).subscribe(
          res => {
            this.toastr.success('Password Chnaged Succesfully', '', {
              timeOut: 3000,
            });
            this.router.navigateByUrl('/home');
          },
          error => {
            // console.log(error)
            this.toastr.error(error.error.message, '', {
              timeOut: 3000,
            });
          }
        )
      }
      else {
        this.toastr.error("Password Should be same", '', {
          timeOut: 3000,
        });
      }
      console.log(this.resetForm.value);

    } else {
      this.markFormGroupTouched(this.resetForm)
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
