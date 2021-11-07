
import { Injectable } from '@angular/core';
import { Client } from '../models/ClientDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../models/responseDTO';
import { OrderShippingData } from '../models/OrderShippingDataDTO';


@Injectable({
  providedIn: 'root'
})

export class ClientService {
  //customers: Client[];
  // customersSource = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getCustomers()
    this.getCustomerSigned();
  }

  getCustomers = () => {
    return this.http.get<Response<Client[]>>(environment.apiUrl + 'client/getall/');

    // this.http.get<Customer[]>(environment.baseUrl + 'Users.json').subscribe(customers => {
    //  this.customers = customers;
    // this.customersSource.next(this.customers);
    // });

  }
  getCustomer = (customerId: number) => {
    return this.http.get<Response<Client>>(environment.apiUrl + 'client/GetClient?Id=' + customerId);

    // let customer: Customer;
    // customer = this.customers[this.customers.findIndex(u => u.Id == customerId)];
    // if (!customer) {
    //   customer = new Customer;
    //   customer.Name = "Not found !!";
    // }
    // return customer;
  }
  getCustomerSigned = () => {
    return JSON.parse(localStorage.getItem('Client')) as Client;
  }
  updateClient = (client: Client) => {
    
    return this.http.post<Response<Client>>(environment.apiUrl + 'Client/UpdateClient', client)
  }
  changePassword = (clientId: number, oldPassword: string, newPassword: string) => {
    return this.http.post<Response<boolean>>(environment.apiUrl + 'Account/ChangePassword',
      {
        clientId: clientId,
        oldPassword: oldPassword,
        newPassword: newPassword
      })
  }

  ChangeClientStatus = (model: Client) => {
    return this.http.post<Response<boolean>>(environment.apiUrl + 'Client/ChangeClientStatus',model)
  }

 
  delete = (id: number) => {
    return this.http.get<Response<Client>>(environment.apiUrl + 'Client/DeleteClient?id=' + id)
  }

  getDefaultAddress = (clientId: number) => {
    return this.http.get<Response<OrderShippingData[]>>(environment.apiUrl + 'OrderShippingData/getDefaultAddressbyClientId?ClientId=' + clientId);
  }

  UpdateDefaultAddress = (defaultaddress : OrderShippingData) =>{
    return this.http.post<Response<OrderShippingData>>(environment.apiUrl + 'OrderShippingData/UpdateOrderShippingData' , defaultaddress) 
  }

}
