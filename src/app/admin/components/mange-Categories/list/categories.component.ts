import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MAT_DIALOG_DATA, } from '@angular/material';
import { CategoryService } from '../../../../services/category.service';
import { Response } from '../../../../models/responseDTO';
import { Category } from '../../../../models/categoryDTO';
import Swal from 'sweetalert2'
import { debug } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(public dialog: MatDialog, private spinner: NgxSpinnerService,
    public categoryService: CategoryService) {
  }

  responseAll: Response<Category[]>;
  response: Response<Category>;
  categories: Category[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  dataSource: MatTableDataSource<Category>;
  displayedColumns = ['No', 'Name',   'ParentCategory', 'ChildCategory', 'Actions'];

  ngOnInit() {
    this.getAll();
  }

  getAll = () => {
    this.categoryService.GetAllCategories().subscribe(response => {
      this.responseAll = response;
      if (this.responseAll.success) {

        this.categories = this.responseAll.result;
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

  delete = (category?: Category) => {
    Swal.fire({
      title: 'Are you sure you want to delete the selected Category',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      //confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.categoryService.delete(category.id).subscribe(response => {
          this.response = response;
          if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
            this.categories = this.categories.filter(obj => obj !== category);
            this.organizeData();
            Swal.fire({
              title: 'success!',
              text: "The selected Category deleted successfully",
              icon: 'success',
            })
            //this.snackBar.open("The selected Category deleted successfully", "OK");
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
    this.spinner.show();
    this.dataSource = new MatTableDataSource(this.categories);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.spinner.hide();

  }
  // MatDialog 
  openParentDialog(category?: Category) {
    this.spinner.show();
    this.categoryService.getById(category.id).subscribe(response => {
      this.response = response;
      if (this.response.success) {
        category = this.response.result;

        this.dialog.open(ParentDialogData, { data: category.parents });

      }
    });
    this.spinner.hide();
  }
  openChildDialog(category?: Category) {
    this.categoryService.getById(category.id).subscribe(response => {
      this.response = response;
      if (this.response.success) {
        category = this.response.result;
        this.dialog.open(ChildDialogData, { data: category.childs });
      }
    });

  }

}
//creating Components
@Component({
  selector: 'parent-dialog-data',
  templateUrl: 'parent-dialog-data.html',
  styleUrls: []
})
export class ParentDialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
@Component({
  selector: 'child-dialog-data',
  templateUrl: 'child-dialog-data.html',
  styleUrls: []
})
export class ChildDialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
