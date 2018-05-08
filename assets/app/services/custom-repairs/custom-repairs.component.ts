import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-custom-repairs',
  templateUrl: './custom-repairs.component.html',
  styleUrls: ['./custom-repairs.component.css']
})
export class CustomRepairsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }
  servicesPage(){
     this.router.navigate(['../'], {relativeTo: this.route});
  }
}
