import { Country } from './CountryDTO';

export class City {
    constructor() {
        this.country = new Country;
    }

    id :number;
	creationDate :string;
	lastUpdatedDate :string;
	recordStatus :number;
	name :string;
	description :string;
	nameAr :string;
	descriptionAr :string;
    countryID :number;//
    country :Country
}