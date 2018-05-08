import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pinkslips',
  templateUrl: './pinkslips.component.html',
  styleUrls: ['./pinkslips.component.css']
})
export class PinkslipsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  servicesPage(){
     this.router.navigate(['../'], {relativeTo: this.route});
  }
}
