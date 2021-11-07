import { Category } from '../models/categoryDTO';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsBrandService {
  constructor(private http: HttpClient) {
  }

  GetAllCategoryByBrandId = (brandId: number) => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/GetAllCategoryByBrandId?BrandId=' + brandId);
  };
}
