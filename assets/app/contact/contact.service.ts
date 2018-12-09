import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Message } from './message.model';


@Injectable()
export class ContactService {
  baseUrl: string = 'https://idealautomotive.com.au';
  headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http ) {}

  addMessage(message:Message){
      const url = 'https://idealautomotive.com.au/messages';
      let body = JSON.stringify(message);
      return this.http.post(url, body, {headers: this.headers})
        .map(response => response.json());
  }
}
