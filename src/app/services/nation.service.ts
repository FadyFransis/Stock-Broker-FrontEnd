import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nation } from '../models/NationDTO';
import { Response } from '../models/responseDTO';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NationService {

  constructor(private http: HttpClient) {

  }

  getAll = () => {
    return this.http.get<Response<Nation[]>>(environment.apiUrl + 'Nation/GetAll');
  }

  getById = (id: number) => {
    return this.http.get<Response<Nation>>(environment.apiUrl + 'Nation/GetNation?id=' + id);
  }

  add = (model: Nation) => {
    return this.http.post<Response<Nation>>(environment.apiUrl + 'Nation/AddNation', model)
  }
  update = (model: Nation) => {
    return this.http.post<Response<Nation>>(environment.apiUrl + 'Nation/UpdateNation', model)
  }
  delete = (id: number) => {
    return this.http.get<Response<Nation>>(environment.apiUrl + 'Nation/DeleteNation?id=' + id)
  }

}
