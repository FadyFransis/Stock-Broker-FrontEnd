import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Order, Payment, OrderStatus, IpAddress, Currency } from '../../../models/orderDTO';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/ClientDTO';
import { Item } from '../../../models/ItemDTO';
import { OrderItem } from '../../../models/orderItemDTO';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

  displayedColumns = ['OrderId', 'CustomerName', 'OrderDate', 'TotalPrice','Currency', 'TotalDiscount', 'PaymentType', 'OrderStatus' ];
  displayedColumnsItems = ['ProductImg', 'ProductName',  'TotalPrice'];
  orders = new Array<Order>();
  order: Order;
  orderItems = new Array<OrderItem>();
  PaymentEnum = Payment;
  CurrencyEnum =Currency;
  showOrders: boolean;
  clients: Client[];
  OrderStatusEnum = OrderStatus;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Order>;
  dataSourceItems: MatTableDataSource<OrderItem>;

  statusList: any;


  constructor(public formBuilder: FormBuilder,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private clientService: ClientService) { }

  ngOnInit() {
    this.showOrders = true;
    this.getOrders();
    this.order = new Order;
   
    //  this.loadClients();
  }

  getOrders = () => {
    this.spinner.show();
    this.orderService.loadAllOrders().subscribe(response => {
      this.orders = response.result;
       console.log(this.orders);
      this.organizeOrders();
      this.spinner.hide();
    });
  }

  organizeOrders() {
    
    this.dataSource = new MatTableDataSource(this.orders);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }

  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  SaveOrder() {
    this.showOrders = true;
  }

  loadClients() {
    this.clientService.getCustomers().subscribe(response => {
      this.clients = response.result;
    });
  }
  GetOrderItems(OrderId: number) {
    this.spinner.show();
    
    this.statusList = this.getENUM(this.OrderStatusEnum);
    this.spinner.show();
    
    this.showOrders = false;
    // this.intiateForm();
    this.orderService.getOrderInfo(OrderId).subscribe(response => {
      
      this.order = response.result;
      this.orderItems = this.order.orderItems;
      this.dataSourceItems = new MatTableDataSource(this.orderItems);
      this.spinner.hide();

    });

  }
  


  plusQty = (OrderItem: OrderItem) => {
    let row = this.order.orderItems.find(x => x.item == OrderItem.item)
    row.quantity++;

  }
  // deleteOrderItem = (OrderItem: OrderItem) => {
  //   event.preventDefault()
  //   this.order.orderItems = this.order.orderItems.filter(a => a.item != OrderItem.item);
  //   this.organizeOrders();
   
  // }

  deleteOrderItem = (OrderItem: OrderItem) => {
    this.spinner.show();
    event.preventDefault()
    this.orderService.DeleteOrderItem(OrderItem.id).subscribe(response => {
      if (response.isSubmitted && response.isSubmittedSuccessfully) {
        this.spinner.hide();
        this.GetOrderItems(OrderItem.orderID);

      }
    });

  }
 
  public numberValidator(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      // invalid character, prevent input
    }
  }
  getENUM(ENUM: any): string[] {
    let myEnum = [];
    let objectEnum = Object.keys(ENUM);
    const keys = objectEnum.slice(0, objectEnum.length / 2);
    const values = objectEnum.slice(objectEnum.length / 2);

    for (let i = 0; i < objectEnum.length / 2; i++) {
      myEnum.push({ key: Number(keys[i]), value: values[i] });
    }
    return myEnum;
  }
  save() {
    this.spinner.show();
    this.showOrders = true;
    
    for (let index = 0; index < this.order.orderItems.length; index++) {
      this.order.orderItems[index].item = null;
      this.order.orderItems[index].itemPrice = null;
      this.order.client=null;
    }
    this.order.ipAddress = this.order.currency ==1 ?IpAddress.Egyption :IpAddress.NotEgyption;
    this.orderService.UpdateOrder(this.order).subscribe(response => {
      if (response.isSubmitted && response.isSubmittedSuccessfully) {
        this.getOrders();
        Swal.fire({
          title: 'Submit succeeded!',
          text: "Submit succeeded !!",
          icon: 'success',
        })
      }
      else
        Swal.fire({
          title: 'Error!',
          text: 'Submit failed !!',
          icon: 'error',
        })
      this.spinner.hide();
      // console.log(response);
    });
  }

 
}
