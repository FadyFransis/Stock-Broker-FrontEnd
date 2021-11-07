import { Spec } from './SpecsDTO';

export class ItemSpecs {
	constructor(){

	}
    
    id: number;
	creationDate:string;
	lastUpdatedDate:string;
	recordStatus: number;
	value:string;
	valueAr:string;
	itemID: number;
	nameAr:string;
	name:string;
	specsID:number
	specs:Spec
}