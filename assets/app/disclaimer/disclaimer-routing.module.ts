import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisclaimerComponent } from './disclaimer.component';

const disclaimerRoutes: Routes = [
    { path: '', component: DisclaimerComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(disclaimerRoutes)
  ],
  exports: [RouterModule]
})
export class DisclaimerRoutingModule {}
