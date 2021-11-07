import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatestNews } from '../models/LatestNewsDTO';
import { Response } from '../models/responseDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LatestNewsService {
  constructor(private http: HttpClient) {
  }

  getLatestNews = () => {
    return this.http.get<Response<LatestNews[]>>(environment.apiUrl + 'LatestNews/GetAll/');
  };
  getById = (id: number) => {
    return this.http.get<Response<LatestNews>>(environment.apiUrl + 'LatestNews/GetLatestNews?id=' + id);
  };


  add = (model: LatestNews) => {
    return this.http.post<Response<LatestNews>>(environment.apiUrl + 'LatestNews/AddLatestNews', model)
  };
  update = (model: LatestNews) => {
    return this.http.post<Response<LatestNews>>(environment.apiUrl + 'LatestNews/UpdateLatestNews', model)
  };
  delete = (id: number) => {
    return this.http.get<Response<LatestNews>>(environment.apiUrl + 'LatestNews/DeleteLatestNews?id=' + id)
  };

}