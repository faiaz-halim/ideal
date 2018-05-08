export class TeamMember {
  "id":string;
  "name":string;
  "position":string;
  "picture" :string;
  "status":string;

  constructor(id:string, name:string, position:string, picture:string, status:string){
     this.id = id;
     this.name = name;
     this.position = position;
     this.picture = picture;
     this.status = status;
  }

}
