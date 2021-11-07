import { Category } from './categoryDTO'

export class CompanyBrand {
	CompanyBrand() {
		this.categories = Array<Category>()
	}
	id: number
	creationDate: string
	lastUpdatedDate: string
	recordStatus: number
	name: string
	description: string
	nameAr: string
	descriptionAr: string
	iconName: string
	categories: Category[]
	
}