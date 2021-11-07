import { City } from './CityDTO';

export class Client{
    constructor() {
        this.city = new City;
    }
         id : number;
         name : string;
         lastName : string;
         email : string;
         mobile : string;
         phone : string;
         birthDate : string;
         password : string;
         imageName : string;
         address : string;
         faceBookID : string;
         gender : number;//
         verificationCode : string;
         forgetPasswordCode : string;
         cityID : number; //
         zipCode:string;
         city : City;
         invitationCode : string;
         isActive :boolean;
         points:number;
         creationDate :Date;
         hashedPassword:string;
}
