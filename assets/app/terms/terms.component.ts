import { Component, HostBinding, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../animations';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  animations: [slideInOutAnimation]
})
export class TermsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  constructor() { }

  ngOnInit() {
  }

}
