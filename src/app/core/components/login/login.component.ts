import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { ToastrService } from 'ngx-toastr';

import { ReferralService } from "../../../core/services/referral.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  forgotForm: FormGroup;
  title: string;
  toggle_btn: string;
  toggle_key: boolean;
  toggle_btn_forgot:string;
  formType:number;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private referralService: ReferralService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.formType; // 2 : Forgot password Modal
    this.title = "Sign In";
    this.toggle_btn = "New user sign up";
    this.toggle_btn_forgot = "Forgot Password";
    this.loginForm = this.formBuilder.group({
      email: ["",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]
      ],
      password: ["", Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]
      ],
      password: ["", Validators.required],
      zip_code: ["", Validators.required]
    });

    this.forgotForm = this.formBuilder.group({
      email: ["",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]
      ]
    });
  }

  toggle() {
    this.toggle_key = !this.toggle_key;
    if (this.toggle_key) {
      this.formType = 1;
      this.title = "Sign Up";
      this.toggle_btn = "Back to sign in";
    }
    else {
      this.formType = 1;
      this.title = "Sign In";
      this.toggle_btn = "New user sign up";
    }
  }

  toggleForgot() {
      this.formType = 2; // 2 : Forgot Password Modal
      this.title = "Forgot Password";
      this.toggle_btn = "New user sign up"; 
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.dialogRef.close(user)
      }
    )
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.dialogRef.close(user)
      }
    )
  }

  signIn() {
    if (this.loginForm.valid) {
      this.loginService.userLogin(this.loginForm.value).subscribe(
        res => {
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userId', res['result']['id']);
          localStorage.setItem('userName', res['result']['name']);
          localStorage.setItem('userEmail', res['result']['email']);
          this.toastr.success('Login successfully', '', {
            timeOut: 3000,
          });
          this.loginService.loginStatus(true);
          this.dialogRef.close(true);
        },
        error => {
          // console.log(error)
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.loginForm)
    }
  }

  closeLogin() {
    this.dialogRef.close(true);
  }

  signUp() {
    if (this.signupForm.valid) {
      this.signupForm.value.is_subscriber= '0';
      this.loginService.userSignup(this.signupForm.value).subscribe(
        res => {
          // console.log(res)
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userId', res['result']['id']);
          localStorage.setItem('userName', res['result']['name']);
          localStorage.setItem('userEmail', res['result']['email']);
          this.toastr.success('Register successfully', '', {
            timeOut: 3000,
          });
          this.loginService.loginStatus(true);
          this.dialogRef.close(true);
          this.updateUserZipCode(res['result']['id'],this.signupForm.value.zip_code);
        },
        error => {
          // console.log(error)
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.signupForm)
    }
  }

  updateUserZipCode(user_id,zipCode) {
    var data = {
      user_id: user_id,
      zipcode: zipCode
    }
    console.log("Add Zip Code==>",data);
    this.referralService.getZipCode(data).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error)
      }
    )
  }

  forgotPassword() {
    if (this.forgotForm.valid) {
      this.loginService.userForgotPassword(this.forgotForm.value).subscribe(
        res => {
          console.log(res);
          this.toastr.success(res.result, '', {
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        },
        error => {
          // console.log(error)
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        })
    } else {
      this.markFormGroupTouched(this.forgotForm)
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
