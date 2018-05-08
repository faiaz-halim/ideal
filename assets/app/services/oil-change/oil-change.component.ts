import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-oil-change',
  templateUrl: './oil-change.component.html',
  styleUrls: ['./oil-change.component.css']
})
export class OilChangeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  servicesPage(){
     this.router.navigate(['../'], {relativeTo: this.route});
  }
}
