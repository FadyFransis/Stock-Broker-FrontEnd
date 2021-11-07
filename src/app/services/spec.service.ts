import { Injectable } from '@angular/core';
import { Spec } from '../models/SpecsDTO';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/responseDTO';

@Injectable({
  providedIn: 'root'
})

export class SpecService {

  constructor(private http: HttpClient) {

  }

  getAll = () => {
    return this.http.get<Response<Spec[]>>(environment.apiUrl + 'Specs/GetAll');
  }

  getById = (id: number) => {
    return this.http.get<Response<Spec>>(environment.apiUrl + 'Specs/GetSpecs?id=' + id);
  }

  add = (Voucher: Spec) => {
    return this.http.post<Response<Spec>>(environment.apiUrl + 'Specs/AddSpecs', Voucher)
  }
  update = (Voucher: Spec) => {
    return this.http.post<Response<Spec>>(environment.apiUrl + 'Specs/UpdateSpecs', Voucher)
  }
  delete = (id: number) => {
    return this.http.get<Response<Spec>>(environment.apiUrl + 'Specs/DeleteSpecs?id=' + id)
  }

}

