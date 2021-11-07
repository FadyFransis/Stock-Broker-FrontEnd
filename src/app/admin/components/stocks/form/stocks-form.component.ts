import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { StockService } from '../../../../services/stock.service';
import { Response } from '../../../../models/responseDTO';
import { Stock } from '../../../../models/StockDTO';
import { debug } from 'util';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-stocks-form',
  templateUrl: './stocks-form.component.html',
  styleUrls: ['./stocks-form.component.scss']
})

export class StocksFormComponent implements OnInit {
  
  stockForm: FormGroup;
  response: Response<Stock>;
  stock = new Stock;
  stock_validation_messages = {
    'name': [
      { type: 'required', message: 'Stock Name is Required' }
    ],
    // 'description': [
    //   { type: 'minlength', message: 'Stock Description must be more than of 5 characters' },
    //   { type: 'maxlength', message: 'Stock Description must be less than of 500 characters' }
    // ],
    // 'nameAr': [
    //   { type: 'required', message: 'Stock Name is Required' }
    // ],
    // 'descriptionAr': [
    //   { type: 'minlength', message: 'Stock Description must be more than of 10 characters' },
    //   { type: 'maxlength', message: 'Stock Description must be less than of 500 characters' }
    // ],
  };

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    public stockService: StockService) {
  }

  ngOnInit() {
    
    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.stock.id =  Number(p["id"])
        if (this.stock.id != 0) {
          this.getStock();
        }
       
        console.log('get params :', this.stock.id);
        console.log('paraValues',this.stockForm.getRawValue());
      })
    }
    else {
      this.router.navigateByUrl('/StockList');
    }
    this.intiateForm();
  }
  intiateForm = () => {
    console.log('intiate form :' + this.stock.id)
    this.stockForm = this.formBuilder.group({
      id: [this.stock.id],
      name: [this.stock.name, [Validators.required]],
      // description: [this.stock.description, [Validators.minLength(10), Validators.maxLength(500)]],
      // nameAr: [this.stock.nameAr, [Validators.required]],
      // descriptionAr: [this.stock.descriptionAr, [Validators.minLength(10), Validators.maxLength(500)]],
    });
  }
  getStock = () => {
    this.stockService.getById(this.stock.id).subscribe(response => {
      this.response = response;
      this.stock = this.response.result;
      if (this.stock.id !=0) {
        this.stockForm.patchValue(this.stock);
      }
      else {
        this.router.navigateByUrl('/StockList');
      }
    })
  }
  save = () => {
   this.spinner.show();
    if (this.stock.id != 0) {
      this.stockService.update(this.stockForm.getRawValue()).subscribe( response =>{
        this.response = response;
        if (! this.response.isError) {
          this.stockForm.reset();
          this.router.navigateByUrl("/StockList");
          Swal.fire({
            title: 'success!',
            text: "Stock Updated Successfully",
            icon: 'success',
          }) 
          //this.snackBar.open("Category Updated Successfully", "OK");
        }
        else
        Swal.fire({
          title: 'Error!',
          text: this.response.description,
          icon: 'error',
        })
          this.spinner.hide();
    });
  }
    else {
      debugger;
      console.log(this.stockForm.getRawValue());
      this.stockService.add(this.stockForm.getRawValue()).subscribe( response =>{
        this.response = response;
        if (! this.response.isError) {
          this.stockForm.reset();
          this.router.navigateByUrl("/StockList");
          Swal.fire({
            title: 'success!',
            text: "New Stock Added Successfully",
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
  debugger;
      this.stockService.delete(this.stock.id).subscribe(response => {
        this.response = response;
        if (! this.response.isError) {
          this.router.navigateByUrl("/StockList");
          Swal.fire({
            title: 'success!',
            text: "The selected Stock deleted successfully",
            icon: 'success',
          }) //this.snackBar.open("The selected Category deleted successfully", "OK");
        }
        else
        Swal.fire({
          title: 'Error!',
          text: this.response.description,
          icon: 'error',
        })      });
    }
  }
  
  cancel = () => {
    this.router.navigateByUrl("/StockList");
  }
  
  canDeactivate = () => {
    if (this.stockForm.dirty) {
      return confirm("Discard Changes for: " + this.stock.name);
    }
    return true;
  }

}


