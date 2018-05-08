import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TeamMember } from './teamMember.model';


@Injectable()
export class AboutService {
  headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http ) {}

  getTeamMembers() {
      return this.http.get('http://localhost:3000/teamMembers')
          .map((response: Response) => {
              const teams = response.json().obj;
              let transformedTeams: TeamMember[] = [];

              for (let team of teams) {
                  transformedTeams.push(new TeamMember (team._id, team.name, team.position,
                                        team.picture, team.status ));
              }
              return transformedTeams;

       })
       .catch((error: Response) => Observable.throw(error.json()));
  }

  //----------------------------------------------------------
  addTeam(result:TeamMember){
      const url = 'http://localhost:3000/teamMembers';
      let body = JSON.stringify(result);
      return this.http.post(url, body, {headers: this.headers})
        .map(response => response.json());
  }
}
