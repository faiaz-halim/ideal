import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NgbTabset, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking.service';
import { Booking } from '../booking.model';
import { Customer } from '../customer.model';
import { CarDetails } from '../CarDetails.model';


@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css']
})
export class RescheduleComponent implements OnInit {
  cancelForm: FormGroup;
  bookedForm: FormGroup;
  isCustomer ="";
  showBooked:boolean = false;
  bookedAhead:Booking[];
  customer: Customer;
  //---------------------------------------------

  constructor(public formBuilder: FormBuilder, private bookingService:BookingService,
              private modalService: NgbModal, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.cancelForm = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]]
    });
    this.bookedForm = this.formBuilder.group({
       booking: ['']
    });
  }
  onMakeBooking(){
     this.router.navigate(['/booking']);
  }
  onSubmitCancel(){
    this.bookingService.getExistingCustomer(this.cancelForm.value.email)
       .subscribe(
         customer => {
           if ( customer.id ){
              this.isCustomer = "";
              this.customer = new Customer(customer.id, customer.name, customer.email,
                              customer.phone, customer.services, customer.carPlates,);
              this.bookingService.getCustomerBooking(this.customer.id, "Upfront")
                   .subscribe(
                     bookings=> {
                        this.bookedAhead = new Array();
                        //console.log(bookings);
                        for(let booking of bookings){
                           //console.log("in booking loop", bookings)
                           if(this.isBookingAhead(booking)){
                              //update data to show
                              this.bookedAhead.push(booking);
                              //console.log("booking ahead true", booking);
                              //this.showBooked = true;
                           }
                        }
                        if(this.bookedAhead.length > 0){
                           this.showBooked = true;
                           //console.log("booking ahead true", this.bookedAhead);
                        }else{
                          this.showBooked = false;
                          this.isCustomer = "There was no booking made with the supplied email address, please enter another email.";
                        }

                     },
                     error => {
                       this.showBooked = false;
                       this.isCustomer = "There was an error connecting to Server !!! , please try again.";
                     }
                   );
           }else{
              this.showBooked = false;
              this.isCustomer = "There was no booking made with the supplied email address, please enter a valid customer email.";
              console.log("customer does not exists");
           }
         },
         error => {
            this.showBooked = false;
            this.isCustomer = "There was an error connecting to Server !!! , please try again.";
         }
       );
  }
  isBookingAhead(booking:Booking):boolean{
     let xTime = 0;
     let xDate = new Date(booking.bookingDate);
     let xDateNum = xDate.getTime();
     let timeBefore = 3 * 60 * 60 * 1000;
     let now = new Date().getTime();

     //console.log(xDate);
     //console.log(xDateNum);
     if(booking.time === '9-11'){ xTime = 9 * 60 * 60 * 1000;}
     if(booking.time === '11-1'){ xTime = 11 * 60 * 60 * 1000;}
     if(booking.time === '1-3'){ xTime = 13 * 60 * 60 * 1000;}
     if(booking.time === '3-5'){ xTime = 15 * 60 * 60 * 1000;}
     if(booking.time === 'after hours'){ xTime = 17 * 60 * 60 * 1000;}

     xDateNum = xDateNum + xTime;
     if( xDateNum - timeBefore > now ){
        return true;
     }else{
        return false;
     }
  }
  onRescheduleBooking(id){
       this.router.navigate(['/booking', 'reschedule', id,]);
  }
  onCancelRescedule(){
    this.cancelForm.reset();
    this.onSubmitCancel();
    this.showBooked = false;
    this.isCustomer = " ";

  }

  }
