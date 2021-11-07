import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../models/StockDTO';
import { Response } from '../models/ResponseDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient)
  { }

getAll = () => {
  return this.http.get<Response<Stock[]>>(environment.apiUrl + 'Stock/GetAll');
}

getById = (id: number) => {
  return this.http.get<Response<Stock>>(environment.apiUrl + 'Stock/GetStock?id=' + id);
}

add = (model: Stock) => {
  return this.http.post<Response<Stock>>(environment.apiUrl + 'Stock/AddStock', model)
}
update = (model: Stock) => {
  return this.http.post<Response<Stock>>(environment.apiUrl + 'Stock/UpdateStock', model)
}
delete = (id: number) => {
  return this.http.get<Response<Stock>>(environment.apiUrl + 'Stock/DeleteStock?id=' + id)
}

}
