import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplaySubject, Subject } from 'rxjs';
import { Slider } from 'src/app/models/SliderDTO';
import { SliderService } from 'src/app/services/slider.service';
import Swal from 'sweetalert2';
import { Response } from '../../../../models/responseDTO';

@Component({
  selector: 'app-slider-form',
  templateUrl: './slider-form.component.html',
  styleUrls: ['./slider-form.component.scss']
})
export class SliderFormComponent implements OnInit {
  sliderForm: FormGroup;
  response: Response<Slider>;
  slider = new Slider;
  categories : Slider[];
  slider_validation_messages = {
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
    'imageUrl': [
      { type: 'required', message: 'Image_required' }
    ],


  };
    public categoryFilterCtrl: FormControl = new FormControl();
    public filteredSliders: ReplaySubject<Slider[]> = new ReplaySubject<Slider[]>(1);
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    protected _onDestroy = new Subject<void>();


  constructor(public formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sliderService: SliderService) {
  }

  protected filterCategories() {
    if (!this.categories) {
      return;
    }
    // get the search keyword
    let search = this.categoryFilterCtrl.value;
    if (!search) {
      this.filteredSliders.next(this.categories.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredSliders.next(
      this.categories.filter(item => item.name.toLowerCase().indexOf(search) > -1 || item.nameAr.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnInit() {
    this.intiateForm();
    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.slider.id = p["id"]
        if (this.slider.id != 0) {
          this.getSlider();
        }
      })
    }
    else {
      this.router.navigateByUrl('/SliderList');
    }
  }

  intiateForm = () => {
    this.sliderForm = this.formBuilder.group({
      id: [this.slider.id],
      name: [this.slider.name, [Validators.required]],
      description: [this.slider.description, [Validators.minLength(10), Validators.maxLength(500)]],
      nameAr: [this.slider.nameAr],
      buttonUrl :[this.slider.buttonUrl],
      descriptionAr: [this.slider.descriptionAr, [Validators.minLength(10), Validators.maxLength(500)]],
      imageUrl:["",[Validators.required]],
    });
  }

  getSlider = () => {
    this.spinner.show();
    this.sliderService.getById(this.slider.id).subscribe(response => {
      this.response = response;
       this.slider = this.response.result;
      if (this.slider.id) {
        this.sliderForm.patchValue(this.slider);
      }
      else {
        this.router.navigateByUrl('/SliderList');
      }
    })
    this.spinner.hide();
  }

  save = () => {
    this.spinner.show();
    this.generateModel();
    if (this.slider.id != 0) {
      debugger
      this.sliderService.update(this.slider).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.sliderForm.reset();
          this.router.navigateByUrl("/SliderList");
          Swal.fire({
            title: 'success!',
            text: "Slider Updated Successfully",
            icon: 'success',
          }) 
          //this.snackBar.open("Slider Updated Successfully", "OK");
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
      console.log(this.slider);
      this.sliderService.add(this.slider).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.sliderForm.reset();
          this.router.navigateByUrl("/SliderList");
          Swal.fire({
            title: 'success!',
            text: "New Slider Added Successfully",
            icon: 'success',
          }) 
          //this.snackBar.open("New Slider Added Successfully", "OK");
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
    if (confirm("Are you sure you want to delete the selected Slider")) {
      this.sliderService.delete(this.slider.id).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.router.navigateByUrl("/SliderList");
          Swal.fire({
            title: 'success!',
            text: "The selected Slider deleted successfully",
            icon: 'success',
          }) //this.snackBar.open("The selected Slider deleted successfully", "OK");
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
    this.router.navigateByUrl("/SliderList");
  }
  
  canDeactivate = () => {
    if (this.sliderForm.dirty) {
      return confirm("Discard Changes for: " + this.slider.name);
    }
    return true;
  }
  // load Data
  onFileComplete(data: any) {
    this.sliderForm.patchValue({
      imageUrl: data
    });
    this.sliderForm.markAsDirty()
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  //generate model before save or update 
  generateModel()
  {
    //for adding new cateogy 
    if (this.slider.id == 0) {

    }
    this.slider.name=this.sliderForm.get('name').value;
    this.slider.nameAr= "Default Name Arabic ";
    this.slider.description=this.sliderForm.get('description').value
    this.slider.descriptionAr="Default Desctiption"
    this.slider.imageUrl=this.sliderForm.get('imageUrl').value
    this.slider.buttonUrl=this.sliderForm.get('buttonUrl').value


  }
 
}