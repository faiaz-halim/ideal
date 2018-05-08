export class Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    services: string[];
    carPlates: string[];

    constructor(id: string, name: string, email: string, phone: string, services: string[],
                carPlates: string[]){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.services = services;
        this.carPlates = carPlates;
    }
}
