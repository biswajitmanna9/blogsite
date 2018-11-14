import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// core
import { CoreModule } from '../../core/core.module';

import { AddReferralRoutingModule } from './add-referral-routing.module';
import { AddReferralComponent } from './add-referral.component';

@NgModule({
  imports: [
    CommonModule,
    AddReferralRoutingModule,
    CoreModule
  ],
  declarations: [AddReferralComponent]
})
export class AddReferralModule { }
