import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import { MaterialModule } from './angular.material';
import { RouterModule } from '@angular/router';
import { TranslateModule , TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatStepperModule, MatIconModule, MatDialogModule } from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';
import {ParentDialogData} from '../admin/components/mange-Categories/list/categories.component'
import {ChildDialogData} from '../admin/components/mange-Categories/list/categories.component'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';  


@NgModule({
  declarations: [
    ParentDialogData,ChildDialogData,
    NotFoundComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule,
    NgxMatSelectSearchModule,
    MatStepperModule,
    MatIconModule,
    MatDialogModule,
    CKEditorModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    TranslateModule,
    NgxSpinnerModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgxMatSelectSearchModule,
    MatStepperModule,MatIconModule,
    CKEditorModule,  


  ],
  entryComponents: [
    ParentDialogData,
    ChildDialogData
  ]
})
export class SharedModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}