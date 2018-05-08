import { Component, HostBinding, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  animations: [slideInOutAnimation]
})
export class PageNotFoundComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  constructor() { }

  ngOnInit() {
  }

}
