import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsComponent } from './terms.component';

const termsRoutes: Routes = [
      { path: '', component: TermsComponent},
];
@NgModule({
  imports: [
    RouterModule.forChild(termsRoutes)
  ],
  exports: [ RouterModule ]
})
export class TermsRoutingModule {}
