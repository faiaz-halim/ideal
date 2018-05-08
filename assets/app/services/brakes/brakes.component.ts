import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-brakes',
  templateUrl: './brakes.component.html',
  styleUrls: ['./brakes.component.css']
})
export class BrakesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  servicesPage(){
     this.router.navigate(['../'], {relativeTo: this.route});
  }
}
