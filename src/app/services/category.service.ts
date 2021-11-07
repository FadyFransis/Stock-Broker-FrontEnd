import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/categoryDTO';
import { Response } from '../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) {
  }

  getAll = () => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/GetAll');
  }
  GetAllCategories = () => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/GetAllCategories');
  }
  GetAllCategoriesWithParent = () => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/GetAllCategoriesWithParent');
  }
  // GetAllParentsWithRelations = () => {
  //   return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/GetAllParentsWithRelations');
  // }
  getAllParents = () => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/GetAllParents');
  }

  getAllParentsWithChild = () => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/getAllParentsWithChilds');
  }
  getCategoryChilds = (categoryId: number) => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/GetAllCategoriesByParentId?ParentCategoryID=' + categoryId);
  }
  getById = (id: number) => {
    return this.http.get<Response<Category>>(environment.apiUrl + 'Category/GetCategory?id=' + id);
  }

  getSubcategoriesById = (parentId: number) => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/GetAllCategoriesByParentId?ParentCategoryID=' + parentId);
  }
  add = (category: Category) => {
    return this.http.post<Response<Category>>(environment.apiUrl + 'Category/AddCategory', category)
  }
  update = (category: Category) => {
    return this.http.post<Response<Category>>(environment.apiUrl + 'Category/UpdateCategory', category)
  }
  delete = (id: number) => {
    return this.http.get<Response<Category>>(environment.apiUrl + 'Category/DeleteCategory?id=' + id)
  }
  getSearchCategory = (searchText: string) => {
    return this.http.get<Response<Category[]>>(environment.apiUrl + 'Category/SearchCategory?searchText=' + searchText);
  }

}
