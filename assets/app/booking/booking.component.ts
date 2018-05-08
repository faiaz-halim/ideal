import { Component, HostBinding, OnInit} from '@angular/core';
import { slideInOutAnimation } from '../animations';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [slideInOutAnimation]
})
export class BookingComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
  }


}
