import { VoucherDTO } from './VoucherDTO';
import { Client } from './ClientDTO';
export class ClientVoucher {
    constructor() {
        this.client = new Client;
        this.voucher = new VoucherDTO;
    }
    id: number;
    clientID: number;
    voucherID: number;
    isUsed:boolean;
    validTill:string;
    clientName:string;
    clientEmail:string;
    voucherTitle:string;
    redeemDate:string;
    voucherDescription:string;
    points:number;
    client: Client;
    voucher: VoucherDTO
}