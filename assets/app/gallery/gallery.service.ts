import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Album } from './album.model';


@Injectable()
export class GalleryService {
  headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http ) {}

  getAlbums() {
      return this.http.get('https://idealautomotive.com.au/albums')
          .map((response: Response) => {
              const albums = response.json().obj;
              let transformedAlbums: Album[] = [];

              for (let album of albums) {
                  transformedAlbums.push(new Album (album._id, album.name, album.images,
                                        album.howMany, album.time ));
              }
              return transformedAlbums;

          })
          .catch((error: Response) => Observable.throw(error.json()));
  }
  addAlbum(result:Album){
      const url = 'https://idealautomotive.com.au/albums';
      let body = JSON.stringify(result);
      return this.http.post(url, body, {headers: this.headers})
        .map(response => response.json());
  }
}
