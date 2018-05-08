import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BookingComponent } from './booking.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { CancelComponent } from './cancel/cancel.component';
import { ChangeTimeComponent } from './change-time/change-time.component';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingService } from './booking.service';
import { MakeBookingComponent } from './make-booking/make-booking.component';

@NgModule({
  declarations: [
    BookingComponent,
    RescheduleComponent,
    CancelComponent,
    ChangeTimeComponent,
    MakeBookingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    BookingRoutingModule
  ],
  providers: [ BookingService ]
})
export class BookingModule {}
