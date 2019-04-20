import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Review } from './review.model';
import { Car } from '../booking/car.model';
//import { BookingService } from '../booking/booking.service';

@Injectable()
export class ReviewsService {
  baseUrl: string = 'https://idealautomotive.com.au';
  headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http ) {}

  /*getReviews():Observable<Review[]> {
      const url = `${this.baseUrl}/reviews?status=show`;
      return this.http.get(url)
        .map(response => response.json() as Review[]);
  }*/
  getReviews(){
      const url = 'https://idealauto.com.au/xreviews';
      return this.http.get(url)
        .map((response: Response) => {
            const reviews = response.json().obj;
            let transformedReviews: Review[] = [];
            for (let review of reviews) {
                transformedReviews.push(new Review (review._id, review.name,
                  review.carMake, review.carModel, review.rating, review.myReview,
                  review.comment, review.commentBy, review.status));
            }
            return transformedReviews;
        })
  }
  getCars() {
      return this.http.get('https://idealauto.com.au/cars')
          .map((response: Response) => {
              const cars = response.json().obj;
              let transformedCars: Car[] = [];

              for (let car of cars) {
                  transformedCars.push(new Car (car.name, car.models,));
              }
              return transformedCars;
       })
       .catch((error: Response) => Observable.throw(error.json()));
  }
  //----------------------------------------------------------
  addReview(result:Review){
      const url = 'https://idealauto.com.au/xreviews';
      let body = JSON.stringify(result);
      return this.http.post(url, body, {headers: this.headers})
        .map(response => response.json());
  }
}
