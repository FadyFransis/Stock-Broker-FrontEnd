import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { VoucherService } from '../../../../services/voucher.service';
import { Response } from '../../../../models/responseDTO';
import { VoucherDTO, VoucherType } from '../../../../models/VoucherDTO';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/ClientDTO';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-vouchers-form',
  templateUrl: './vouchers-form.component.html',
  styleUrls: ['./vouchers-form.component.scss']
})
export class VouchersFormComponent implements OnInit {
  voucherForm: FormGroup;
  response: Response<VoucherDTO>;
  voucher = new VoucherDTO;
  typeList: any;
  VoucherTypeEnum = VoucherType;
  clients: Client[];
  clientIds: number[];
  dataSource: MatTableDataSource<Client>;
  showClients: boolean;
  displayedColumns = ['select', 'ClientId', 'FullName', 'Email', 'Mobile'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sortClients: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginatorClients: MatPaginator;

  selection = new SelectionModel<Client>(true, []);
  voucher_validation_messages = {
    'title': [
      { type: 'required', message: 'Name_required' }
    ],
    'description': [
      { type: 'required', message: 'Required' },
      { type: 'minlength', message: 'Desc_more' },
      { type: 'maxlength', message: 'Desc_less' }
    ],
    'amount': [
      { type: 'required', message: 'Required' }
    ],
    'points': [
      { type: 'required', message: 'Required' }
    ],
    'type': [
      { type: 'required', message: 'Required' }
    ],
    'duration': [
      { type: 'required', message: 'Required' }
    ],
  };
  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    public voucherService: VoucherService,
    private clientService: ClientService) {
  }
  ngOnInit() {
    this.voucher.assignedToClients = false;

    this.voucher.id = 0;
    this.showClients = false;
    this.intiateForm();
    this.clientIds = [];

    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.voucher.id = p["id"]
        if (this.voucher.id != 0) {
          this.getById();
        }
          this.loadClients();
      
      })
    }
    else {
      this.router.navigateByUrl('/VoucherList');
    }
  }
  intiateForm = () => {
    this.typeList = this.getENUM(this.VoucherTypeEnum);
    this.voucherForm = this.formBuilder.group({
      id: [this.voucher.id],
      title: [this.voucher.title, [Validators.required]],
      description: [this.voucher.description, [Validators.minLength(10), Validators.maxLength(500)]],
      amount: [this.voucher.amount, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      points: [this.voucher.points, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      type: [this.voucher.type, [Validators.required]],
      validDurationByMonth: [this.voucher.validDurationByMonth, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      assignedToClients: [this.voucher.assignedToClients]

    });
  }
  getById = () => {
    this.spinner.show();
    this.voucherService.getById(this.voucher.id).subscribe(response => {
      this.spinner.hide();
      this.response = response;
      this.voucher = this.response.result;
      if (this.voucher.id != 0) {
        this.showClients = this.voucher.assignedToClients;
        this.voucherForm.patchValue(this.voucher);
      }
      else {
        this.router.navigateByUrl('/VoucherList');
      }
    })
  }

  loadClients() {

    this.clientService.getCustomers().subscribe(response => {
      this.clients = response.result;
      this.organizeClients();
    });
  }
  organizeClients() {
    this.spinner.show();
    this.dataSource = new MatTableDataSource(this.clients);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.spinner.hide();
  }
  save = () => {
   debugger;
    this.spinner.show();
    this.voucher = this.voucherForm.getRawValue();
    if(this.voucher.type==2 && Number( this.voucher.amount)>=100)
    {
      this.spinner.hide();
      Swal.fire({
        title: 'info!',
        text: "Amount should exceed to 100 %",
        icon: 'info',
      })
      return;
    }
    if (this.showClients)
    {
      this.voucher.clientIds = this.clientIds;
      if(this.clientIds.length==0)
      {
        this.spinner.hide();
        Swal.fire({
          title: 'Info!',
          text: "please select client",
          icon: 'info',
        })
        return;
      }
    }
    if (this.voucher.id != 0) {
      this.voucherService.update(this.voucher).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.voucherForm.reset();
          this.router.navigateByUrl("/VoucherList");
          Swal.fire({
            title: 'success!',
            text: "Voucher Updated Successfully",
            icon: 'success',
          })
          this.spinner.hide();
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
      this.spinner.hide()
    }
    else {
      this.voucherService.add(this.voucher).subscribe(response => {
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.voucherForm.reset();
          this.router.navigateByUrl("/VoucherList");
          Swal.fire({
            title: 'success!',
            text: "New Voucher Added Successfully",
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
    if (confirm("Are you sure you want to delete the selected Voucher")) {
      this.spinner.show();
      this.voucherService.delete(this.voucher.id).subscribe(response => {
        this.spinner.hide();
        this.response = response;
        if (this.response.isSubmitted && this.response.isSubmittedSuccessfully) {
          this.router.navigateByUrl("/VoucherList");
          Swal.fire({
            title: 'success!',
            text: "The selected Voucher deleted successfully",
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
    this.router.navigateByUrl("/VoucherList");
  }
  ChangeAssignedClients(event) {
    
    this.showClients = event.target.checked
  }
  canDeactivate = () => {
    if (this.voucherForm.dirty) {
      return confirm("Discard Changes");
    }
    return true;
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
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  selectRow($event, dataSource) {
    
    // console.log($event.checked);
    if ($event.checked) {
      this.clientIds.push(dataSource.id)
    }
    else {
      var index = this.clientIds.findIndex(x => x == dataSource.id);
      if (index > -1) {
        this.clientIds.splice(index, 1)
      }
    }
  }


  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }
  search = (filterValue: string) => {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

 

}
