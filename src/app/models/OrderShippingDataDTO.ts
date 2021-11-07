import { Order } from './orderDTO';
import { City } from './CityDTO';

export class OrderShippingData {
    constructor() {
        this.order = new Order;
    }

    id :number;
	creationDate :string;
	lastUpdatedDate :string;
	recordStatus :number;
    orderID :number;//
    order : Order;
	address :string;
	landMarks:string;
	lat :string;
	lon:string;
	contactPhone :string;
	secondContactPhone :string;	
	cityID :number;//
	city:City;
	firstName:string;
	lastName:string;
	zipCode:string;
	pickFromStore:boolean;
	setDefaultAddress:boolean;
	countryPrefix:string;
}