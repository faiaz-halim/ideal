import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NgbTabset, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking.service';
import { Booking } from '../booking.model';
import { Customer } from '../customer.model';
import { CarDetails } from '../CarDetails.model';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{9}$";
  cancelForm: FormGroup;
  bookedForm: FormGroup;
  isCustomer ="";
  showBooked:boolean = false;
  bookedAhead:Booking[];
  customer: Customer;
  //---------------------------------------------
  confirmMesage1: string = "";
  confirmMesage2: string = "";
  modalReference: any;
  closeResult: string;
  extendedTime = "";

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
                        for(let booking of bookings){
                           if(this.isBookingAhead(booking)){
                              this.bookedAhead.push(booking);
                           }
                        }
                        if(this.bookedAhead.length > 0){
                           this.showBooked = true;
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
  onCancelBooking(id, c){
     let now = 0;
     let index = -1;
     for(let booked of this.bookedAhead){
        if(booked.id === id){
           now = new Date().getTime();
           index = this.customer.services.indexOf(booked.id);
           if (index > -1) {
             this.customer.services.splice(index, 1);
             this.bookingService.deleteBooking(booked)//booked.id)
             .subscribe(
                data => {
                  this.bookingService.updateCustomer(this.customer)
                   .subscribe(
                       data => {
                          booked.status = "cancelled" ;
                          this.bookingService.addBooking(booked)
                           .subscribe(
                               data => {
                                 this.confirmMesage1 = "Booking cancelled successfully.";
                                 this.confirmMesage2 = "";
                                 this.open(c);
                               },
                               error => {
                                 this.confirmMesage1 = "Booking cannot be cancelled at this time";
                                 this.confirmMesage2 = "Please try again later";
                                 this.open(c);
                               }
                           );
                       },
                       error => {
                         this.confirmMesage1 = "Booking cannot be cancelled at this time";
                         this.confirmMesage2 = "Please try again later";
                         this.open(c);
                       }
                   );
                },
                error => {
                  this.confirmMesage1 = "Booking cannot be cancelled at this time";
                  this.confirmMesage2 = "Please try again later";
                  this.open(c);
                }
           );
         }
            return;
        }
     }
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    /*this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onCloseModal(v){
    this.modalReference.close();
    this.router.navigate(['/booking/cancel']);
    this.onSubmitCancel();
  }
}
