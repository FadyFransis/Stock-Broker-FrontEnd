import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { CategoryService } from '../../../../services/category.service';
import { Response } from '../../../../models/responseDTO';
import { Category, CategoriesRelation } from '../../../../models/categoryDTO';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { take, takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  response: Response<Category>;
  category = new Category;
  categories : Category[];
  categoriesRelations : CategoriesRelation[];
  category_validation_messages = {
    'name': [
      { type: 'required', message: 'Name_required' }
    ],
    'description': [
      { type: 'minlength', message: 'Desc_more' },
      { type: 'maxlength', message: 'Desc_less' }
    ],
    'nameAr': [
      { type: 'required', message: 'Name_required' }
    ],
    'descriptionAr': [
      { type: 'minlength', message: 'Desc_more' },
      { type: 'maxlength', message: 'Desc_less' }
    ],
    'metaKeys': [
      { type: 'minlength', message: 'Desc_more' },
      { type: 'maxlength', message: 'Desc_less' }
    ],
    'metaKeyAr': [
      { type: 'minlength', message: 'Desc_more' },
      { type: 'maxlength', message: 'Desc_less' }
    ],


  };
    public categoryFilterCtrl: FormControl = new FormControl();
    public filteredCategories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    protected _onDestroy = new Subject<void>();


  constructor(public formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public categoryService: CategoryService) {
  }

  protected filterCategories() {
    if (!this.categories) {
      return;
    }
    // get the search keyword
    let search = this.categoryFilterCtrl.value;
    if (!search) {
      this.filteredCategories.next(this.categories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCategories.next(
      this.categories.filter(item => item.name.toLowerCase().indexOf(search) > -1 || item.nameAr.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnInit() {
    this.intiateForm();
    this.loadCategories();
    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.category.id = p["id"]
        if (this.category.id != 0) {
          this.getCategory();
        }
      })
    }
    else {
      this.router.navigateByUrl('/Categories');
    }
  }

  intiateForm = () => {
    this.categoryForm = this.formBuilder.group({
      id: [this.category.id],
      name: [this.category.name, [Validators.required]],
      description: [this.category.description, [Validators.minLength(10), Validators.maxLength(500)]],
      nameAr: [this.category.nameAr],
      descriptionAr: [this.category.descriptionAr, [Validators.minLength(10), Validators.maxLength(500)]],
      metaKeys: [this.category.metaKeys, [Validators.minLength(10), Validators.maxLength(500)]],
      metaKeysAR: [this.category.metaKeysAR, [Validators.minLength(10), Validators.maxLength(500)]],
      iconName:[""],
      parentsIDs:[this.category.parentsIDs],
      groupCode:[this.category.groupCode]
    });
  }

  getCategory = () => {
    this.spinner.show();
    this.categoryService.getById(this.category.id).subscribe(response => {
      this.response = response;
       this.category = this.response.result;
       this.categoriesRelations = JSON.parse(JSON.stringify(this.category.parents))
       //map the list of ids 
       this.category.parentsIDs =  this.categoriesRelations.map(({parentCategoryID})=> parentCategoryID)
      if (this.category.id) {
        this.categoryForm.patchValue(this.category);
      }
      else {
        this.router.navigateByUrl('/Categories');
      }
    })
    this.spinner.hide();
  }

  save = () => {
    this.spinner.show();
    this.generateModel();
    if (this.category.id != 0) {
      debugger
      this.categoryService.update(this.category).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.categoryForm.reset();
          this.router.navigateByUrl("/Categories");
          Swal.fire({
            title: 'success!',
            text: "Category Updated Successfully",
            icon: 'success',
          }) 
          //this.snackBar.open("Category Updated Successfully", "OK");
        }
        else
        Swal.fire({
          title: 'Error!',
          text: this.response.errors[0],
          icon: 'error',
        })
          //this.snackBar.open(this.response.errors[0], "OK");
    });
    this.spinner.hide();
  }
    else {
      console.log(this.category);
      this.categoryService.add(this.category).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.categoryForm.reset();
          this.router.navigateByUrl("/Categories");
          Swal.fire({
            title: 'success!',
            text: "New Category Added Successfully",
            icon: 'success',
          }) 
          //this.snackBar.open("New Category Added Successfully", "OK");
        }
        else
        Swal.fire({
          title: 'Error!',
          text: this.response.errors[0],
          icon: 'error',
        })
        
      });
    }
    this.spinner.hide();

  }

  delete = () => {
    if (confirm("Are you sure you want to delete the selected Category")) {
      this.categoryService.delete(this.category.id).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.router.navigateByUrl("/Categories");
          Swal.fire({
            title: 'success!',
            text: "The selected Category deleted successfully",
            icon: 'success',
          }) //this.snackBar.open("The selected Category deleted successfully", "OK");
        }
        else
        Swal.fire({
          title: 'Error!',
          text: this.response.errors[0],
          icon: 'error',
        })      });
    }
  }
  
  cancel = () => {
    this.router.navigateByUrl("/Categories");
  }
  
  canDeactivate = () => {
    if (this.categoryForm.dirty) {
      return confirm("Discard Changes for: " + this.category.name);
    }
    return true;
  }
  // load Data
  loadCategories() {
    this.categoryService.GetAllCategories().subscribe(response => {
      this.categories = response.result.filter(x=>x.id!=this.category.id);
    this.filteredCategories.next(this.categories.slice());
    this.categoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      });
    });
  }
  onFileComplete(data: any) {
    this.categoryForm.patchValue({
      iconName: data
    });
    this.categoryForm.markAsDirty()
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  //generate model before save or update 
  generateModel()
  {
    //for adding new cateogy 
    if (this.category.id == 0) {
      this.category.parents = [];
      this.category.childs = [];
      this.categoriesRelations=[];
    }
    this.category.name=this.categoryForm.get('name').value;
    this.category.nameAr= "ذهب";
    this.category.description=this.categoryForm.get('description').value
    this.category.descriptionAr=this.categoryForm.get('descriptionAr').value
    this.category.metaKeys=this.categoryForm.get('metaKeys').value
    this.category.metaKeysAR=this.categoryForm.get('metaKeysAR').value
    this.category.iconName=this.categoryForm.get('iconName').value
    this.category.groupCode=this.categoryForm.get('groupCode').value
    this.category.parentsIDs=this.categoryForm.get('parentsIDs').value

    var parentsLength = this.category.parentsIDs!=null?this.category.parentsIDs.length:0;
    
    if (parentsLength >= 0) {
      this.category.parents.forEach(x => x.recordStatus = 1)
      for (var i = 0; i < parentsLength; i++) {
        var found = this.category.parents.find(x => x.parentCategoryID == this.category.parentsIDs[i])
        if (found != undefined)
          this.category.parents[i].recordStatus = 0;
        else
        {
          var temp = new CategoriesRelation();
        temp.childCategoryID = this.category.id;
        temp.parentCategoryID = this.category.parentsIDs[i];
        this.category.parents.push(temp)
        }
        
      }
    }

  }
 
}