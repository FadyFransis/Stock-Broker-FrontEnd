
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { SpecService } from '../../../../services/spec.service';
import { Response } from '../../../../models/responseDTO';
import Swal from 'sweetalert2'
import { Spec } from '../../../../models/SpecsDTO';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-specs-list',
  templateUrl: './specs-list.component.html',
  styleUrls: ['./specs-list.component.scss']
})

export class SpecsListComponent implements OnInit {

  constructor( public specService : SpecService , private spinner:NgxSpinnerService) { }
  responseAll: Response<Spec[]>;
  response: Response<Spec>;
  specs: Spec[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Spec>;
  displayedColumns = ['No', 'Name', 'Description', 'NameAr', 'DescriptionAr','Actions'];

  ngOnInit() {
    this.getAll();
  }
  
  getAll = () => {
    this.spinner.show();
    this.specService.getAll().subscribe(response => {
      this.responseAll = response;
      if (this.responseAll.success) {
        this.specs = this.responseAll.result;
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
  delete = (Spec?: Spec) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected Spec',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.specService.delete(Spec.id).subscribe(response => {
          this.response = response;
          if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
            this.specs = this.specs.filter(obj => obj !== Spec);
            this.organizeData();
            Swal.fire({
              title: 'success!',
              text: "The selected Spec deleted successfully",
              icon: 'success',
            })       
            //this.snackBar.open("The selected Spec deleted successfully", "OK");
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
    this.dataSource = new MatTableDataSource(this.specs);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}

