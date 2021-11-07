import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminUserDTO } from 'src/app/models/AdminUserDTO';
import { ChangePasswordDTO } from 'src/app/models/ChangePasswordDTO';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  changePasswordDTO: ChangePasswordDTO;
  changePassword_validation_messages = {
    'currentPassword': [
      { type: 'required', message: 'first name is required' },
    ],

    'newPassword': [
      { type: 'required', message: 'new password is required' },
      { type: 'pattern', message: 'Password should be 9 characters at least. include one: capital character, lower character , number and special character.' },
    ],
    'confirmNewPassword': [
      { type: 'required', message: 'confirm password is required' },
      { type: 'mismatchedPasswords', message: 'password and confirm password mis matched' },
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
    this.changePasswordForm = this.formBuilder.group({
      id: [adminUser.id],
      currentPassword: ["", [Validators.required]],
      newPassword: ["",
        Validators.compose([Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],

      confirmNewPassword: ["",
        Validators.compose([Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
    }, { validator: this.matchPassword });
  }

  UpdatePassword = () => {
    this.spinner.show();
    // if (localStorage.getItem('validCaptcha') != null) {

    this.registerService.ChangeAdminPassword(this.changePasswordForm.getRawValue()).subscribe(response => {
      this.spinner.hide();
      if (response.isSubmitted && response.isSubmittedSuccessfully) {

        Swal.fire({
          confirmButtonColor: '#1F1F1F',
          title: 'Success!',
          text: 'Password updated successfully',
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
  matchPassword(control: AbstractControl): ValidationErrors | null {

    const password = control.get("newPassword").value;
    const confirm = control.get("confirmNewPassword").value;


    if (password != confirm) { return { 'noMatch': true } }

    return null

  }

}
