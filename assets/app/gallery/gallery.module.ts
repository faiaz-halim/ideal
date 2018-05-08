import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryService } from './gallery.service';

@NgModule({
  declarations: [
     GalleryComponent
  ],
  imports: [
     CommonModule,
     NgbModule,
     GalleryRoutingModule
  ],
  providers: [ GalleryService ]
})
export class GalleryModule {}
