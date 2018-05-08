import { Component, HostBinding, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../animations';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideInOutAnimation]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  constructor(private router: Router) { }

  ngOnInit() {

  }
  onBook(){
      this.router.navigate(['/booking']);
  }
}
