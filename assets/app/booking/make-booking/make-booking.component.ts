import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NgbTabset, NgbModal, ModalDismissReasons,  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking.service';
import { Car } from '../car.model';
import { Booking } from '../booking.model';
import { Customer } from '../customer.model';
import { CarDetails } from '../CarDetails.model';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css'],
  providers: [ NgbTabset,  NgbActiveModal ]
})
export class MakeBookingComponent implements OnInit {
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{9}$";
  cars:Car[]=[];
  showCarDetails = false;
  customers:Customer[]=[];
  customer: Customer;
  carDetails: CarDetails;
  isNewCustomer = true;
  isNewCar = false;
  bookings:Booking[] = [];
  booking:Booking;
  todayService = "";
  bookingsArr = new Array();
  index:number = 0;
  oneForm: FormGroup;
  twoForm: FormGroup;
  step3: boolean = true;
  finalForm: FormGroup;
  agree = false;
  //----------------------------------------------
  isStep2Disabled:boolean = true;
  isStep3Disabled:boolean = true;
  isStep4Disabled:boolean = true;

  years:string[]=[];
  //----------------------------------------------
  maxNumDays = 30;
  dailySlots = 5;
  today:Date = new Date();
  oneDay:number = 24 * 60 * 60 * 1000;
  oneWeek:number = 7 * this.oneDay;
  oneMonth:number = 28 * this.oneDay;
  displayedDate:Date = this.today;
  last = this.today.getTime() + this.oneMonth;
  lastDate:Date = new Date(this.last);
  splitedDate = {
     day : '',
     month :'',
     dd :0,
     year :0
   };
  dateCounter = 0;
  isBackDay:boolean = true;
  isBackWeek:boolean = true;
  isNextDay:boolean = false;
  isNextWeek:boolean = false;
  availability = ["Unavailable", "Unavailable", "Unavailable", "Unavailable", "Unavailable"];
  submittedDate:string ='';
  submittedTime:string ='';
  //----------------------------------------------
  b9_11:boolean = false;
  b11_1:boolean = false;
  b1_3:boolean = false;
  b3_5:boolean = false;
  bAfter:boolean = false;
  //---------------------------------------------
  yearSetter ='';//'Select Year';
  makeSetter = '';// 'Select Car';
  modelSetter = ''; //'Select Model';
  engineSetter = '';// 'Engine Size';
  vinSetter = '';
  typeSetter = '';
  cylindersSetter = '';//'No. of Cylinders';
  transmissionSetter = '';//'Select Transmission';
  fuelSetter = '';//'Select Fuel';
  //-----------------------------------------------
  confirmMesage1: string = "";
  confirmMesage2: string = "";
  modalReference: any;
  closeResult: string;

  @ViewChild('tabs') tabs: NgbTabset;

  constructor(public formBuilder: FormBuilder, private bookingService:BookingService,
              private modalService: NgbModal, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    //this.addCar();
    this.years.push('Select Year');
    this.years.push('Not Sure');
    for(let i=2018; i>=1970; --i){
       this.years.push(i.toString());
     }
     for(let i = 0; i<this.maxNumDays; i++){
         this.bookingsArr[i]= new Array;
         for(let j = 0; j<this.dailySlots; j++){
             this.bookingsArr[i][j]= false;
         }
     }
     this.bookingService.getCars()
        .subscribe(cars => {
            this.cars = cars;
     });
     this.oneForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required,Validators.pattern(this.mobnumPattern)]],
        services: ['', Validators.required],
        otherDescription: ['']
     });
     this.twoForm = this.formBuilder.group({
        make: ['Select Car'],
        model: ['Select Model'],
        year: [''],
        vin: [''],
        type:[''],
        transmission: [''],
        engine: [''],
        cylinders: [''],
        plate: ['', Validators.required],
        fuel: ['']
    });
    this.finalForm = this.formBuilder.group({
        agree:['', Validators.required]
    })
    this.bookingService.getBookings()
       .subscribe(bookings => {
           this.bookings = bookings;
           let bookingDate = new Date();
           let splitted = this.splitDate(this.today);
           let date00String = splitted.month + ' ' + splitted.dd + ' ' + splitted.year;
           let today00 = new Date(date00String);
           let today = today00.getTime();
           let i = 0;
           let j = 0;
           let time = '';
           for(let booking of this.bookings){
              bookingDate = new Date (booking.bookingDate);
              let bookingDateMillisecs = bookingDate.getTime();
              if(bookingDateMillisecs >= today && booking.status === "Upfront" ){
                //can only book online so no need to campare for upper limit, cant exceed 30
                 i = (bookingDateMillisecs - today) / this.oneDay;
                 if(booking.time === "9:00am - 11:00am"){
                    j = 0;
                 }else if( booking.time === "11:00am - 1:00pm"){
                    j = 1;
                 }else if( booking.time === "1:00pm - 3:00pm"){
                    j = 2;
                 }else if( booking.time === "3:00pm - 5:00pm"){
                    j = 3;
                 }else { j = 4}
                 //console.log(i,j);
                 this.bookingsArr[i][j] = true;
               }
            }
            // only allow booking 2 hours before
            let nowNow = new Date();
            let nowHour = nowNow.getHours();
            if(nowHour + 2 > 9){ this.bookingsArr[0][0] = true; }
            if(nowHour + 2 > 11){ this.bookingsArr[0][1] = true; }
            if(nowHour + 2 > 13){ this.bookingsArr[0][2] = true; }
            if(nowHour + 2 > 15){ this.bookingsArr[0][3] = true; }
            if(nowHour + 2 > 17){ this.bookingsArr[0][4] = true; }
            //console.log(nowHour + 2);
            // initialize availability for first day
            this.availability[0] = this.bookingsArr[0][0] ? "Unavailable" : "Available";
            this.availability[1] = this.bookingsArr[0][1] ? "Unavailable" : "Available";;
            this.availability[2] = this.bookingsArr[0][2] ? "Unavailable" : "Available";
            this.availability[3] = this.bookingsArr[0][3] ? "Unavailable" : "Available";
            this.availability[4] = this.bookingsArr[0][4] ? "Unavailable" : "On Request";

    });
    this.splitedDate = this.splitDate(this.today);
  }
  /*addCar(){
    let car: Car = {
      "name": "Chrysler",
      "models": [
        "Select Model",
        "300",
        "300C",
        "Crossfire",
        "Grand Voyager",
        "Neon",
        "Sebring",
        "Sebring Cabrio",
        "Voyager"
      ]
    }
    this.bookingService.addCar(car)
     .subscribe(
         data => {
            console.log(" album added : ", car )
         },
         error => {
            console.log("Cannot add album");
         }
     );
  }*/

  onCancelBooking(){
     this.router.navigate(['/booking/cancel']);
  }
  onRescheduleBooking(){
     this.router.navigate(['/booking/reschedule']);
  }
  onSubmitOne(){
      this.bookingService.getExistingCustomer(this.oneForm.value.email)
         .subscribe(result => {
             let id = "";
             let services = [];
             let carPlates = [];
             this.todayService = this.oneForm.value.services;
             if ( result.id ){
                this.isNewCustomer = false;
                id = result.id;
                services = result.services;
                carPlates = result.carPlates;
             }
             this.customer = new Customer(id, this.oneForm.value.name, this.oneForm.value.email,
             this.oneForm.value.phone, services, carPlates);
             this.isStep2Disabled = false;
         });
  }
  proceedStep2(){
    this.tabs.select('step2');
  }
  onSubmitTwo(){
      this.carDetails = new CarDetails (this.twoForm.value.plate,
      this.twoForm.value.plate.toUpperCase(),this.twoForm.value.make,
      this.twoForm.value.model, this.twoForm.value.year, this.twoForm.value.vin,
      this.twoForm.value.type, this.twoForm.value.transmission,
      this.twoForm.value.engine, this.twoForm.value.cylinders, this.twoForm.value.fuel);

      if(this.isNewCustomer ){
        this.customer.carPlates.push(this.carDetails.plate);
      }else{
         let check = this.customer.carPlates.indexOf(this.carDetails.plate);
         if (check == -1){
             this.customer.carPlates.push(this.carDetails.plate);
             this.isNewCar = true;
         }
      }
      this.isStep3Disabled = false;

  }
  proceedStep3(){
    this.tabs.select('step3');
  }
  onSubmitThree(){
      let typeArr = [];
      let time = "";
      if(this.submittedTime === "9:00am - 11:00am" ){time = "0911"}
      else if(this.submittedTime === "11:00am - 1:00pm" ){time = "1113"}
      else if(this.submittedTime === "1:00pm - 3:00pm" ){time = "1315"}
      else if(this.submittedTime === "3:00pm - 5:00pm" ){time = "1517"}
      else {time = "1719"}

      this.submittedDate = this.splitedDate.month + ' ' + this.splitedDate.dd + ' ' + this.splitedDate.year;
      let id = "";
      typeArr.push(this.todayService);
      this.booking = new Booking (id, this.submittedDate, this.submittedTime, this.customer.id,
      this.carDetails.plate, typeArr, this.todayService + this.oneForm.value.otherDescription, "Upfront" );
      this.isStep4Disabled = false;
  }
  proceedStep4(){
    this.tabs.select('step4');
  }
  finalSubmit(c){
      if(this.isNewCustomer){
        this.bookingService.addCarDetails(this.carDetails)
         .subscribe(
             data => {
                 this.bookingService.addCustomer(this.customer)
                  .subscribe(
                      data => {
                          this.booking.owner = data.obj._id;
                          this.customer.id =  data.obj._id;
                          this.bookingService.addBooking(this.booking)
                           .subscribe(
                               data => {
                                   this.customer.services.push(data.obj._id);
                                   this.bookingService.updateCustomer(this.customer)
                                   .subscribe(
                                       data => {
                                            this.confirmMesage1 = "Thank you for making a booking with us.";
                                            this.confirmMesage2 = "We look forward to seeing you.";
                                            this.open(c);
                                       },
                                       error => {
                                            this.confirmMesage1 = "Server error!, connection to server failed";
                                            this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                                            this.open(c);
                                       }
                                    );
                               },
                               error => {
                                   this.confirmMesage1 = "Server error!, connection to server failed";
                                   this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                                   this.open(c);
                               }
                           );

                      },
                     error => {
                          this.confirmMesage1 = "Server error!, connection to server failed";
                          this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                          this.open(c);
                      }
                  );
             },
             error => {
                 this.confirmMesage1 = "Server error!, connection to server failed";
                 this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                 this.open(c);
             }
         );
      }else{
        if(this.isNewCar){
          this.bookingService.addCarDetails(this.carDetails)
           .subscribe(
               data => {
                   this.bookingService.updateCustomer(this.customer)
                   .subscribe(
                       data => {
                            this.booking.owner = this.customer.id;
                            this.bookingService.addBooking(this.booking)
                             .subscribe(
                                 data => {
                                     this.customer.services.push(data.obj._id);
                                     this.bookingService.updateCustomer(this.customer)
                                     .subscribe(
                                         data => {
                                              this.booking.owner = data.obj._id;
                                              this.confirmMesage1 = "Thank you for making a booking with us.";
                                              this.confirmMesage2 = "We look forward to seeing you.";
                                              this.open(c);
                                         },
                                         error => {
                                              this.confirmMesage1 = "Server error!, connection to server failed";
                                              this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                                              this.open(c);
                                         }
                                      );
                                 },
                                 error => {
                                     this.confirmMesage1 = "Server error!, connection to server failed";
                                     this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                                     this.open(c);
                                 }
                             );

                       },
                       error => {
                            this.confirmMesage1 = "Server error!, connection to server failed";
                            this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                            this.open(c);
                       }
                   );

               },
               error => {
                   this.confirmMesage1 = "Server error!, connection to server failed";
                   this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                   this.open(c);
               }
           );
        }else{
          this.booking.owner = this.customer.id;
          this.bookingService.addBooking(this.booking)
           .subscribe(
               data => {
                   this.customer.services.push(data.obj._id);
                   this.bookingService.updateCustomer(this.customer)
                   .subscribe(
                       data => {
                            this.booking.owner = data.obj._id;
                            this.confirmMesage1 = "Thank you for making a booking with us.";
                            this.confirmMesage2 = "We look forward to seeing you.";
                            this.open(c);
                       },
                       error => {
                            this.confirmMesage1 = "Server error!, connection to server failed";
                            this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                            this.open(c);
                       }
                    );
               },
               error => {
                   this.confirmMesage1 = "Server error!, connection to server failed";
                   this.confirmMesage2 = "Please try again shortly, or call 02 97262301.";
                   this.open(c);
               }
           );
        }

      }
  }
  onCancel(){
     this.tabs.select('step1');
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  beforeDismiss(){
    this.router.navigate(['/']);
    return true;
  }
  onCloseModal(v){
    this.modalReference.close();
    this.router.navigate(['/']);
  }
  checkPlateExist(plate){
     console.log("Entered Check existing plate: this.isNewCustomer = ", this.isNewCustomer);
     if(!this.isNewCustomer){
       for(let carPlate of this.customer.carPlates){
         if(plate === carPlate){
          //console.log('its old car');
            this.isNewCar = false;
            this.bookingService.getCarDetails(plate)
             .subscribe(carDetails => {
                    console.log("CarDetails", carDetails);
                    this.carDetails = carDetails;
                    this.yearSetter = this.carDetails.year;
                    this.makeSetter = this.carDetails.make;
                    this.setCar(this.carDetails.make);
                    this.modelSetter = this.carDetails.model;
                    this.engineSetter = this.carDetails.engine;
                    this.vinSetter = this.carDetails.vin;
                    this.typeSetter = this.carDetails.type;
                    this.cylindersSetter ?  this.carDetails.cylinders.toString() : this.carDetails.cylinders;
                    this.transmissionSetter = this.carDetails.transmission;
                    this.fuelSetter = this.carDetails.fuel;
                });
        }
     }
  }
}
setCar(car){
     for(let i=0; i<this.cars.length; ++i){
        if(this.cars[i].name === car){
           this.index = i;
           break;
        }
     }
  }
  splitDate(d:Date):{day:string, month:string, dd:number, year:number} {
    let splited = {
       'day' : '',
       'month':'',
       'dd':0,
       'year':0
     };
    let day = d.getDay();
    let month = d.getMonth();
    let days:string[]= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months:string[]=['January','February','March','April','May','June','July','August',
                         'September','October','November','December']
    for (let i=0; i<days.length; ++i){
      if(day === i){
         splited.day = days[i];
      }
    }
    for (let i=0; i<months.length; ++i){
      if(month === i){
         splited.month = months[i];
      }
    }
     splited.dd = d.getDate();
     splited.year = d.getFullYear();
     return (splited);
  }
  onBackDay(){
     --this.dateCounter;
     this.timeButtonsState('backDay');
  }
  onBackWeek(){
       this.dateCounter = this.dateCounter - 7;
       this.timeButtonsState('backWeek');
  }
  onNextDay(){
      ++this.dateCounter;
      this.timeButtonsState('nextDay');
  }
  onNextWeek(){
       this.dateCounter = this.dateCounter + 7;
       this.timeButtonsState('nextWeek');
  }
  timeButtonsState(pressedButton:string){
      let temp = this.displayedDate.getTime();

      if(pressedButton === 'backDay'){
         temp = temp - this.oneDay;
      }else if(pressedButton === 'backWeek'){
         temp = temp - this.oneWeek;
      }else if(pressedButton === 'nextDay'){
        temp = temp + this.oneDay;
      }else if(pressedButton === 'nextWeek'){
        temp = temp + this.oneWeek;
      }
      if(temp === this.today.getTime()){
         this.isBackDay = true;
         this.isBackWeek= true;
         this.isNextDay = false;
         this.isNextWeek = false;
         this.displayedDate = new Date(temp);
         this.splitedDate = this.splitDate(this.displayedDate);
      }
      else if(temp > this.today.getTime() && (temp < this.today.getTime() + this.oneWeek)){
          this.isBackDay = false;
          this.isBackWeek = true;
          this.isNextDay = false;
          this.isNextWeek = false;
          this.displayedDate = new Date(temp);
          this.splitedDate = this.splitDate(this.displayedDate);
      }
      else if(temp >= this.today.getTime() + this.oneWeek && temp <= (this.today.getTime() + (this.oneMonth - this.oneWeek)) ){
          this.isBackDay = false;
          this.isBackWeek= false;
          this.isNextDay = false;
          this.isNextWeek = false;
          this.displayedDate = new Date(temp);
          this.splitedDate = this.splitDate(this.displayedDate);
      }
      else if(temp > this.today.getTime() + (this.oneMonth - this.oneWeek) && (temp < this.today.getTime() + this.oneMonth)){
          this.isBackDay = false;
          this.isBackWeek= false;
          this.isNextDay = false;
          this.isNextWeek = true;
          this.displayedDate = new Date(temp);
          this.splitedDate = this.splitDate(this.displayedDate);
      }
      else if(temp === this.today.getTime() + this.oneMonth){
          this.isBackDay = false;
          this.isBackWeek= false;
          this.isNextDay = true;
          this.isNextWeek = true;
          this.displayedDate = new Date(temp);
          this.splitedDate = this.splitDate(this.displayedDate);
      }
      else if(temp > this.today.getTime() + this.oneMonth){
          this.isBackDay = false;
          this.isBackWeek= false;
          this.isNextDay = true;
          this.isNextWeek = true;
          this.displayedDate = new Date(this.today.getTime() + this.oneMonth);
          this.splitedDate = this.splitDate(this.displayedDate);
      }
      this.availability[0] = this.bookingsArr[this.dateCounter][0] ? "Unavailable" : "Available";
      this.availability[1] = this.bookingsArr[this.dateCounter][1] ? "Unavailable" : "Available";;
      this.availability[2] = this.bookingsArr[this.dateCounter][2] ? "Unavailable" : "Available";
      this.availability[3] = this.bookingsArr[this.dateCounter][3] ? "Unavailable" : "Available";
      this.availability[4] = this.bookingsArr[this.dateCounter][4] ? "Unavailable" : "On Request";

      this.b9_11 = false;
      this.b11_1 = false;
      this.b1_3 = false;
      this.b3_5 = false;
      this.bAfter = false;
      this.step3 = true; //step 4 proceed button controller
   }
   timeClicked(value){
     //get initial values so you can return to them later after toggling
     let time0Value = this.availability[0];
     let time1Value = this.availability[1];
     let time2Value = this.availability[2];
     let time3Value = this.availability[3];
     let time4Value = this.availability[4];

     if(value === 0){
       if(this.availability[value] === "Available"){
           this.availability[value] = "Selected";
           this.toggleState(value);
           this.submittedTime = "9:00am - 11:00am";
           this.step3 = false;
       }else if(this.availability[value] === "Selected"){
          this.availability[value] = "Available";
          this.toggleState(value);
          this.step3 = true;
       }else{

       }
       this.availability[4] = time4Value;//"On Request";
       this.bAfter = false;
       this.availability[1] = time1Value;//"Available";
       this.b11_1 = false;
       this.availability[2] = time2Value;//"Available";
       this.b1_3 = false;
       this.availability[3] = time3Value;//"Available";
       this.b3_5 = false;
     }
     if(value === 1){
       if(this.availability[value] === "Available"){
           this.availability[value] = "Selected";
           this.toggleState(value);
           this.submittedTime = "11:00am - 1:00pm";
           this.step3 = false;
       }else{
          this.availability[value] = "Available";
          this.toggleState(value);
          this.step3 = true;
       }
       this.availability[0] = time0Value;
       this.b9_11 = false;
       this.availability[4] = time4Value;
       this.bAfter = false;
       this.availability[2] = time2Value;
       this.b1_3 = false;
       this.availability[3] = time3Value;
       this.b3_5 = false;
     }
     if(value === 2){
       if(this.availability[value] === "Available"){
           this.availability[value] = "Selected";
           this.toggleState(value);
           this.submittedTime = "1:00pm - 3:00pm";
           this.step3 = false;
       }else{
          this.availability[value] = "Available";
          this.toggleState(value);
          this.step3 = true;
       }
       this.availability[0] = time0Value;
       this.b9_11 = false;
       this.availability[1] = time1Value;
       this.b11_1 = false;
       this.availability[4] = time4Value;
       this.bAfter = false;
       this.availability[3] = time3Value;
       this.b3_5 = false;
     }
     if(value === 3){
       if(this.availability[value] === "Available"){
           this.availability[value] = "Selected";
           this.toggleState(value);
           this.submittedTime = "3:00pm - 5:00pm";
           this.step3 = false;
       }else{
          this.availability[value] = "Available";
          this.toggleState(value);
          this.step3 = true;
       }
       this.availability[0] = time0Value;
       this.b9_11 = false;
       this.availability[1] = time1Value;
       this.b11_1 = false;
       this.availability[2] = time2Value;
       this.b1_3 = false;
       this.availability[4] = time4Value;
       this.bAfter = false;

     }
     if(value === 4){
        if(this.availability[value] === "On Request"){
            this.availability[value] = "Selected";
            this.toggleState(value);
            this.submittedTime = "after hours";
            this.step3 = false;
        }else{
           this.availability[value] = "On Request";
           this.toggleState(value);
           this.step3 = true;
        }
        this.availability[0] = time0Value;
        this.b9_11 = false;
        this.availability[1] = time1Value;
        this.b11_1 = false;
        this.availability[2] = time2Value;
        this.b1_3 = false;
        this.availability[3] = time3Value;
        this.b3_5 = false;
      }
    }
    toggleState(value) { // click handler
        if(value === 0) {this.b9_11 = ! this.b9_11;}
        else if (value === 1) {this.b11_1 = ! this.b11_1;}
        else if (value === 2) {this.b1_3 = ! this.b1_3;}
        else if (value === 3) {this.b3_5 = ! this.b3_5;}
        else if (value === 4) {this.bAfter = ! this.bAfter;}
    }

}
