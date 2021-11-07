import { Category } from './categoryDTO';


export class ItemCategory{
    constructor() {
    }
    id: number;
	creationDate: string;
	lastUpdatedDate:string;
	recordStatus:number;
	categoryID:number;
	itemID:number;
	category:Category;
}