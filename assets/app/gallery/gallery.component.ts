import { Component, HostBinding, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../animations';
import { GalleryService } from './gallery.service';
import { Album } from './album.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [slideInOutAnimation]
})
export class GalleryComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  albums:Album[];
  images:string[];
  c_header:string;
  c_paragraph:string;
  constructor(private galleryService:GalleryService) { }

  ngOnInit() {
    //this.addAlbum();
     this.galleryService.getAlbums()
        .subscribe(albums => {
           this.albums = albums;
           this.images = this.albums[0].images;
     });
  }
  setAlbum(a){
     this.images = a.images;
     this.c_header = a.name;
     this.c_paragraph = a.name;
  }
  /*addAlbum(){
    let a : Album = {
      "id": "April 23 2018Some Cars ",
      "name": "Some Cars",
      "images": [
        "./assets/images/gallery/some-cars/img1.jpg",
        "./assets/images/gallery/some-cars/img2.jpg",
        "./assets/images/gallery/some-cars/img3.jpg",
        "./assets/images/gallery/some-cars/img4.jpg",
        "./assets/images/gallery/some-cars/img5.jpg"
      ],
      "howMany": 5,
      "time": "April 22 2018"
    }
    this.galleryService.addAlbum(a)
     .subscribe(
         data => {
            console.log(" Album added : ", a )
         },
         error => {
            console.log("Cannot add Album");
         }
     );
  }*/
}
