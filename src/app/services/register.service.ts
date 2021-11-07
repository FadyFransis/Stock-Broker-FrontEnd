import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClientRegisterModel } from '../models/RegisterDTO';
import { LoginDTO } from '../models/LoginDTO';
import { Response } from '../models/responseDTO';
import { Client } from '../models/ClientDTO';
import { AdminLoginDTO } from '../models/AdminLoginDTO';
import { AdminDTO } from '../models/AdminDTO';
import { ChangePasswordDTO } from '../models/ChangePasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {
  }

  Register = (model: ClientRegisterModel) => {
    return this.http.post<Response<ClientRegisterModel>>(environment.apiUrl + 'Client/AddClient', model)
  }

  Activate = (model: ClientRegisterModel) => {
    return this.http.post<Response<Client>>(environment.apiUrl + 'Account/ActivateClient', model)
  }

  Login = (model: LoginDTO) => {
    return this.http.post<Response<LoginDTO>>(environment.apiUrl + 'Account/ClientLogin', model)
  }
  AdminLogin = (model: AdminLoginDTO) => {
    return this.http.post<any>(environment.apiUrl + 'Account/AdminLogin', model)
  }

  SendResetPasswordCode = (mobile: string) => {
    return this.http.get<Response<boolean>>(environment.apiUrl + 'Account/SendForgetPasswordCode?Mobile=' + mobile)
  }

  SendAdminForgetPasswordCode = (email: string) => {
    return this.http.get<Response<boolean>>(environment.apiUrl + 'Account/SendAdminForgetPasswordCode?Email=' + email)
  }

  SaveNewPassword = (model: ClientRegisterModel) => {
    return this.http.post<Response<boolean>>(environment.apiUrl + 'Account/ResetPassword', model)
  }
  SaveNewAdminPassword = (model: ClientRegisterModel) => {
    return this.http.post<Response<boolean>>(environment.apiUrl + 'Account/ResetAdminPassword', model)
  }

  UpdateProfile = (model: AdminDTO) => {
    return this.http.post<Response<AdminDTO>>(environment.apiUrl + 'Account/UpdateProfile', model)
  }

  ChangeAdminPassword = (model: ChangePasswordDTO) => {
    return this.http.post<Response<boolean>>(environment.apiUrl + 'Account/ChangeAdminPassword', model)
  }
}
