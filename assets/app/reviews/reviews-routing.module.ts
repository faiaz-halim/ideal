import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsComponent } from './reviews.component';


const reviewsRoutes: Routes = [
   { path: '', component: ReviewsComponent},
];
@NgModule({
  imports: [
    RouterModule.forChild(reviewsRoutes)
  ],
  exports: [RouterModule]
})
export class ReviewsRoutingModule {}
