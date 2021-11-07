import { Country } from '../models/CountryDTO';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '../models/responseDTO';

@Injectable({
    providedIn: 'root'
  })
export class CountryService {
  
    constructor(private http: HttpClient) {
        
      }

   getCountries = () => {
    return this.http.get<Response<Country[]>>(environment.apiUrl + 'country/getall/' );
    };
}
