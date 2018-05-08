import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-service-start',
  templateUrl: './service-start.component.html',
  styleUrls: ['./service-start.component.css']
})
export class ServiceStartComponent implements OnInit {
  states: boolean[]= [true, false, false, false, false, false, false];

  constructor(private router: Router) { }

  ngOnInit() {

  }
  toggler(position:number){
     this.states[position] = ! this.states[position];
  }
  onBook(){
     this.router.navigate(['/booking']);
  }
}
