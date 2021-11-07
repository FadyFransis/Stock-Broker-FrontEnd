import { City } from '../models/CityDTO';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response } from '../models/responseDTO';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) {

    }

    getCity = (countryId) => {
        return this.http.get<Response<City[]>>(environment.apiUrl + 'LookUps/GetCities?Id=' + countryId);
    };
}
