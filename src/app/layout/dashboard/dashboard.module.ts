import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// core
import { CoreModule } from '../../core/core.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
