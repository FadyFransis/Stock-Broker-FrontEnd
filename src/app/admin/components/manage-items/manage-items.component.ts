import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/product.service';
import { Item } from 'src/app/models/ItemDTO';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss']
})
export class ManageItemsComponent implements OnInit {
  displayedColumns = ['#' , 'ProductImg', 'Name', 'Price', 'Brand', 'Nation', 'Code', 'Actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  Items: Item[];
  AllItems: Item[];
  ShowItemDetailsDev: boolean;
  dataSource: MatTableDataSource<Item>;
  searchText: string;
  constructor(private spinner: NgxSpinnerService,
    private productService: ProductService,) { }

  ngOnInit() {
    this.getAllItems();
    this.searchText = '';
    this.ShowItemDetailsDev = false;
  }


  organizeItems() {
    this.spinner.show();
    this.dataSource = new MatTableDataSource(this.Items);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
    this.spinner.hide();

  }

  search = (filterValue: string) => {

    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
    this.organizeItems();
  }
  getAllItems() {
    
    this.spinner.show();
    if( this.searchText != "")
    {
    this.productService.getAllWithHides().subscribe(response => {
      if (response.success) {
        this.Items = response.result;
        this.organizeItems();
        this.spinner.hide();
      }
      this.spinner.hide();
      });
    }
  }

  searchItems() {
    debugger;
    this.spinner.show();
    if( this.searchText != "")
    {
    this.productService.SearhItems(this.searchText).subscribe(response => {
      if (response.success) {
        this.Items = response.result;
        this.organizeItems();
        this.spinner.hide();
      }
      this.spinner.hide();
    });
  }

  this.spinner.hide();
  }
  deleteItem = (Id) => {
    Swal.fire({
      title: 'Are you sure you want to delete item',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.productService.delete(Id).subscribe(response => {
          this.spinner.hide();
          if (response.isSubmitted && response.isSubmittedSuccessfully) {
            this.Items = this.Items.filter(obj => obj.id !== Id);
            this.organizeItems();
            Swal.fire({
              title: 'success!',
              text: "The selected Item deleted successfully",
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
