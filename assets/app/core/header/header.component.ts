import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isIn = false;
  constructor() { }

  ngOnInit() {
  }
  toggleState() { // click handler
      this.isIn = ! this.isIn;
  }
}
