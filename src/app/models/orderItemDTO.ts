import { Item } from './ItemDTO';
import { Order } from './OrderDTO';
import {ItemPrice} from './ItemPriceDTO'
export class OrderItem {
    constructor() {
        this.item = new Item;
        this.itemPrice = new ItemPrice;
    }
    id: number;
    orderID: number;
    itemID: number;
    itemPriceID: number;
    quantity: number;
    recordStatus:number;
    //order: Order
    item: Item
    itemPrice:ItemPrice;
    totalPrice: number; //added to view only (not in the database)
}