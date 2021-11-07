import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../models/ClientDTO';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../../../services/client.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import Swal from 'sweetalert2'
import { VoucherService } from 'src/app/services/voucher.service';
import { ClientVoucher } from 'src/app/models/ClientVoucherDTO';
import { Response } from 'src/app/models/responseDTO';
@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  displayedColumns = ['ClientId', 'FirstName', 'LastName', 'Email', 'Mobile', 'Address', 'IsActive', 'Action', 'Vouchers'];
  displayedClientVoucherColumns = ['Id', 'VoucherTitle', 'Points', 'RedeemDate', 'IsUsed', 'ValidTill', 'Actions'];
  client: Client;
  clients: Client[];
  showClients: boolean;
  clientId: number;
  clientVouchers: ClientVoucher[];
  dataSource: MatTableDataSource<Client>;
  dataSourceClientVoucher: MatTableDataSource<ClientVoucher>;
  responseAll: Response<Client[]>;
  response: Response<Client>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sortClientVoucher: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorClientVoucher: MatPaginator;

  constructor(private spinner: NgxSpinnerService,
    private clientService: ClientService,
    private voucherService: VoucherService) { }

  ngOnInit() {
    this.showClients = true;
    this.loadClients();
  }
  loadClients() {
    this.spinner.show();
    this.clientService.getCustomers().subscribe(response => {
      this.clients = response.result;
      this.spinner.hide();
      this.organizeClients();
    });
  }

  organizeClients() {
    this.spinner.show();
    this.dataSource = new MatTableDataSource(this.clients);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.spinner.hide();
  }

  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource.paginator.firstPage();
  }
  searchClientVoucher = (filterValue: string) => {
    this.dataSourceClientVoucher.filter = filterValue.trim().toLowerCase();
    // this.dataSource.paginator.firstPage();
  }
  ChangeClientStatus = (model: Client) => {

    this.spinner.show();
    model.isActive = !model.isActive;
    this.clientService.ChangeClientStatus(model).subscribe(response => {
      if (response.isSubmitted && response.isSubmittedSuccessfully) {
        this.spinner.hide();
        this.loadClients();
        Swal.fire({
          title: 'Success!',
          text: "Client Status Changed Successfully",
          icon: 'info',
        })
      }
      else {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: response.errors[0],
          icon: 'error',
        })
        //this.snackBar.open(this.response.errors[0], "OK");
      }
    });
  }

  GetRedeemedVouchersByClientId(clientId: number) {

    this.clientId = clientId;
    this.showClients = false;
    this.spinner.show();
    this.voucherService.GetRedeemedVoucherByClientId(clientId).subscribe(response => {

      this.clientVouchers = response.result;
      this.spinner.hide();
      this.organizeVoucher();
    });
  }
  organizeVoucher() {
    this.dataSourceClientVoucher = new MatTableDataSource(this.clientVouchers);
    setTimeout(() => {
      this.dataSourceClientVoucher.paginator = this.paginatorClientVoucher;
      this.dataSourceClientVoucher.sort = this.sortClientVoucher;
    })
  }

  deleteClientVoucher(id: number) {

    Swal.fire({
      title: 'Are you sure you want to release voucher from client',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.voucherService.deleteClientVoucher(id).subscribe(response => {
          this.spinner.hide();
          if (response.isSubmitted && response.isSubmittedSuccessfully) {

            Swal.fire({
              title: 'success!',
              text: "Deleted successfully",
              icon: 'success',
            })
            this.GetRedeemedVouchersByClientId(this.clientId);

          }
          else {
            Swal.fire({
              title: 'Error!',
              text: "Error occured when deleteing",
              icon: 'error',
            })
          }
        });

      }
    })

  }

  delete = (client?: Client) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected client',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.clientService.delete(client.id).subscribe(response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
            this.clients = this.clients.filter(obj => obj !== client);
            this.organizeClients();
            Swal.fire({
              title: 'success!',
              text: "The selected client deleted successfully",
              icon: 'success',
            })
            //this.snackBar.open("The selected client deleted successfully", "OK");
          }
          else
            Swal.fire({
              title: 'Error!',
              text: this.responseAll.errors[0],
              icon: 'error',
            })
        });

      }
    })
  }
}
