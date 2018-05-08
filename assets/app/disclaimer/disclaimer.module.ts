import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DisclaimerComponent } from './disclaimer.component';
import { DisclaimerRoutingModule } from './disclaimer-routing.module';


@NgModule({
  declarations: [
    DisclaimerComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    DisclaimerRoutingModule
  ]
})
export class DisclaimerModule {}
