import { Client } from './ClientDTO';

export class VoucherDTO {
	id:number;
	title :string;
	titleAr :string;
	description :string;
	amount:number;
	points:number;
	type:VoucherType;
	validDurationByMonth:number;
	assignedToClients:boolean;
	clientIds:number[];
	clients:Client[];
}
export enum VoucherType
{
	Amount=1 ,
	Percentage =2
}