import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyRoutingModule } from './apply-routing.module';
import { ApplyComponent } from './apply.component';

@NgModule({
  imports: [
    CommonModule,
    ApplyRoutingModule
  ],
  declarations: [ApplyComponent]
})
export class ApplyModule { }
