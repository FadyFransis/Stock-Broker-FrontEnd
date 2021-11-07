import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Slider } from 'src/app/models/SliderDTO';
import { SliderService } from 'src/app/services/slider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.scss']
})
export class SliderListComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private sliderService: SliderService) { }

  sliders: Slider[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource: MatTableDataSource<Slider>;
  displayedColumns = ['No', 'ImageUrl', 'Name', 'Description', 'Actions'];
  ngOnInit(
  ) {
    this.spinner.show();
    this.getAll();
  
  }
  getAll = () => {
    this.spinner.show();
    this.sliderService.getAll().subscribe(response => {
      if (response.success) {
        this.sliders = response.result;
        this.organizeData();
        this.spinner.hide();
      }
      else
      {this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: response.errors[0],
          icon: 'error',
        })}
      
    });
   
  }

  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }
  organizeData() {
    this.dataSource = new MatTableDataSource(this.sliders);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  delete = (slide?: Slider) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected slider',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.sliderService.delete(slide.id).subscribe(response => {

          if (response.isSubmitted && response.isSubmittedSuccessfully) {
            this.sliders = this.sliders.filter(obj => obj !== slide);
            this.organizeData();
            Swal.fire({
              title: 'success!',
              text: "The selected slider deleted successfully",
              icon: 'success',
            })

          }
          else
            Swal.fire({
              title: 'Error!',
              text: response.errors[0],
              icon: 'error',
            })
        });

      }
    })


  }
}
