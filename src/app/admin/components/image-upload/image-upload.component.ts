import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {
      HttpClient, HttpResponse, HttpRequest,
      HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemImage } from 'src/app/models/ItemImagesDTO';
import Swal from 'sweetalert2'

@Component({
      selector: 'app-image-upload',
      templateUrl: './image-upload.component.html',
      styleUrls: ['./image-upload.component.scss'],
      animations: [
            trigger('fadeInOut', [
                  state('in', style({ opacity: 100 })),
                  transition('* => void', [
                        animate(300, style({ opacity: 0 }))
                  ])
            ])
      ]
})
export class ImageUploadComponent implements OnInit {
      @Input() allowMulti = false;
      /** Link text */
      @Input() text = 'Upload';
      /** Name used in form which will be sent in HTTP request. */
      @Input() param = 'file';
      /** Image paths */
      @Input() itemImages = Array<ItemImage>();
      /** Image path */
      @Input() iconName = "";
      /** Target URL for file uploading. */
      @Input() target = 'https://file.io';
      /** File extension that accepted, same as 'accept' of <input type="file" />. 
          By the default, it's set to 'image/*'. */
      @Input() accept = 'image/*';
      /** Allow you to add handler after its completion. Bubble up response text from remote. */
      @Output() complete = new EventEmitter<any>();
      @Output() setCoverPhoto = new EventEmitter<string>();

      public files: Array<FileUploadModel> = [];

      constructor(private _http: HttpClient) { }

      ngOnInit() {
      }

      upload() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.onchange = () => {
                  for (let index = 0; index < fileUpload.files.length; index++) {
                        const file = fileUpload.files[index];
                        this.files.push({
                              data: file, state: 'in',
                              inProgress: false, progress: 0, canRetry: false, canCancel: true
                        });
                  }
                  this.uploadFiles();
            };
            fileUpload.click();
      }

      cancelFile(file: FileUploadModel) {
            file.sub.unsubscribe();
            this.removeFileFromArray(file);
      }

      retryFile(file: FileUploadModel) {
            this.uploadFile(file);
            file.canRetry = false;
      }

      private uploadFile(file: FileUploadModel) {
            const fd = new FormData();
            fd.append(this.param, file.data);

            const req = new HttpRequest('POST', environment.apiUrl + 'Common/UploadImages/' + this.target, fd, {
                  reportProgress: true
            });

            file.inProgress = true;
            file.sub = this._http.request(req).pipe(
                  map(event => {
                        switch (event.type) {
                              case HttpEventType.UploadProgress:
                                    file.progress = Math.round(event.loaded * 100 / event.total);
                                    break;
                              case HttpEventType.Response:
                                    return event;
                        }
                  }),
                  tap(message => { }),
                  last(),
                  catchError((error: HttpErrorResponse) => {
                        file.inProgress = false;
                        file.canRetry = true;
                        return of(`${file.data.name} upload failed.`);
                  })
            ).subscribe(
                  (event: any) => {
                        if (typeof (event) === 'object') {
                              this.removeFileFromArray(file);
                              this.iconName = event.body[0];
                              if(this.allowMulti){
                                    if(!this.itemImages)
                                        this.itemImages = Array<ItemImage>();
                                    this.itemImages.push({"iconName":event.body[0], "recordStatus" : 0} );
                                    this.complete.emit(this.itemImages);
                              }
                              else
                                    this.complete.emit(this.iconName);

                        }
                  }
            );
      }

      private uploadFiles() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.value = '';

            this.files.forEach(file => {
                  this.uploadFile(file);
            });
      }

      private removeFileFromArray(file: FileUploadModel) {
            const index = this.files.indexOf(file);
            if (index > -1) {
                  this.files.splice(index, 1);
            }
      }
      deleteImage(img){
            Swal.fire({
                  title: 'Are you sure you want to delete Image',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.value) {
                        if(img.id){
                              this.itemImages.find(f=>f.id == img.id).recordStatus = 1;
                        }
                        else{
                              let index = this.itemImages.indexOf(img);
                              this.itemImages.splice(index , 1)
                        }
                        this.complete.emit(this.itemImages);
                  }
                });

      }
      makeCover (img){
            this.iconName = img.iconName;
            this.setCoverPhoto.emit(img.iconName);
      }

}

export class FileUploadModel {
      data: File;
      state: string;
      inProgress: boolean;
      progress: number;
      canRetry: boolean;
      canCancel: boolean;
      sub?: Subscription;
}
