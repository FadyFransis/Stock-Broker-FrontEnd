
import { Injectable } from '@angular/core';
import { Order } from '../models/orderDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClientService } from './client.service';
import { ProductService } from './product.service';
import { Response } from '../models/responseDTO';
import { OrderItem } from '../models/orderItemDTO';


@Injectable({
  providedIn: 'root'
})

export class OrderService {
  orders: Order[];
  ordersSource = new BehaviorSubject([]);
  clientId: number;
  constructor(private http: HttpClient, private clientService: ClientService,
    private productService: ProductService) {
    
  }
  GetClientOrder = (clientId:number) => {
    return this.http.get<Response<Order[]>>(environment.apiUrl + 'Order/GetClientOrder?ClientId='+clientId)
  }
 
  getOrder = (orderId: number): Order => {
    return this.orders[this.orders.findIndex(u => u.id == orderId)];
  }
  add = (order: Order) => {
    return this.http.post<Response<Order>>(environment.apiUrl + 'Order/AddOrder', order)
  }
  loadAllOrders = () => {
    return this.http.get<Response<Order[]>>(environment.apiUrl + 'Order/GetAll')
  }
  

  getOrderInfo = (orderId:number) => {
    return this.http.get<Response<Order>>(environment.apiUrl + 'Order/GetOrder?Id='+orderId)
  }

  UpdateOrder = (order : Order) =>{
    return this.http.post<Response<Order>>(environment.apiUrl + 'order/UpdateOrder' , order) 
  }

 
  DeleteOrderItem = (id : number) =>{
    return this.http.get<Response<OrderItem>>(environment.apiUrl + 'orderItem/DeleteOrderItem?Id='+id) 
  }

  DeleteOrder = (id : number) =>{
    return this.http.get<Response<Order>>(environment.apiUrl + 'order/DeleteOrder?Id='+id) 
  }
}
