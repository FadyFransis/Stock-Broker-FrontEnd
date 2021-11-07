import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminUserDTO } from 'src/app/models/AdminUserDTO';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
})
export class MyprofileComponent implements OnInit {
  myProfileForm: FormGroup;
  adminUser: AdminUserDTO
  myProfile_validation_messages = {
    'firstName': [
      { type: 'required', message: 'first name is required' },
      { type: 'maxlength', message: 'first name must be less than or equal 25 character' }
    ],

    'lastName': [
      { type: 'required', message: 'last name is required' },
      { type: 'maxlength', message: 'last name must be less than or equal 25 character' }
    ],
    'phoneNumber': [
      { type: 'required', message: 'phone number is required' },
      { type: 'pattern', message: 'Mobile must be only numbers' },
      { type: 'maxlength', message: 'Phone Number must be less than or equal 15 numbers' },
      { type: 'minlength', message: 'Phone number must be at least 8 numbers' },
    ],
    'userName': [
      { type: 'required', message: 'first name is required' },
      { type: 'maxlength', message: 'first name must be less than or equal 25 character' }
    ],


  };
  constructor(public formBuilder: FormBuilder,
    public registerService: RegisterService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.intiateForm();
  }
  intiateForm = () => {

    var adminUser = JSON.parse(localStorage.getItem('AdminInfo'));
    this.adminUser = {
      id: adminUser.id,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      phoneNumber: adminUser.phoneNumber,
      userName: adminUser.userName
    };

    this.myProfileForm = this.formBuilder.group({
      id: [this.adminUser.id],
      firstName: [this.adminUser.firstName, [Validators.required, Validators.maxLength(25)]],
      lastName: [this.adminUser.lastName, [Validators.required, Validators.maxLength(25)]],
      userName: [this.adminUser.userName, [Validators.required]],
      phoneNumber: [this.adminUser.phoneNumber,
      Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15),
      Validators.pattern('^[0-9]*$')])]
    });
  }

  UpdateProfile = () => {
    this.spinner.show();
    // if (localStorage.getItem('validCaptcha') != null) {

    this.registerService.UpdateProfile(this.myProfileForm.getRawValue()).subscribe(response => {
      this.spinner.hide();
      if (response.isSubmitted && response.isSubmittedSuccessfully) {
        localStorage.removeItem("AdminInfo");
        localStorage.setItem('AdminInfo', JSON.stringify(response.model))
        Swal.fire({
          confirmButtonColor: '#1F1F1F',
          title: 'Success!',
          text: 'Profile information updated successfully',
          icon: 'success',
        });
      } else {
        Swal.fire({
          confirmButtonColor: '#1F1F1F',
          title: 'Error!',
          text: response.errors[0],
          icon: 'error',
        });
      }
      this.spinner.hide();
    });
    // }
  }

}
