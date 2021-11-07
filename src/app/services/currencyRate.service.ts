import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CurrencyRate } from '../models/CurrencyRateDTO';
import { Response } from '../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {


  constructor(private http: HttpClient) {
  }

  getAll = () => {
    return this.http.get<Response<CurrencyRate[]>>(environment.apiUrl + 'CurrecnyRate/GetAll/');
  }
 

  getById = (id: number) => {
    return this.http.get<Response<CurrencyRate>>(environment.apiUrl + 'CurrencyRate/GetCurrencyRate?id=' + id);
  }

  
  add = (CurrencyRate: CurrencyRate) => {
    return this.http.post<Response<CurrencyRate>>(environment.apiUrl + 'CurrencyRate/AddCurrencyRate', CurrencyRate)
  }
  update = (CurrencyRate: CurrencyRate) => {
    return this.http.post<Response<CurrencyRate>>(environment.apiUrl + 'CurrecnyRate/UpdateCurrencyRate', CurrencyRate)
  }
  delete = (id: number) => {
    return this.http.get<Response<CurrencyRate>>(environment.apiUrl + 'CurrencyRate/DeleteCurrencyRate?id=' + id)
  }
  getSearchCurrencyRate = (searchText: string) => {
    return this.http.get<Response<CurrencyRate[]>>(environment.apiUrl + 'CurrencyRate/SearchCurrencyRate?searchText=' + searchText);
  }

}
