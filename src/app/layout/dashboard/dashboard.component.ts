import { Component, OnInit } from '@angular/core';
import { ReferralService } from "../../core/services/referral.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentLat: number;
  currentLong: number;
  companylist: any = [];
  form: FormGroup;
  userId: number;
  constructor(
    private formBuilder: FormBuilder,
    private referralService: ReferralService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentLat = +localStorage.getItem('currentLat');
    this.currentLong = +localStorage.getItem('currentLong');
    this.userId = +localStorage.getItem('userId');
    this.getCompanylist();
    this.form = this.formBuilder.group({
      referral_link: ["", Validators.required],
      user_id: [this.userId, Validators.required],
      company_id: ["", Validators.required],
      lattitude: [""],
      longitude: [""],
    });
  }

  getCompanylist() {
    this.referralService.getCompanylist().subscribe(
      res => {
        console.log(res);
        this.companylist = res['result'];
      },
      error => {
        console.log(error)
      }
    )
  }

  addReferral() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.currentLat == undefined && this.currentLong == undefined) {
        this.toastr.error("Please allow your location", '', {
          timeOut: 3000,
        });
      }
      else {
        this.form.patchValue({
          lattitude: this.currentLat,
          longitude: this.currentLong
        })
        this.referralService.addReferral(this.form.value).subscribe(
          res => {
            console.log(res);
            this.toastr.success("Referral code has been added successfully", '', {
              timeOut: 3000,
            });
            this.router.navigate(['/']);
          },
          error => {
            console.log(error)
          }
        )
      }
    } else {
      this.markFormGroupTouched(this.form)
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

  isFieldValid(field: string) {
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched),
      'is-valid': this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched)
    };
  }

}
