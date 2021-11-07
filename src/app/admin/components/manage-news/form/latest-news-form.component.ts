import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LatestNews } from 'src/app/models/LatestNewsDTO';
import { LatestNewsService } from 'src/app/services/latestNews.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';  


@Component({
  selector: 'app-latest-news-form',
  templateUrl: './latest-news-form.component.html',
  styleUrls: ['./latest-news-form.component.scss']
})
export class LatestNewsFormComponent implements OnInit {
  latestNews = new LatestNews;
  public Editor = ClassicEditor;  
  latestNewsForm: FormGroup;
  addImageCheckBox: boolean;
  latestNews_validation_messages = {
   

    'imagePath': [
      { type: 'required', message: 'Required' }
    ],
    'title': [
      { type: 'required', message: 'Required' }
    ],
    'description': [
      { type: 'required', message: 'Required' }
    ],
  };
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private spinner: NgxSpinnerService,
    public latestNewsService: LatestNewsService, public formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.addImageCheckBox = false;
    this.intiateForm();
    if (this.activatedRoute.snapshot.params['id']) {
      this.activatedRoute.params.subscribe(p => {
        this.latestNews.id = p["id"]
        if (this.latestNews.id != 0) {
          this.getById();
        }
        else
        this.latestNewsForm.patchValue({
          id: 0
        });
      })
    }
    else {
      this.router.navigateByUrl('/latestNewsList');
    }
  }
  onFileComplete(data: any) {
    this.latestNewsForm.patchValue({
      imagePath: data
    });
    this.latestNewsForm.markAsDirty()
  }

  getById = () => {
    this.latestNewsService.getById(this.latestNews.id).subscribe(response => {
      debugger
      this.latestNews = response.result;
     
      this.latestNewsForm.patchValue(this.latestNews);
    })
  }
  intiateForm = () => {
    this.latestNewsForm = this.formBuilder.group({
      id: [this.latestNews.id],
      redirectLink: [this.latestNews.redirectLink],
      videoUrl: [this.latestNews.videoUrl],
      imagePath: [this.latestNews.videoUrl, [Validators.required]],
      title:[this.latestNews.title, [Validators.required]],
      description:[this.latestNews.description, [Validators.required]],

     
    });
  }

  cancel = () => {
    this.router.navigateByUrl("/LatestNewsList");
  }


  save = () => {
debugger;
    this.spinner.show();
    this.latestNews = this.latestNewsForm.getRawValue();
    if (this.latestNews.id != 0) {
      this.latestNewsService.update(this.latestNews).subscribe(response => {
        response;
        if (response.isSubmitted && response.isSubmittedSuccessfully) {
          this.latestNewsForm.reset();
          this.router.navigateByUrl("/LatestNewsList");
          Swal.fire({
            title: 'success!',
            text: "latestNews Updated Successfully",
            icon: 'success',
          })
          this.spinner.hide();
        }
        else
          Swal.fire({
            title: 'Error!',
            text: response.errors[0],
            icon: 'error',
          })
      });
      this.spinner.hide()
    }
    else {
      this.latestNewsService.add(this.latestNews).subscribe(response => {

        if (response.isSubmitted && response.isSubmittedSuccessfully) {
          this.latestNewsForm.reset();
          this.router.navigateByUrl("/LatestNewsList");
          Swal.fire({
            title: 'success!',
            text: "New latestNews Added Successfully",
            icon: 'success',
          })
        }
        else
          Swal.fire({
            title: 'Error!',
            text: response.errors[0],
            icon: 'error',
          })
        this.spinner.hide();
      });
    }

  }
}
