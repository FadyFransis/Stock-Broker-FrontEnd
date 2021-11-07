import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ItemsAccessory } from 'src/app/models/ItemsAccessoryDTO';
import { ProductService } from 'src/app/services/product.service';
import { Item } from 'src/app/models/ItemDTO';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-item-accessories',
  templateUrl: './item-accessories.component.html',
  styleUrls: ['./item-accessories.component.scss']
})
export class ItemAccessoriesComponent implements OnInit {
  displayedColumns = ['Select', 'ProductId', 'Name', 'NameAr'];
  displayedColumnAccessories = ['ProductImg', 'ProductId', 'Name', 'NameAr', 'Brand', 'Nation', 'Code', 'Actions'];

  @ViewChild(MatSort, { static: true }) sortAccessories: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginatorAccessories: MatPaginator;

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  itemId: number;
  dataSourceAccessories: MatTableDataSource<Item>;
  dataSource: MatTableDataSource<Item>;
  itemAccessories: Item[];
  modalRef: BsModalRef;
  searchText: string;
  Items: Item[];
  selectedItems: Item[];
  itemAccessoriesToAdd: ItemsAccessory[];
  itemaccessory: ItemsAccessory;
  selection = new SelectionModel<Item>(true, []);
  constructor(private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService, private router: Router,
    private productService: ProductService,
    private modalService: BsModalService,) { }

  ngOnInit() {
    this.searchText = '';
    this.selectedItems = [];
    this.spinner.show();

    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.itemId = p["id"]
        this.GetItemsRelatedAccessories(this.itemId);
      })
    }
    else {
      this.router.navigateByUrl('/admin/Items');
    }
  }

  GetItemsRelatedAccessories(id: number) {
    this.itemAccessories = [];
    this.spinner.show();
    this.productService.GetItemsRelatedAccessories(id).subscribe(result => {
      this.itemAccessories = result.result;
      this.organizeItemAccesories();
      this.spinner.hide();

    })
  }
  organizeItemAccesories() {
    this.spinner.show();
    this.dataSourceAccessories = new MatTableDataSource(this.itemAccessories);
    setTimeout(() => {
      this.dataSourceAccessories.paginator = this.paginatorAccessories;
      this.dataSourceAccessories.sort = this.sortAccessories;

    })
    this.spinner.hide();

  }
  search = (filterValue: string) => {

    this.dataSourceAccessories.filter = filterValue.trim().toLowerCase();
    this.dataSourceAccessories.paginator.firstPage();
    this.organizeItemAccesories();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.Items = [];
    this.searchText = '';
    this.selectedItems = [];
    this.organizeItems();
  }
  organizeItems() {
    this.spinner.show();
    this.dataSource = new MatTableDataSource(this.Items);
    setTimeout(() => {
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;

    })
    this.spinner.hide();

  }
  loadItems() {
    if(this.searchText!='')
    {
    this.Items = [];
    this.spinner.show();

    this.productService.SearhItems(this.searchText).subscribe(response => {
      debugger;
      if (response.success) {
        for (let index = 0; index < response.result.length; index++) {
          if (this.itemAccessories.findIndex(x => x.id == response.result[index].id) == -1)
            this.Items.push(response.result[index])
        }
        this.organizeItems();
        this.spinner.hide();
      }
      this.spinner.hide();
    });
  }
  }

  selectRow($event, dataSource) {
    debugger;
    if ($event.checked) {
      this.selectedItems.push(dataSource)

    }
    else {
      var index = this.selectedItems.find(x => x.id == dataSource.id);
      if (index != undefined) {
        this.selectedItems.splice(this.selectedItems.indexOf(index), 1)
      }
    }
  }
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  AddSelectedItems() {
    debugger;

    this.itemAccessoriesToAdd = [];
    for (let index = 0; index < this.selectedItems.length; index++) {
      this.itemaccessory = new ItemsAccessory;
      this.itemaccessory.Id = 0;
      this.itemaccessory.ParentItemID = this.itemId;
      this.itemaccessory.ChildItemID = this.selectedItems[index].id;
      this.itemAccessoriesToAdd.push(this.itemaccessory);

    }
    this.spinner.show();
    this.productService.AddMultipleItemsAccessory(this.itemAccessoriesToAdd).subscribe(result => {
      if (result.isSubmittedSuccessfully && result.isSubmitted) {
        this.Items = [];
        this.selectedItems = [];
        this.organizeItems();
        this.searchText = '';
        this.GetItemsRelatedAccessories(this.itemId);

      }
      else
        this.spinner.hide();
    })
  }

  DeleteItemAccessoryByParentAndChild(childid) {
    debugger;

   
    this.spinner.show();
    this.productService.DeleteItemAccessoryByParentAndChild(this.itemId,childid).subscribe(result => {
      if (result.isSubmittedSuccessfully && result.isSubmitted) {
        this.GetItemsRelatedAccessories(this.itemId)
      }
      else
        this.spinner.hide();
    })
  }
}
