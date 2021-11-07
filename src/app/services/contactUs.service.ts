import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ContactUsDTO } from '../models/ContactUsDTO';
import { Response } from '../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class ContactUSService {
  constructor(private http: HttpClient) {
  }

  SendMessage = (model: ContactUsDTO) => {
    return this.http.post<Response<ContactUsDTO>>(environment.apiUrl + 'Common/SendContactUsMessage', model)
  }

  AddEmailSubscriptionList = (email: string) => {
    return this.http.get<Response<string>>(environment.apiUrl + 'Common/AddEmailSubscriptionList?email='+ email)
  }

}
