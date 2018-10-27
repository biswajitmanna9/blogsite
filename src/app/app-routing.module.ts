import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [  
  { path: 'apply', loadChildren: './apply/apply.module#ApplyModule', canActivate: [AuthGuard] },
  { path: '', loadChildren: './layout/layout.module#LayoutModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
