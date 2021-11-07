import { Item } from './ItemDTO';

export class ItemsAccessory {
    ParentItemID: number;
	ChildItemID: number;
	Id: number;
	CreationDate: string;
	LastUpdatedDate: string;
	RecordStatus: number;
	parentItem:Item;
	childItem:Item;
}