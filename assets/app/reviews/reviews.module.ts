import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReviewsComponent } from './reviews.component';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsService } from './reviews.service';

@NgModule({
  declarations: [
    ReviewsComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    ReviewsRoutingModule
  ],
  providers: [ ReviewsService ]
})
export class ReviewsModule {}
