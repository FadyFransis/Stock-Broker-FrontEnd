import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Item, ProductType } from 'src/app/models/ItemDTO';
import { NationService } from 'src/app/services/nation.service';
import { CompanyBrandService } from 'src/app/services/companyBrand.service';
import { CategoryService } from 'src/app/services/category.service';
import { CompanyBrand } from 'src/app/models/CompanyBrandDTO';
import { Category } from 'src/app/models/categoryDTO';
import { Nation } from 'src/app/models/NationDTO';
import { VouchersFormComponent } from '../vouchers/form/vouchers-form.component';
import { ItemCategory } from 'src/app/models/ItemCategoryDTO';
import { SpecService } from 'src/app/services/spec.service';
import { Spec } from 'src/app/models/SpecsDTO';
import { ItemSpecs } from 'src/app/models/ItemSpecsDTO';
import { ItemImage } from 'src/app/models/ItemImagesDTO';
import { ItemPrice } from 'src/app/models/ItemPriceDTO';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ThrowStmt } from '@angular/compiler';
import { ProductService } from 'src/app/services/product.service';
import { Response } from '../../../models/responseDTO';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item: Item;
  itemCategory: ItemCategory;
  itemCategories: ItemCategory[];
  itemSpec: ItemSpecs;
  itemSpecs: ItemSpecs[];
  itemPrice: ItemPrice;
  brands: CompanyBrand[];
  nations: Nation[];
  categories: Category[];
  specs: Spec[];
  typeList: any;
  productTypeEnum = ProductType;
  firstFormGroup: FormGroup;
  middleFormGroup: FormGroup;
  thirdFromGroup: FormGroup
  itemspecstemp: ItemSpecs;
  response: Response<Item>;
  public Editor = ClassicEditor;  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  dataSource: MatTableDataSource<ItemSpecs>;
  dataSourceItems: MatTableDataSource<ItemSpecs>;
  displayedColumns = ['No', 'Name', 'Value', 'ValueAr', 'Actions'];
  categoryDataSource: MatTableDataSource<Category>;
  selection = new SelectionModel<Category>(true, []);
  displayedColumnsCategory = ['select', 'No', 'Name', ];
  firstFormGroup_validation_messages = {
    'name': [
      { type: 'required', message: 'Name_required' },
      { type: 'minlength', message: 'Name must be more than 2 charcters' },

    ],
    'nameAr': [
      { type: 'required', message: 'Name_required' },
      { type: 'minlength', message: 'Name must be more than 2 charcters' },
    ],
    'description': [
      { type: 'required', message: 'required' },
      { type: 'minlength', message: 'Desc_more' },
      { type: 'maxlength', message: 'Desc_less' }
    ],
    'descriptionAr': [
      { type: 'required', message: 'required' },
      { type: 'minlength', message: 'Desc_more' },
      { type: 'maxlength', message: 'Desc_less' }
    ],
    'code': [
      { type: 'required', message: 'required' },
    ],
    'companyBrandID': [
      { type: 'required', message: 'required' },
    ],
    'price': [
      { type: 'min', message: 'Minimum to be 0' },
    ],
    'stockCount': [
      { type: 'min', message: 'Minimum to be 0' },
    ],

  };

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private nationService: NationService,
    private brandService: CompanyBrandService,
    private categoryService: CategoryService,
    private specService: SpecService,
    private itemService: ProductService
  ) { }

  ngOnInit() {

    this.spinner.show();
    this.item = new Item;
    // this.item.isBestSelling = false;
    // this.item.isOnSale = false;

    this.item.stockCount = 0;
    this.item.price = 0;

    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.item.id = p["id"]
        this.InitForm();
        this.itemSpecs = [];
        this.itemCategories = [];
        this.loadBrands();
        this.loadNations();
        this.typeList = this.getENUM(this.productTypeEnum);
        this.loadCategories();
      })
    }
    else {
      this.router.navigateByUrl('/Items');
    }

    this.spinner.hide();
  }
  InitForm() {
    this.firstFormGroup = this.formBuilder.group({
      name: [this.item.name, [Validators.minLength(2),Validators.required]],
      nameAr: [this.item.nameAr,[Validators.minLength(2)]],
      description: [this.item.description, [Validators.minLength(10)]],
      descriptionAr: [this.item.descriptionAr, [Validators.minLength(10)]],
      isBestSelling:[this.item.isBestSelling],
      isOnSale:[this.item.isOnSale],
      hide:[this.item.hide]

    });
    this.middleFormGroup = this.formBuilder.group({
      modelNumber: [this.item.modelNumber],
      code: [this.item.code, Validators.required],
      companyBrandID: [this.item.companyBrandID, Validators.required],
      nationID: [this.item.nationID],
      type: [this.item.type],
      price: [this.item.price, [Validators.required, Validators.min(0)]],
      stockCount: [this.item.stockCount, [Validators.required, Validators.min(0)]],
      metaKeys: [this.item.metaKeys, [Validators.minLength(10), Validators.maxLength(500)]],
      metaKeysAR: [this.item.metaKeysAR, [Validators.minLength(10), Validators.maxLength(500)]],
      videoUrl: [this.item.videoUrl],
      documentUrl: [this.item.documentUrl],
      iconName: [""]
    });
    this.thirdFromGroup = this.formBuilder.group({
    });
  }

  save = () => {

    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.item.id = p["id"]
      });
    }

    if (this.item.id != 0) {
      this.spinner.show();
      this.generateModel();
      this.itemService.update(this.item).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.firstFormGroup.reset();
          this.middleFormGroup.reset();
          this.thirdFromGroup.reset();
          this.spinner.hide();
          Swal.fire({
            title: 'success!',
            text: " Updated Successfully",
            icon: 'success',
          }).then(

          )
          this.router.navigateByUrl("/Items");

        }
        else
          Swal.fire({
            title: 'Error!',
            text: this.response.errors[0],
            icon: 'error',
          })
      });


    }
    else {

      this.generateModel();
      this.itemService.add(this.item).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.firstFormGroup.reset(); this.middleFormGroup.reset(); this.thirdFromGroup.reset();
          this.spinner.hide
          this.router.navigateByUrl("/Items");
          Swal.fire({
            title: 'success!',
            text: "New Item Added Successfully",
            icon: 'success',
          })
        }
        else
          Swal.fire({
            title: 'Error!',
            text: this.response.errors[0],
            icon: 'error',
          })

      });
    }


  }
  //load DDL
  loadBrands() {
    this.spinner.show();
    this.brandService.getCompanyBrand().subscribe(response => {
      this.brands = response.result;
      this.spinner.hide();
      this.item.companyBrandID = this.brands[0].id;
      this.middleFormGroup.patchValue(this.item);

    });
  }

  loadCategories() {
    this.spinner.show();
    this.categoryService.GetAllCategoriesWithParent().subscribe(response => {
      this.categories = response.result;
      this.organizeData();
      this.categoryDataSource = new MatTableDataSource(this.categories);
      if (this.item.id != 0) {
        this.getItem();
      }
    });
  }

  loadNations() {
    this.nationService.getAll().subscribe(response => {
      this.nations = response.result;
    });
  }

  //Model 
  generateModel() {
    //for adding new item 
    if (this.item.id == 0) {
      this.item.itemCategory = [];
      this.item.itemSpecs = [];
      this.item.itemPrices = [];
    }
    this.item.name = this.firstFormGroup.get('name').value;
    this.item.nameAr = 'ذهب';
    this.item.description = this.firstFormGroup.get('description').value;
    this.item.descriptionAr = this.firstFormGroup.get('descriptionAr').value;
    this.item.isBestSelling = this.firstFormGroup.get('isBestSelling').value?this.firstFormGroup.get('isBestSelling').value:false;
    this.item.isOnSale = this.firstFormGroup.get('isOnSale').value?this.firstFormGroup.get('isOnSale').value:false;
    this.item.hide = this.firstFormGroup.get('hide').value?this.firstFormGroup.get('hide').value:false;
    this.item.metaKeys = this.middleFormGroup.get('metaKeys').value;
    this.item.metaKeysAR = this.middleFormGroup.get('metaKeysAR').value;
    this.item.modelNumber = this.middleFormGroup.get('modelNumber').value;
    this.item.code = this.middleFormGroup.get('code').value;
    this.item.companyBrandID = this.middleFormGroup.get('companyBrandID').value;
    this.item.nationID = this.middleFormGroup.get('nationID').value ? this.middleFormGroup.get('nationID').value: 1;
    this.item.type = this.middleFormGroup.get('type').value? this.middleFormGroup.get('type').value: 1;
    this.item.price = this.middleFormGroup.get('price').value;
    this.item.stockCount = this.middleFormGroup.get('stockCount').value;
    this.item.videoUrl = this.middleFormGroup.get('videoUrl').value;
    if (this.item.videoUrl) {
      this.item.videoUrl = this.item.videoUrl.replace("youtu.be", "www.youtube.com/embed");
      this.item.videoUrl = this.item.videoUrl.replace("watch?v=", "embed/");
    }
    //formation the model

    var catList = this.itemCategories;
    if (this.item.itemCategory.length >= 0) {
      this.item.itemCategory.forEach(x => x.recordStatus = 1);
      for (var i = 0; i < catList.length; i++) {
        this.itemCategory = new ItemCategory();
        this.itemCategory.categoryID = catList[i].id;
        var found2 = this.item.itemCategory.find(x => x.categoryID == catList[i].categoryID)
        if (found2 != undefined)
          this.item.itemCategory[i].recordStatus = 0;
        else {

          this.itemCategory.category = null;
          // this.itemCategories.push(this.itemCategory)
          this.item.itemCategory.push(this.itemCategory)
        }
      }

    }


    //set the price to item price array 
    var jj = this.item.itemPrices.findIndex(x => x.price == this.item.price)
    if (jj == -1) {
      this.itemPrice = new ItemPrice();
      this.itemPrice.price = this.item.price;
      this.itemPrice.itemID = this.item.id;
      this.item.itemPrices = [];
      this.item.itemPrices[0] = this.itemPrice;
    }
    // console.log(this.item)

  }
  getENUM(ENUM: any): string[] {
    let myEnum = [];
    let objectEnum = Object.keys(ENUM);
    const keys = objectEnum.slice(0, objectEnum.length / 2);
    const values = objectEnum.slice(objectEnum.length / 2);

    for (let i = 0; i < objectEnum.length / 2; i++) {
      myEnum.push({ key: Number(keys[i]), value: values[i] });
    }
    return myEnum;
  }
  getItem = () => {
    this.spinner.show();
    this.itemCategories = []
    this.item.itemCategory = [];
    this.itemService.getById(this.item.id).subscribe(response => {

      this.response = response;
      
      this.item = this.response.result;
      if (this.item.id) {
        this.firstFormGroup.patchValue(this.item);
        this.middleFormGroup.patchValue(this.item)
        var itemPriceLength = this.item.itemPrices.length;
        var itemCaltegoryLength = this.item.itemCategory.length;

        if (itemPriceLength > 0)
          this.middleFormGroup.patchValue({ price: this.item.itemPrice })
        // if (itemCaltegoryLength > 0)
        //   this.firstFormGroup.patchValue({ categoryID: this.item.itemCategory.map(({ categoryID }) => categoryID) })
        this.itemCategories = JSON.parse(JSON.stringify(this.item.itemCategory));
        // this.categoryDataSource.data.(row => this.selection.select(row));
        for (let i = 0; i < itemCaltegoryLength; i++) {
          var found = this.categories.find(x => x.id == this.item.itemCategory[i].categoryID)
          if (found != undefined)
            this.selection.select(found);
        }
      }
      else {
        this.router.navigateByUrl('/Items');
      }


    });
    this.spinner.hide();
  }
  cancel = () => {
    this.router.navigateByUrl("/Items");
  }
  //
  deleteItem = () => {
    Swal.fire({
      title: 'Are you sure you want to delete item',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.itemService.delete(this.item.id).subscribe(response => {
          this.spinner.hide();
          if (response.isSubmitted && response.isSubmittedSuccessfully) {

            Swal.fire({
              title: 'success!',
              text: response.errors.toString(),
              icon: 'success',
            })
            this.cancel();

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
  search = (filterValue: string) => {
    this.categoryDataSource.filter = filterValue.trim().toLowerCase();
    this.categoryDataSource.paginator.firstPage();
  }
  organizeData() {
    this.categoryDataSource = new MatTableDataSource(this.categories);
    setTimeout(() => {
      this.categoryDataSource.sort = this.sort;
      this.categoryDataSource.paginator = this.paginator;
    })

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.categoryDataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.categoryDataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Category): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  selectRow($event, dataSource) {
    if ($event.checked) {
      this.itemCategories.push(dataSource)
      console.log(dataSource.name);
      console.log(this.itemCategories)
    }
    else {
      var index = this.itemCategories.find(x => x.categoryID == dataSource.id);
      if (index != undefined) {
        this.itemCategories.splice(this.itemCategories.indexOf(index), 1)
      }
    }
  }
  onFileComplete(data: string[]) {

    // this.secondFormGroup.patchValue({
    //   iconName: data
    // });
    this.item.iconName = data[0];
    //this.item.itemImages = data;
    //this.secondFormGroup.markAsDirty()
  }
  onProductFileComplete(data: any) {

    // this.secondFormGroup.patchValue({
    //   documentUrl: data
    // });
    this.item.documentUrl = data;
    //this.secondFormGroup.markAsDirty()
  }
  onItemImagesComplete(data) {
    this.item.itemImages = data;
    //this.secondFormGroup.markAsDirty()
  }
  setCoverPhoto(iconName) {
    this.item.iconName = iconName;
  }

}
