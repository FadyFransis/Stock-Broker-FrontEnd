import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyRate } from 'src/app/models/CurrencyRateDTO';
import { CurrencyRateService } from 'src/app/services/currencyRate.service';
import Swal from 'sweetalert2';
import { Response } from '../../../models/responseDTO';
@Component({
  selector: 'app-mange-currencies',
  templateUrl: './mange-currencies.component.html',
  styleUrls: ['./mange-currencies.component.scss']
})
export class MangeCurrenciesComponent implements OnInit {

  constructor(public dialog: MatDialog, private spinner: NgxSpinnerService,
    public currencyService: CurrencyRateService) {
  }

  responseAll: Response<CurrencyRate[]>;
  response: Response<CurrencyRate>;
  CurrencyRates: CurrencyRate[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  dataSource: MatTableDataSource<CurrencyRate>;
  displayedColumns = ['No', 'FromCurrencyCode',   'ToCurrencyCode', 'Rate', 'Actions'];

  ngOnInit() {
    this.getAll();
  }

  getAll = () => {
    this.currencyService.getAll().subscribe(response => {
      this.responseAll = response;
      if (this.responseAll.success) {

        this.CurrencyRates = this.responseAll.result;
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



  organizeData() {
    this.spinner.show();
    this.dataSource = new MatTableDataSource(this.CurrencyRates);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.spinner.hide();

  }
  saveChanges =(row? : CurrencyRate) =>{
    debugger
    this.spinner.show();
     
      this.currencyService.update(row).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.spinner.hide();
          Swal.fire({
            title: 'success!',
            text: "Currency Rate Updated Successfully",
            icon: 'success',
          }) 
          
          //this.snackBar.open("Category Updated Successfully", "OK");
        }
        else
        {
        Swal.fire({
          title: 'Error!',
          text: this.response.errors[0],
          icon: 'error',
        })
        this.getAll();
      }
    });
   
  
  }

}
