import { Component, HostBinding, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../animations';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css'],
  animations: [slideInOutAnimation]
})
export class DisclaimerComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  constructor() { }

  ngOnInit() {
  }

}
