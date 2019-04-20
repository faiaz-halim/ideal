import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { Car } from './car.model';
import { Booking } from './booking.model';
import { Customer } from './customer.model';
import { CarDetails } from './CarDetails.model';

@Injectable()
export class BookingService {
    baseUrl: string = 'https://idealautomotive.com.au';
    headers = new Headers({'Content-Type': 'application/json'});
    customer : Customer;
    constructor(private http: Http) {}

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
         .catch((err: Response) => Observable.throw(err.json()));
    }
    getBookings() {
        return this.http.get('https://idealauto.com.au/bookings')
            .map((response: Response) => {
                const bookings = response.json().obj;
                let transformedBookings: Booking[] = [];

                for (let booking of bookings) {
                    transformedBookings.push(new Booking (booking._id, booking.bookingDate,
                      booking.time, booking.owner, booking.vehicle, booking.type,
                      booking.description, booking.status));
                }
                return transformedBookings;
         })
         .catch((error: Response) => Observable.throw(error.json()));
    }
    getBooking(id:string) {
      const url = 'https://idealauto.com.au/bookings/' + id;
        return this.http.get(url)
            .map((response: Response) => {
                const booking = response.json().obj;
                let transformedBooking = new Booking (booking._id, booking.bookingDate,
                  booking.time, booking.owner, booking.vehicle, booking.type,
                  booking.description, booking.status);
                return transformedBooking;
         })
         .catch((error: Response) => Observable.throw(error.json()));
    }
    getCustomerBooking(owner:string, status:string) {
      const url = 'https://idealauto.com.au/bookings/' + owner + '/' + status;
        return this.http.get(url)
            .map((response: Response) => {
                const bookings = response.json().obj;
                let transformedBookings: Booking[] = [];
                for (let booking of bookings) {
                    transformedBookings.push(new Booking (booking._id, booking.bookingDate,
                      booking.time, booking.owner, booking.vehicle, booking.type,
                      booking.description, booking.status));
                }
                return transformedBookings;
         })
         .catch((err: Response) => Observable.throw(err.json()));
    }
    getCustomers() {
        return this.http.get('https://idealauto.com.au/customers')
            .map((response: Response) => {
                const customers = response.json().obj;
                let transformedCustomers: Customer[] = [];

                for (let customer of customers) {
                    transformedCustomers.push(new Customer (customer._id, customer.name,
                      customer.email, customer.phone, customer.services, customer.carPlates));
                }
                return transformedCustomers;
         })
         .catch((error: Response) => Observable.throw(error.json()));
    }
    getExistingCustomer(email:string) {
        const url = 'https://idealauto.com.au/customers/' + email;
        return this.http.get(url)
            .map((response: Response) => {
                const customer = response.json();
                if(customer.obj[0]){
                    let transformedCustomer = new Customer (customer.obj[0]._id, customer.obj[0].name,
                    customer.obj[0].email, customer.obj[0].phone, customer.obj[0].services, customer.obj[0].carPlates);
                    return transformedCustomer;
                }else{
                    let transformedCustomer = new Customer (null, null, null, null, null, null);
                    return transformedCustomer;
                }
         })
         .catch((err: Response) => Observable.throw(err));
    }
    getCarDetails(plate:string) {
        const url = 'https://idealauto.com.au/details/' + plate;
        return this.http.get(url)
            .map((response: Response) => {
                const detail = response.json();
                let  transformedDetails = new CarDetails (detail.obj[0]._id, detail.obj[0].plate,
                     detail.obj[0].make, detail.obj[0].model, detail.obj[0].year, detail.obj[0].vin,
                     detail.obj[0].type, detail.obj[0].transmission, detail.obj[0].engine,
                     detail.obj[0].cylinders, detail.obj[0].fuel);
                return transformedDetails;
         })
         .catch((error: Response) => Observable.throw(error.json()));
    }
    //-------------------------------------------------------------------
    addCustomer(result:Customer){
        const url = 'https://idealauto.com.au/customers';
        let body = JSON.stringify(result);
        return this.http.post(url, body, {headers: this.headers})
          .map(response => response.json());
    }
    addCarDetails(result:CarDetails){
        const url = 'https://idealauto.com.au/details';
        let body = JSON.stringify(result);
        return this.http.post(url, body, {headers: this.headers})
          .map(response => response.json());
    }
    addBooking(result:Booking){
        const url = 'https://idealauto.com.au/bookings';
        let body = JSON.stringify(result);
        return this.http.post(url, body, {headers: this.headers})
          .map(response => response.json());
    }
    addCar(result:Car){
        const url = 'https://idealauto.com.au/cars';
        let body = JSON.stringify(result);
        return this.http.post(url, body, {headers: this.headers})
          .map(response => response.json());
    }
    updateCustomer(customer: Customer) {
        const url = 'https://idealauto.com.au/customers/' + customer.id;
        let body = JSON.stringify(customer);
        return this.http.patch(url, body, {headers: this.headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    updateCarDetails(carDetail: CarDetails) {
        const url = 'https://idealauto.com.au/details/';
        let body = JSON.stringify(carDetail);
        return this.http.patch(url + carDetail.id, body, {headers: this.headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    updateBooking(booking: Booking) {
        const url = 'https://idealauto.com.au/bookings/';
        let body = JSON.stringify(booking);
        return this.http.patch(url + booking.id, body, {headers: this.headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
//----------------------------------------------------------------------------------------
    deleteBooking(booking: Booking ) {
        return this.http.delete('https://idealauto.com.au/bookings/' + booking.id)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
