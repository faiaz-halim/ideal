export class CarDetails {
   id: string;
   plate: string;
   make: string;
   model: string;
   year: string;
   vin: string;
   type: string;
   transmission: string;
   engine: string;
   cylinders: number;
   fuel: string;

   constructor(id: string, plate: string, make: string, model: string, year: string,
               vin: string, type: string, transmission: string, engine: string,
               cylinders: number, fuel: string){
        this.id = id;
        this.plate = plate;
        this.make = make;
        this.model = model;
        this.year = year;
        this.vin = vin;
        this.type = type;
        this.transmission = transmission;
        this.engine = engine;
        this.cylinders = cylinders;
        this.fuel = fuel;
    }
}
