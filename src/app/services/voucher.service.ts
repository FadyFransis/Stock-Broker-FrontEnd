import { VoucherDTO } from '../models/VoucherDTO';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '../models/responseDTO';
import { ClientVoucher } from '../models/ClientVoucherDTO';
@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) {

  }

  getAll = () => {
    return this.http.get<Response<VoucherDTO[]>>(environment.apiUrl + 'Voucher/GetAll');
  }
  getValidVouchers = (points: number) => {
    return this.http.get<Response<VoucherDTO[]>>(environment.apiUrl + 'Voucher/GetValidVouchers?points=' + points);
  }

  getById = (id: number) => {
    return this.http.get<Response<VoucherDTO>>(environment.apiUrl + 'Voucher/GetVoucher?id=' + id);
  }

  add = (Voucher: VoucherDTO) => {
    return this.http.post<Response<VoucherDTO>>(environment.apiUrl + 'Voucher/AddVoucher', Voucher)
  }
  update = (Voucher: VoucherDTO) => {
    return this.http.post<Response<VoucherDTO>>(environment.apiUrl + 'Voucher/UpdateVoucher', Voucher)
  }
  delete = (id: number) => {
    return this.http.get<Response<VoucherDTO>>(environment.apiUrl + 'Voucher/DeleteVoucher?id=' + id)
  }
  addclientvoucher = (clientVoucher: ClientVoucher) => {
    return this.http.post<Response<ClientVoucher>>(environment.apiUrl + 'ClientVoucher/AddClientVoucher', clientVoucher)
  }
  GetAllClientVouchersByClientId = (ClientId : number)=>{
    return this.http.get<Response<ClientVoucher[]>>(environment.apiUrl + 'ClientVoucher/GetAllClientVouchersByClientId?ClientId=' + ClientId);
  }

  GetRedeemedVoucherByClientId = (ClientId : number)=>{
    return this.http.get<Response<ClientVoucher[]>>(environment.apiUrl + 'ClientVoucher/GetRedeemedVoucherByClientId?ClientId=' + ClientId);
  }

  GetRedeemedClientByVoucherId = (VoucherId : number)=>{
    return this.http.get<Response<ClientVoucher[]>>(environment.apiUrl + 'ClientVoucher/GetRedeemedClientByVoucherId?VoucherId=' + VoucherId);
  }

  deleteClientVoucher = (id: number) => {
    return this.http.get<Response<VoucherDTO>>(environment.apiUrl + 'ClientVoucher/DeleteClientVoucher?id=' + id)
  }
}
