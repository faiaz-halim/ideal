import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-electrical-repairs',
  templateUrl: './electrical-repairs.component.html',
  styleUrls: ['./electrical-repairs.component.css']
})
export class ElectricalRepairsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }
  servicesPage(){
     this.router.navigate(['../'], {relativeTo: this.route});
  }
}
