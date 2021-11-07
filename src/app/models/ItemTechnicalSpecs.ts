import { Spec } from './SpecsDTO';

export class ItemTechnicalSpecs {
	constructor(){

	}
    
    id: number;
	creationDate:string;
	lastUpdatedDate:string;
	recordStatus: number;
	value:string;
	valueAr:string;
	itemID: number;
	specType:TechnicalSpecType;

}
export enum TechnicalSpecType
{
	Feature = 1,
	Benefit = 2,
	MoreInfo=3
}