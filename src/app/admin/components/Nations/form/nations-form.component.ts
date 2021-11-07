import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { NationService } from '../../../../services/nation.service';
import { Response } from '../../../../models/responseDTO';
import { Nation } from '../../../../models/NationDTO';
import { debug } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-nations-form',
  templateUrl: './nations-form.component.html',
  styleUrls: ['./nations-form.component.scss']
})

export class NationsFormComponent implements OnInit {
  
  nationForm: FormGroup;
  response: Response<Nation>;
  nation = new Nation;
  nation_validation_messages = {
    'name': [
      { type: 'required', message: 'Nation Name is Required' }
    ],
    'description': [
      { type: 'minlength', message: 'Nation Description must be more than of 5 characters' },
      { type: 'maxlength', message: 'Nation Description must be less than of 500 characters' }
    ],
    'nameAr': [
      { type: 'required', message: 'Nation Name is Required' }
    ],
    'descriptionAr': [
      { type: 'minlength', message: 'Nation Description must be more than of 10 characters' },
      { type: 'maxlength', message: 'Nation Description must be less than of 500 characters' }
    ],
  };

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    public nationService: NationService) {
  }

  ngOnInit() {
    this.intiateForm();
    debug;
    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.nation.id = p["id"]
        if (this.nation.id != 0) {
          this.getNation();
        }
      })
    }
    else {
      this.router.navigateByUrl('/NationList');
    }
  }
  intiateForm = () => {
    this.nationForm = this.formBuilder.group({
      id: [this.nation.id],
      name: [this.nation.name, [Validators.required]],
      description: [this.nation.description, [Validators.minLength(10), Validators.maxLength(500)]],
      nameAr: [this.nation.nameAr, [Validators.required]],
      descriptionAr: [this.nation.descriptionAr, [Validators.minLength(10), Validators.maxLength(500)]],
    });
  }
  getNation = () => {
    this.nationService.getById(this.nation.id).subscribe(response => {
      this.response = response;
      this.nation = this.response.result;
      if (this.nation.id !=0) {
        this.nationForm.patchValue(this.nation);
      }
      else {
        this.router.navigateByUrl('/NationList');
      }
    })
  }
  save = () => {
   this.spinner.show();
    if (this.nation.id != 0) {
      this.nationService.update(this.nationForm.getRawValue()).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.nationForm.reset();
          this.router.navigateByUrl("/NationList");
          Swal.fire({
            title: 'success!',
            text: "Nation Updated Successfully",
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
      this.nationService.add(this.nationForm.getRawValue()).subscribe( response =>{
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.nationForm.reset();
          this.router.navigateByUrl("/NationList");
          Swal.fire({
            title: 'success!',
            text: "New Nation Added Successfully",
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
        this.spinner.hide();
      });
    }
  }

  delete = () => {
    if (confirm("Are you sure you want to delete the selected Brand")) {
      this.nationService.delete(this.nation.id).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.router.navigateByUrl("/NationList");
          Swal.fire({
            title: 'success!',
            text: "The selected Nation deleted successfully",
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
    this.router.navigateByUrl("/NationList");
  }
  
  canDeactivate = () => {
    if (this.nationForm.dirty) {
      return confirm("Discard Changes for: " + this.nation.name);
    }
    return true;
  }

}


