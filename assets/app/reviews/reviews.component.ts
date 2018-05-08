import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTabset, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { slideInOutAnimation } from '../animations';
import { ReviewsService } from './reviews.service';
import { Review } from './review.model';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../booking/car.model';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [NgbRatingConfig],
  animations: [slideInOutAnimation]
})
export class ReviewsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  readonly = false;
  currentRate = 5;
  overallRate = 0;
  totalReviews = 0;
  reviewForm: FormGroup;
  reviews:Review[]=[];
  //----------------------------------------------
  cars:Car[]=[];
  index:number = 0;
  //----------------------------------------------
  confirmMesage1: string = "";
  confirmMesage2: string = "";
  modalReference: any;
  closeResult: string;

  constructor(public formBuilder: FormBuilder, private reviewsService:ReviewsService,
              config: NgbRatingConfig, private modalService: NgbModal) {
          config.max = 5;
          config.readonly = true;
  }

  ngOnInit() {
    //this.addReview();
    this.reviewsService.getCars()
       .subscribe(cars => {
           this.cars = cars;
    });
    this.reviewForm = this.formBuilder.group({
       name: ['', Validators.required],
       make: ['Select car', Validators.required],
       model:['Select Model', Validators.required],
       text:[''],
       other: ['']
    });
    this.reviewsService.getReviews()
       .subscribe(reviews => {
           let sum = 0;
           this.reviews = reviews;
           this.totalReviews = this.reviews.length;
           for(let i=0; i<this.totalReviews; ++i){
             sum = sum + this.reviews[i].rating;
           }
           this.overallRate = sum / this.totalReviews;
        });
  }

  onSubmit(c){
    let id = '';//(this.totalReviews+1).toString() + this.reviewForm.value.name +
               //this.reviewForm.value.make + this.reviewForm.value.model;
    let review = new Review(id, this.reviewForm.value.name, this.reviewForm.value.make,
            this.reviewForm.value.model, this.currentRate, this.reviewForm.value.text,"","", "pending");
        this.reviewsService.addReview(review)
         .subscribe(
             data => {
                this.confirmMesage1 = "Your Review has been added. Thank you.";
             },
             error => {
                 this.confirmMesage1 = "Your review cannot be added at this time.";
                 this.confirmMesage2 = "Please try again later.";
             }
         );
     this.open(c);
  }
  setCar(car){
       //console.log(car);
       for(let i=0; i<this.cars.length; ++i){
          if(this.cars[i].name === car){
             this.index = i;
             break;
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
      this.reviewForm.reset();
    }
    /*addReview(){
      let r : Review = {
        "id": "6",
        "name": "Ade",
        "carMake": "BMW",
        "carModel": "i8",
        "rating": 4,
        "myReview": "Just testing. lol.",
        "comment": "",
        "commentBy": "",
        "status": "pending"
      }
      this.reviewsService.addReview(r)
       .subscribe(
           data => {
              console.log(" Review added : ", r )
           },
           error => {
              console.log("Cannot add Review");
           }
       );
    }*/
}
