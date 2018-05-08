export class Message {
   "id":string;
   "name":string;
   "email":string;
   "subject":string;
   "body":string;
   "status":string;

   constructor(id:string, name:string, email:string, subject:string, body:string, status:string){
      this.id = id;
      this.name = name;
      this.email = email;
      this.subject = subject;
      this.body = body;
      this.status = status;  
   }
}
