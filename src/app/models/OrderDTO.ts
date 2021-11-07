import { Client } from './ClientDTO';
import { OrderItem } from './orderItemDTO'
import { OrderShippingData } from './OrderShippingDataDTO';
export class Order {
    constructor() {
        this.client = new Client;
        this.orderItems = new Array<OrderItem>();

    }
    id: number;
    creationDate: string;
    lastUpdatedDate: string;
    recordStatus: number;
    orderNumber: string;
    clientID: number;
    client: Client;
    // voucherID: string;
    paymentMethod: number;
    orderStatus: OrderStatus;
    orderItems: OrderItem[];
    orderShippingData: OrderShippingData[];
    // OrderId: number;
    // OrderDate: string;
    // UserId: number;
    // Products: Product];
    paymentType: Payment;

    // CustomerName: string;
    // Client: Client
    clientVoucherID: number;
    totalPaid: number;
    totalDiscount: number;
    bankTransferFile:string;
    totalPrice?:number;
    currency:Currency;
    ipAddress:IpAddress;
}

export enum OrderStatus {
    NotSubmitted = 0,
    Submitted = 1,
    Confirmed = 2,
    InShipping = 3,
    Shipped = 4,
    Delivered = 5,
    Request = 6
}

export enum Payment {
    Cash = 1,
    CrediteCard = 2,
    BankTransfer=3
}
export enum Currency {
    NA = 0,

    EGP = 1,
    USD = 2,
}
export enum IpAddress {
	Egyption =1,
	NotEgyption =2
 }

