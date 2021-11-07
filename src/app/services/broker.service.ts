import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Broker } from '../models/BrokerDTO';
import { Response } from '../models/ResponseDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  constructor(private http: HttpClient)
  { }

getAll = () => {
  return this.http.get<Response<Broker[]>>(environment.apiUrl + 'Broker/GetAll');
}

getById = (id: number) => {
  return this.http.get<Response<Broker>>(environment.apiUrl + 'Broker/GetBroker?id=' + id);
}

add = (model: Broker) => {
  return this.http.post<Response<Broker>>(environment.apiUrl + 'Broker/AddBroker', model)
}
update = (model: Broker) => {
  return this.http.post<Response<Broker>>(environment.apiUrl + 'Broker/UpdateBroker', model)
}
delete = (id: number) => {
  return this.http.get<Response<Broker>>(environment.apiUrl + 'Broker/DeleteBroker?id=' + id)
}

}
