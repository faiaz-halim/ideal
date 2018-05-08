import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutService } from './about.service';

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    AboutRoutingModule
  ],
  providers: [ AboutService ]
})
export class AboutModule {}
