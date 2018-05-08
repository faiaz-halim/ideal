import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingComponent } from './booking.component';
import { MakeBookingComponent } from './make-booking/make-booking.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { CancelComponent } from './cancel/cancel.component';
import { ChangeTimeComponent } from './change-time/change-time.component';

const bookingRoutes: Routes = [
  { path: '', component: BookingComponent, children: [
    { path: '', redirectTo: 'book', pathMatch: 'full' },
    { path: 'book', component: MakeBookingComponent },
    { path: 'reschedule', component: RescheduleComponent },
    { path: 'cancel', component: CancelComponent },
    { path: 'reschedule/:id', component: ChangeTimeComponent },
  ] }
];
@NgModule({
  imports: [
    RouterModule.forChild(bookingRoutes)
  ],
  exports: [RouterModule]
})
export class BookingRoutingModule {}
