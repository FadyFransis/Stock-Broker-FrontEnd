import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { CompanyBrandService } from '../../../../services/companyBrand.service';
import { Response } from '../../../../models/responseDTO';
import { CompanyBrand } from '../../../../models/CompanyBrandDTO';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  constructor( public companyBrandService : CompanyBrandService) { }
  responseAll: Response<CompanyBrand[]>;
  response: Response<CompanyBrand>;
  companyBrands: CompanyBrand[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<CompanyBrand>;
  displayedColumns = ['No', 'Name', 'Description','NameAr','DescriptionAr', 'Actions'];

  ngOnInit() {
    this.getAll();
  }
  
  getAll = () => {
    this.companyBrandService.getCompanyBrand().subscribe(response => {
      this.responseAll = response;
      if (this.responseAll.success) {
        this.companyBrands = this.responseAll.result;
        this.organizeData();
       
      }
      else
        Swal.fire({
          title: 'Error!',
          text: this.responseAll.errors[0],
          icon: 'error',
        })
    });
  }
  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }
  delete = (companyBrand?: CompanyBrand) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected CompanyBrand',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.companyBrandService.delete(companyBrand.id).subscribe(response => {
          this.response = response;
          if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
            this.companyBrands = this.companyBrands.filter(obj => obj !== companyBrand);
            this.organizeData();
            Swal.fire({
              title: 'success!',
              text: "The selected CompanyBrand deleted successfully",
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
    this.dataSource = new MatTableDataSource(this.companyBrands);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
