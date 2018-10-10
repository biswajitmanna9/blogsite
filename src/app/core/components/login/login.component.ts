import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  title: string;
  toggle_btn: string;
  toggle_key: boolean;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.title = "Sign In";
    this.toggle_btn = "New user sign up";
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
      password: ["", Validators.required]
    });
  }

  toggle() {
    this.toggle_key = !this.toggle_key;
    if (this.toggle_key) {
      this.title = "Sign Up";
      this.toggle_btn = "Back to sign in";
    }
    else {
      this.title = "Sign In";
      this.toggle_btn = "New user sign up";
    }
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
          // console.log(res)
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

  signUp() {
    if (this.signupForm.valid) {
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
