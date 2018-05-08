export class Booking {
   id: string;
   bookingDate: string;
   time: string;
   owner:string;
   vehicle:string;
   type: string[];
   description: string;
   status:string;

   constructor(id: string, bookingDate: string, time: string, owner:string, vehicle:string,
               type: string[], description: string, status:string ){
      this.id = id;
      this.bookingDate = bookingDate;
      this.time = time;
      this.owner = owner;
      this.vehicle = vehicle;
      this.type = type;
      this.description = description;
      this.status = status;
   }
}
