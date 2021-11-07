import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { VoucherService } from '../../../../services/voucher.service';
import { Response } from '../../../../models/responseDTO';
import { VoucherDTO } from '../../../../models/VoucherDTO';
import Swal from 'sweetalert2'
import { ClientVoucher } from 'src/app/models/ClientVoucherDTO';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-vouchers-list',
  templateUrl: './vouchers-list.component.html',
  styleUrls: ['./vouchers-list.component.scss']
})
export class VouchersListComponent implements OnInit {

  constructor(public voucherService: VoucherService, private spinner: NgxSpinnerService) { }
  responseAll: Response<VoucherDTO[]>;
  response: Response<VoucherDTO>;
  vouchers: VoucherDTO[];
  voucherId: number;
  showClients: boolean;
  clientVouchers: ClientVoucher[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<VoucherDTO>;
  displayedColumns = ['No', 'Title', 'Description', 'Type', 'Amount', 'Points', 'validDurationByMonth', 'Actions', 'clients'];

  displayedClientVoucherColumns = ['Id', 'ClientName', 'ClientEmail', 'RedeemDate', 'Actions'];
  dataSourceClientVoucher: MatTableDataSource<ClientVoucher>;
  @ViewChild(MatSort, { static: false }) sortClientVoucher: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorClientVoucher: MatPaginator;

  ngOnInit() {
    this.showClients = true;
    this.getAll();
  }
  getAll = () => {
    this.spinner.show();
    this.voucherService.getAll().subscribe(response => {
      this.responseAll = response;
      if (this.responseAll.success) {
        this.vouchers = this.responseAll.result;
        this.organizeData();
        this.spinner.hide();
      }
      else
        Swal.fire({
          title: 'Error!',
          text: this.responseAll.errors[0],
          icon: 'error',
        })
    });
    this.spinner.hide();
  }

  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }
  delete = (voucher?: VoucherDTO) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected Voucher',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.voucherService.delete(voucher.id).subscribe(response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
            this.vouchers = this.vouchers.filter(obj => obj !== voucher);
            this.organizeData();
            Swal.fire({
              title: 'success!',
              text: "The selected Voucher deleted successfully",
              icon: 'success',
            })
            //this.snackBar.open("The selected CompanyBrand deleted successfully", "OK");
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

  organizeData() {
    this.dataSource = new MatTableDataSource(this.vouchers);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  searchClientVoucher = (filterValue: string) => {
    this.dataSourceClientVoucher.filter = filterValue.trim().toLowerCase();
    this.dataSourceClientVoucher.paginator.firstPage();
  }
  GetRedeemedClientByVoucherId(voucherId: number) {

    this.voucherId = voucherId;
    this.showClients = false;

    this.voucherService.GetRedeemedClientByVoucherId(voucherId).subscribe(response => {

      this.clientVouchers = response.result;
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
            this.GetRedeemedClientByVoucherId(this.voucherId);

          }
          else
            Swal.fire({
              title: 'Error!',
              text: "Error occured when deleteing",
              icon: 'error',
            })
        });

      }
    })

  }

}
