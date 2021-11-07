
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { SpecService } from '../../../../services/spec.service';
import { Response } from '../../../../models/responseDTO';
import { Spec } from '../../../../models/SpecsDTO';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-specs-form',
  templateUrl: './specs-form.component.html',
  styleUrls: ['./specs-form.component.scss']
})
export class SpecsFormComponent implements OnInit {
  
  specForm: FormGroup;
  response: Response<Spec>;
  spec = new Spec;
  spec_validation_messages = {
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
  };

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    public specService: SpecService) {
  }

  ngOnInit() {
    this.intiateForm();
    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.spec.id = p["id"]
        if (this.spec.id != 0) {
          this.getSpec();
        }
      })
    }
    else {
      this.router.navigateByUrl('/SpecList');
    }
  }
  intiateForm = () => {
    this.specForm = this.formBuilder.group({
      id: [this.spec.id],
      name: [this.spec.name, [Validators.required]],
      description: [this.spec.description, [Validators.minLength(10), Validators.maxLength(500)]],
      nameAr: [this.spec.nameAr, [Validators.required]],
      descriptionAr: [this.spec.descriptionAr, [Validators.minLength(10), Validators.maxLength(500)]],
    });
  }
  getSpec = () => {
    this.specService.getById(this.spec.id).subscribe(response => {
      this.response = response;
      this.spec = this.response.result;
      if (this.spec.id !=0) {
        this.specForm.patchValue(this.spec);
      }
      else {
        this.router.navigateByUrl('/SpecList');
      }
    })
  }
  save = () => {
   
    if (this.spec.id != 0) {
      this.spinner.show();
      this.specService.update(this.specForm.getRawValue()).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.specForm.reset();
          this.router.navigateByUrl("/SpecList");
          Swal.fire({
            title: 'success!',
            text: "Spec Updated Successfully",
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
        this.spinner.hide();
    });
  }
    else {
      this.specService.add(this.specForm.getRawValue()).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.specForm.reset();
          this.router.navigateByUrl("/SpecList");
          Swal.fire({
            title: 'success!',
            text: "New Spec Added Successfully",
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
      this.spinner.hide();
    }
  }

  delete = () => {
    if (confirm("Are you sure you want to delete the selected Brand")) {
      this.specService.delete(this.spec.id).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.router.navigateByUrl("/SpecList");
          Swal.fire({
            title: 'success!',
            text: "The selected Spec deleted successfully",
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
    this.router.navigateByUrl("/SpecList");
  }
  
  canDeactivate = () => {
    if (this.specForm.dirty) {
      return confirm("Discard Changes for: " + this.spec.name);
    }
    return true;
  }

}

