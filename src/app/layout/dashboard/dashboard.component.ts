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
  constructor(
    private formBuilder: FormBuilder,
    private referralService: ReferralService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentLat = +localStorage.getItem('currentLat');
    this.currentLong = +localStorage.getItem('currentLong');
    console.log(this.currentLat)
    console.log(this.currentLong)
    this.getCompanylist();
    this.form = this.formBuilder.group({
      referral_code: ["", Validators.required],
      user_id: ["", Validators.required],
      company: ["", Validators.required],
      currentLat: [""],
      currentLong: [""],
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
    if (this.form.valid) {
      if (this.currentLat == undefined && this.currentLong == undefined) {
        this.toastr.error("Please allow your location", '', {
          timeOut: 3000,
        });
      }
      else {
        this.form.patchValue({
          currentLat: this.currentLat,
          currentLong: this.currentLong
        })
        this.referralService.addReferral(this.form.value).subscribe(
          res => {
            console.log(res);
            this.toastr.error("Referral code added successfully", '', {
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
