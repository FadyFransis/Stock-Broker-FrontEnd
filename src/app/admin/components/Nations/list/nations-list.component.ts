import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { NationService } from '../../../../services/nation.service';
import { Response } from '../../../../models/responseDTO';
import Swal from 'sweetalert2'
import { Nation } from 'src/app/models/NationDTO';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-nations-list',
  templateUrl: './nations-list.component.html',
  styleUrls: ['./nations-list.component.scss']
})
export class NationsListComponent implements OnInit {

  constructor( public nationService : NationService , private spinner:NgxSpinnerService) { }
  responseAll: Response<Nation[]>;
  response: Response<Nation>;
  nations: Nation[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Nation>;
  displayedColumns = ['No', 'Name', 'Description','NameAr','DescriptionAr', 'Actions'];

  ngOnInit() {
    this.getAll();
  }
  
  getAll = () => {
    this.spinner.show();
    this.nationService.getAll().subscribe(response => {
      this.responseAll = response;
      if (this.responseAll.success) {
        this.nations = this.responseAll.result;
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
  delete = (companyBrand?: Nation) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected Nation',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.nationService.delete(companyBrand.id).subscribe(response => {
          this.response = response;
          if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
            this.nations = this.nations.filter(obj => obj !== companyBrand);
            this.organizeData();
            Swal.fire({
              title: 'success!',
              text: "The selected Nation deleted successfully",
              icon: 'success',
            })       
            //this.snackBar.open("The selected Nation deleted successfully", "OK");
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
    this.dataSource = new MatTableDataSource(this.nations);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}

