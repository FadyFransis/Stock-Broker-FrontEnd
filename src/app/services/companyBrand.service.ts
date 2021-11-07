import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyBrand } from '../models/CompanyBrandDTO';
import { Response } from '../models/responseDTO';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CompanyBrandService {

    constructor(private http: HttpClient) {

    }

    getCompanyBrand = () => {
        return this.http.get<Response<CompanyBrand[]>>(environment.apiUrl + 'CompanyBrand/getall/');
    };
    getById =(id: number)=> {
      return this.http.get<Response<CompanyBrand>>(environment.apiUrl + 'CompanyBrand/GetCompanyBrand?id=' + id);
  };

    GetAllWithCategories = () => {
        return this.http.get<Response<CompanyBrand[]>>(environment.apiUrl + 'CompanyBrand/GetAllWithCategories/');
    };
    add = (model: CompanyBrand) => {
        return this.http.post<Response<CompanyBrand>>(environment.apiUrl + 'CompanyBrand/AddCompanyBrand', model)
      };
      update = (model: CompanyBrand) => {
        return this.http.post<Response<CompanyBrand>>(environment.apiUrl + 'CompanyBrand/UpdateCompanyBrand', model)
      };
      delete = (id: number) => {
        return this.http.get<Response<CompanyBrand>>(environment.apiUrl + 'CompanyBrand/DeleteCompanyBrand?id='+id)
      };
    //   getSearchCategory = (searchText: string) => {
    //     return this.http.get<Response<CompanyBrand[]>>(environment.apiUrl + 'CompanyBrand/SearchCategory?searchText=' + searchText);
    //   }
}