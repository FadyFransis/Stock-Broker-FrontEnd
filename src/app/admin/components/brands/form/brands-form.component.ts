import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { CompanyBrandService } from '../../../../services/companyBrand.service';
import { Response } from '../../../../models/responseDTO';
import { CompanyBrand } from '../../../../models/CompanyBrandDTO';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.scss']
})
export class BrandsFormComponent implements OnInit {

  companyBrandForm: FormGroup;
  response: Response<CompanyBrand>;
  companyBrand = new CompanyBrand;
  companyBrand_validation_messages = {
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
    public companyBrandService: CompanyBrandService) {
  }

  ngOnInit() {
    this.intiateForm();
    if (this.activatedRoute.snapshot.params['Id']) {
      this.activatedRoute.params.subscribe(p => {
        this.companyBrand.id = p["Id"]
        if (this.companyBrand.id != 0) {
          this.getCompanyBrand();
        }
      })
    }
    else {
      this.router.navigateByUrl('/BrandList');
    }
  }
  intiateForm = () => {
    this.companyBrandForm = this.formBuilder.group({
      id: [this.companyBrand.id],
      name: [this.companyBrand.name, [Validators.required]],
      description: [this.companyBrand.description, [Validators.minLength(10), Validators.maxLength(500)]],
      nameAr: [this.companyBrand.nameAr, [Validators.required]],
      descriptionAr: [this.companyBrand.descriptionAr, [Validators.minLength(10), Validators.maxLength(500)]],
      iconName: [""],
    });
  }
  getCompanyBrand = () => {
    this.companyBrandService.getById(this.companyBrand.id).subscribe(response => {
      this.response = response;
      this.companyBrand = this.response.result;
      if (this.companyBrand.id != 0) {
        this.companyBrandForm.patchValue(this.companyBrand);
      }
      else {
        this.router.navigateByUrl('/BrandList');
      }
    })
  }
  save = () => {
    this.spinner.show();
    if (this.companyBrand.id != 0) {
      this.companyBrandService.update(this.companyBrandForm.getRawValue()).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.companyBrandForm.reset();
          this.spinner.hide();
          this.router.navigateByUrl("/BrandList");
          Swal.fire({
            title: 'success!',
            text: "Updated Successfully",
            icon: 'success',
          })
          //this.snackBar.open("Category Updated Successfully", "OK");
        }
        else {
          this.spinner.hide();
          Swal.fire({
            title: 'Error!',
            text: this.response.errors[0],
            icon: 'error',
          })
        }
        //this.snackBar.open(this.response.errors[0], "OK");
      });
    }
    else {
      this.companyBrandService.add(this.companyBrandForm.getRawValue()).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.companyBrandForm.reset();
          this.spinner.hide();
          this.router.navigateByUrl("/BrandList");
          Swal.fire({
            title: 'success!',
            text: "New Company Brand Added Successfully",
            icon: 'success',
          })
          //this.snackBar.open("New Category Added Successfully", "OK");
        }
        else {
          Swal.fire({
            title: 'Error!',
            text: this.response.errors[0],
            icon: 'error',
          })
          this.spinner.hide();
        }
      });
    }

  }

  delete = () => {
    if (confirm("Are you sure you want to delete the selected Brand")) {
      this.companyBrandService.delete(this.companyBrand.id).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.router.navigateByUrl("/BrandList");
          Swal.fire({
            title: 'success!',
            text: "The selected Company Brand deleted successfully",
            icon: 'success',
          }) //this.snackBar.open("The selected Category deleted successfully", "OK");
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

  cancel = () => {
    this.router.navigateByUrl("/BrandList");
  }

  canDeactivate = () => {
    if (this.companyBrandForm.dirty) {
      return confirm("Discard Changes for: " + this.companyBrand.name);
    }
    return true;
  }
  onFileComplete(data: any) {

    this.companyBrandForm.patchValue({
      iconName: data
    });
    this.companyBrandForm.markAsDirty()
  }

}
