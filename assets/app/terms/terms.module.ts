import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms-routing.module';

@NgModule({
  declarations: [
    TermsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    TermsRoutingModule
  ],
})
export class TermsModule {}
