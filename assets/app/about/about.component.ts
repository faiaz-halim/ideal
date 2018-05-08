import { Component, HostBinding, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../animations';
import { AboutService } from './about.service';
import { TeamMember } from './teamMember.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [slideInOutAnimation]
})
export class AboutComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  teamMembers: TeamMember [];

  constructor(private aboutService:AboutService) { }

  ngOnInit() {
    //this.addTeam();
    this.aboutService.getTeamMembers()
       .subscribe(team => {
          this.teamMembers = team;
    });
  }
  /*addTeam(){
    let t : TeamMember = {
      "id": "3",
      "name": "Ken",
      "position": "Automobile Mechanic",
      "picture": "./assets/images/team/ken.jpg",
      "status": "Active"
    }
    this.aboutService.addTeam(t)
     .subscribe(
         data => {
            console.log(" Team Member added : ", t )
         },
         error => {
            console.log("Cannot add Team Member");
         }
     );
  }*/
}
