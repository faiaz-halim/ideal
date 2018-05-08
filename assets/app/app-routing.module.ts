import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {HomeComponent} from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'booking', loadChildren: './booking/booking.module#BookingModule'},
  { path: 'services', loadChildren: './services/services.module#ServicesModule'},
  { path: 'gallery', loadChildren: './gallery/gallery.module#GalleryModule'},
  { path: 'reviews', loadChildren: './reviews/reviews.module#ReviewsModule'},
  { path: 'about', loadChildren: './about/about.module#AboutModule'},
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule'},
  { path: 'disclaimer', loadChildren: './disclaimer/disclaimer.module#DisclaimerModule'},
  { path: 'terms', loadChildren: './terms/terms.module#TermsModule'},

  { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
