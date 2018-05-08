export class Album {
   id:string;
   name:string;
   images:string[];
   howMany:number;
   time:string;

   constructor(id:string, name:string, images:string[], howMany:number, time:string){
      this.id = id;
      this.name = name;
      this.images = images;
      this.howMany = howMany;
      this.time = time;
   }
}
