import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '../models/responseDTO';
import { Slider } from '../models/SliderDTO';
@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) {

  }

  getAll = () => {
    return this.http.get<Response<Slider[]>>(environment.apiUrl + 'Slider/GetAll');
  }

  getById = (id: number) => {
    return this.http.get<Response<Slider>>(environment.apiUrl + 'Slider/GetSlider?id=' + id);
  }

  add = (Slider: Slider) => {
    return this.http.post<Response<Slider>>(environment.apiUrl + 'Slider/AddSlider', Slider)
  }
  update = (Slider: Slider) => {
    return this.http.post<Response<Slider>>(environment.apiUrl + 'Slider/UpdateSlider', Slider)
  }
  delete = (id: number) => {
    return this.http.get<Response<Slider>>(environment.apiUrl + 'Slider/DeleteSlider?id=' + id)
  }
}
