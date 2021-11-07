import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { StockService } from '../../../../services/stock.service';
import { Response } from '../../../../models/responseDTO';
import Swal from 'sweetalert2'
import { Stock } from 'src/app/models/StockDTO';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {

  constructor( public stockService : StockService , private spinner:NgxSpinnerService) { }
  responseAll: Response<Stock[]>;
  response: Response<Stock>;
  stocks: Stock[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Stock>;
  displayedColumns = ['No', 'Name', 'Actions'];

  ngOnInit() {
    this.getAll();
  }
  
  getAll = () => {
    this.spinner.show();
    this.stockService.getAll().subscribe(response => {
      this.responseAll = response;
      if (!this.responseAll.isError) {
        this.stocks = this.responseAll.result;
        this.organizeData();
        this.spinner.hide();
       
      }
      else
        Swal.fire({
          title: 'Error!',
          text: this.responseAll.errors[0],
          icon: 'error',
        })
        this.spinner.hide();
    });
   
  }
  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }
  delete = (companyBrand?: Stock) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected Stock',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.stockService.delete(companyBrand.id).subscribe(response => {
          this.response = response;
          if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
            this.stocks = this.stocks.filter(obj => obj !== companyBrand);
            this.organizeData();
            Swal.fire({
              title: 'success!',
              text: "The selected Stock deleted successfully",
              icon: 'success',
            })       
            //this.snackBar.open("The selected Stock deleted successfully", "OK");
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
    this.dataSource = new MatTableDataSource(this.stocks);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}

