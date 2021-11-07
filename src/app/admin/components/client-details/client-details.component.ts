import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Client } from 'src/app/models/ClientDTO';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
})
export class ClientDetailsComponent implements OnInit {
  clientForm: FormGroup;
  client = new Client;
  client_validation_messages = {
    'name': [
      { type: 'required', message: 'First name is required' },
      { type: 'maxlength', message: 'Name must be less than or equal 25 characters' },

    ],
    'lastName': [
      { type: 'required', message: 'Last name is required' },
      { type: 'maxlength', message: 'Name must be less than or equal 25 characters' },
    ],
    'email': [
      { type: 'required', message: 'email is required' }
    ],
    'mobile': [
      { type: 'required', message: 'mobile number is required' },
      { type: 'pattern', message: 'Mobile_pattern' },
      { type: 'maxlength', message: 'Phone Number must be less than or equal 15 numbers' },
      { type: 'minlength', message: 'Phone number must be at least 8 numbers' },
    ],
    'address': [
      { type: 'required', message: 'address is required' }
    ],

  };
  constructor(public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.intiateForm();
    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.client.id = p["id"]
        if (this.client.id != 0) {
          this.getClient();
        }
      })
    }
    else {
      this.router.navigateByUrl('/Clients');
    }
  }
  cancel() {
    this.router.navigateByUrl('/Clients');
  }
  getClient = () => {
    this.spinner.show();
    this.clientService.getCustomer(this.client.id).subscribe(response => {
      this.client = response.result;
      debugger;
      if (this.client.id) {
        this.clientForm.patchValue(this.client);
      }
      else {
        this.router.navigateByUrl('/Clients');
      }
    })
    this.spinner.hide();
  }
  intiateForm = () => {
    this.clientForm = this.formBuilder.group({
      id: [this.client.id],
      name: [this.client.name, [Validators.required, Validators.maxLength(25)]],
      lastName: [this.client.name, [Validators.required, Validators.maxLength(25)]],
      email: [this.client.name, [Validators.required]],
      mobile: [this.client.name, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15),
      Validators.pattern('^[0-9]*$')])],
      address: [this.client.name, Validators.required],

    });
  }

  save = () => {
    
    this.spinner.show();
    this.client.name=this.clientForm.get('name').value;
    this.client.lastName=this.clientForm.get('lastName').value;
    this.client.address=this.clientForm.get('address').value;
      this.clientService.updateClient(this.client).subscribe( response =>{
        
        this.spinner.hide();

        if (response.isSubmitted && response.isSubmittedSuccessfully) {
          Swal.fire({
            title: 'success!',
            text: "Client Updated Successfully",
            icon: 'success',
          }) 
          this.router.navigateByUrl("/Clients");
       
          //this.snackBar.open("Category Updated Successfully", "OK");
        }
        else
        Swal.fire({
          title: 'Error!',
          text: response.errors[0],
          icon: 'error',
        })
          //this.snackBar.open(this.response.errors[0], "OK");
    });
    
  

  }
}
