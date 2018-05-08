import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-full-service',
  templateUrl: './full-service.component.html',
  styleUrls: ['./full-service.component.css']
})
export class FullServiceComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }
  servicesPage(){
     this.router.navigate(['../'], {relativeTo: this.route});
  }
}
