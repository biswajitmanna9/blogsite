import { Component, OnInit } from '@angular/core';
import { ReferralService } from "../../core/services/referral.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-referral',
  templateUrl: './add-referral.component.html',
  styleUrls: ['./add-referral.component.scss']
})
export class AddReferralComponent implements OnInit {

  currentLat: number;
  currentLong: number;
  companylist: any = [];
  programList: any = [];
  productList: any =[];
  form: FormGroup;
  userId: number;
  zipCode:string;
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
      product_id: ["", Validators.required],
      program_id: ["", Validators.required],
      description: [""],
      lattitude: [""],
      longitude: [""],
      zip_code:["",Validators.required],
    });

    this.getUserZipCode();
  }

  getUserZipCode() {
    var data = {
      user_id: this.userId,
      zipcode: ""
    }
    this.referralService.getZipCode(data).subscribe(
      res => {
        this.zipCode = res['result']['zipcode'];
        console.log(this.zipCode);
      },
      error => {
        console.log(error)
      }
    )
  }

  getCompanylist() {
    this.referralService.getCompanyLst().subscribe(
      res => {
        console.log(res);
        this.companylist = res['result'];
      },
      error => {
        console.log(error)
      }
    )
  }

  companyChange(id) {
    if (id != "") {
      //this.getProgrammeList(id);
      this.getProductList(id);
    }
    else {
      this.productList = [];
    }
  }

  getProductList(id) {
    this.referralService.getProductListByCompany(id).subscribe(
      res => {
        console.log(res);
        this.productList = res['result'];
      },
      error => {
        console.log(error)
      }
    )
  }

  productChange(id) {
    if (id != "") {
      this.getProgrammeList(id);
    }
    else {
      this.programList = [];
    }
  }

  getProgrammeList(id) {
    this.referralService.getProgramListByCompany(id).subscribe(
      res => {
        console.log(res);
        this.programList = res['result'];
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
            this.updateUserZipCode(this.form.value.zip_code);
            this.toastr.success("Referral code has been added successfully", '', {
              timeOut: 3000,
            });
            this.router.navigate(['/dashboard']);
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

  updateUserZipCode(zipCode) {
    var data = {
      user_id: this.userId,
      zipcode: zipCode
    }
    this.referralService.getZipCode(data).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error)
      }
    )
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
