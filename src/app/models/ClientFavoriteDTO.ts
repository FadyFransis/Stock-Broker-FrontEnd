import { Item } from './ItemDTO';

export class ClientFavoite {
    constructor(){
        this.item = new Item;
    }
    id: number;
    clientID: number;
    itemID: number;
    item: Item;
    creationDate: string
    lastUpdatedDate: string;
    recordStatus: number;
}