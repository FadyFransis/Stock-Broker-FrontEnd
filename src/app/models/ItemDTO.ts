import { ItemPrice } from './ItemPriceDTO';
import { ItemsAccessory } from './ItemsAccessoryDTO';
import { ItemSpecs } from './ItemSpecsDTO';
import { CompanyBrand } from './CompanyBrandDTO';
import { Category } from './categoryDTO';
import { ItemCategory } from './ItemCategoryDTO';
import { Nation } from './NationDTO';
import { ItemTechnicalSpecs } from './ItemTechnicalSpecs';
import { ItemRate } from './ItemRateDTO';
import { ItemImage } from './ItemImagesDTO';

export class Item {
	constructor(init?:Partial<Item>)
	{
		 Object.assign(this,init)
		 this.itemImages = new Array<ItemImage>();
	}
	

    id:number;
	creationDate:string;
	lastUpdatedDate:string;
	recordStatus:number;
	name:string;
	description:string;
	nameAr:string;
	descriptionAr:string;
	iconName:string;
	companyBrandID:number;
	stockCount:number;
	detailedDescription: string;
	metric:number;
	size:number;
	modelNumber:string;
	code:string;
	power:string;
	type:ProductType;
	itemPrices:ItemPrice[];
	childAccessories: ItemsAccessory[];
	itemSpecs:ItemSpecs[];
	itemRates:ItemRate[];
	comparestrvalue:string;
	addedToCompare:boolean;
	totalRates:number;
	companyBrand:CompanyBrand;
	nationID:number;
	nation:Nation;
	metaKeys:string;
	metaKeysAR:string;
	categoryID:number[];
	specID:number;
	price:number;
	value:number;
	valueAr:number;
	itemCategory:ItemCategory[];
	brandName:string;
	brandNameAr:string;
	nationName:string;
	nationNameAr:string;
	itemPrice:number;
	itemTechnicalSpecs:ItemTechnicalSpecs[];
	itemPriceId:number;
	videoUrl:string;
	documentUrl:string;
	itemImages:ItemImage[];
	isBestSelling:boolean ;
	isOnSale:boolean ;
	hide:boolean

}
export enum ProductType
{
	Product = 1,
	Accessories = 2
}