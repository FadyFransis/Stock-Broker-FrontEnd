import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClientService } from './client.service';
import { ProductService } from './product.service';

import { Response } from '../models/responseDTO';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../models/orderItemDTO';
import { OrderShippingData } from '../models/OrderShippingDataDTO';
import { Order, OrderStatus } from '../models/orderDTO';
import { ClientVoucher } from '../models/ClientVoucherDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderShippingData: OrderShippingData;
  orderItems: OrderItem[];
  ordersSource = new BehaviorSubject([]);
  constructor(private http: HttpClient, private clientService: ClientService,
    private productService: ProductService) {
    //this.getOrder()
    //this.getOrderShippingData(this.orderId);
  }

  getOrderItems = (orderId: number) => {
    return this.http.get<Response<Order>>(environment.apiUrl + 'Order/GetOrder?id=' + orderId);

    // this.http.get<OrderItem[]>(environment.baseUrl + 'OrderItem.json').subscribe(OrderItems => {
    //   this.orderItems = OrderItems
    //   this.orderItems.forEach(OrderItem => {
    //     OrderItem.ProductName = OrderItem.Product.ProductName;
    //     OrderItem.Price = OrderItem.Product.ProductPrice;
    //     OrderItem.TotalPrice = OrderItem.Price * OrderItem.Quantity;
    //   }
    //   );
    //   this.ordersSource.next(this.orderItems);
    // });
  }
  
  getOrderByClient= (ClientId: number) => {
    return this.http.get<Response< Order[]>>(environment.apiUrl + 'Order/GetClientLastOrder?ClientId=' + ClientId);
  }
  // getOrderShippingData = (UserId: number) : OrderShippingData =>  {
  //   //let customer = this.clientService.getCustomer(1);
  //   this.clientService.getCustomer(UserId).subscribe(response => {
  //     let customer = response.result;
  //     this.orderShippingData =
  //       {
  //         ContactPhone: customer.phone,
  //         Address: customer.Address,
  //         Id: 0,
  //         CreationDate: '',
  //         LastUpdatedDate: '',
  //         RecordStatus: 0,
  //         OrderID: 0,//
  //         Order: null,
  //         LandMarks: '',
  //         Lat: '',
  //         Lon: '',
  //         CityID: customer.CityID,//
  //         City : customer.City,

  //       }
  //   });
  //   return this.orderShippingData ;
  // }
  UpdateOrder = (order : Order) =>{
    return this.http.post<Response<Order>>(environment.apiUrl + 'order/UpdateOrder' , order) 
  }

 

}