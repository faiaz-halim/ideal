import { Component, HostBinding, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../animations';
import { Router} from '@angular/router';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [slideInOutAnimation]
})
export class ServicesComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  constructor() { }

  ngOnInit() {

  }
}
