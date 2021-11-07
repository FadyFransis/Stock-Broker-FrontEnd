import { Injectable } from '@angular/core';
import { Item } from '../models/ItemDTO';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../models/responseDTO';
import { Order } from '../models/orderDTO';
import { ClientFavoite } from '../models/ClientFavoriteDTO';
import { ItemRate } from '../models/ItemRateDTO';
import { ItemsAccessory } from '../models/ItemsAccessoryDTO';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  cartItemsCount: number;
  itemsToCompare = new Array<Item>();
  orderinMemoty: Order
  cartItemsCountSourse = new BehaviorSubject(this.cartItemsCount);
  itemsToCompareSourse = new BehaviorSubject(this.itemsToCompare);

  constructor(private http: HttpClient) {
    this.getCartItemsCount();
  }

  getAll = () => {
    return this.http.get<Response<Item[]>>(environment.apiUrl + 'Item/GetAll');
  }
  getAllWithHides = () => {
    return this.http.get<Response<Item[]>>(environment.apiUrl + 'Item/GetAllWithHides');
  }
  getById = (id: number) => {
    return this.http.get<Response<Item>>(environment.apiUrl + 'Item/GetItemDetails?id=' + id);
  }
  getByCategoryId = (categoryId: number) => {
    return this.http.get<Response<Item[]>>(environment.apiUrl + 'Item/GetItemByCategory?CatId=' + categoryId);
  }

  GetItemsByCategoryAndBrand = (categoryId: number, brandId: number) => {
    return this.http.get<Response<Item[]>>(environment.apiUrl + 'Item/GetItemsByCategoryAndBrand?categoryId='
      + categoryId + '&brandId=' + brandId);
  }

  getAllByBrand = (brandId: number) => {
    return this.http.get<Response<Item[]>>(environment.apiUrl + 'Item/GetAllByBrand?brandId=' + brandId);
  }

  add = (item: Item) => {
    return this.http.post<Response<Item>>(environment.apiUrl + 'Item/AddItem', item)
  }
  update = (item: Item) => {
    return this.http.post<Response<Item>>(environment.apiUrl + 'Item/UpdateItem', item)
  }
  delete = (id: number) => {
    return this.http.get<Response<Item>>(environment.apiUrl + 'Item/DeleteItem?id=' + id)
  }
  getCartItemsCount = () => {
    this.cartItemsCount = 0;
    if (localStorage.getItem('order')) {
      this.orderinMemoty = JSON.parse(localStorage.getItem('order'));
      this.cartItemsCount = this.orderinMemoty.orderItems.length;
      // for (let oi of this.orderinMemoty.orderItems) {
      //   this.cartItemsCount += oi.quantity;
      // }
    }
    this.cartItemsCountSourse.next(this.cartItemsCount)
  }
  increeaseCartItemsCount = (value: number) => {
    this.cartItemsCount = value;
    this.cartItemsCountSourse.next(this.cartItemsCount)
  }
  decreeaseCartItemsCount = (value: number) => {
    this.cartItemsCount -= value;
    this.cartItemsCountSourse.next(this.cartItemsCount)
  }

  getSearch = (filterModel: any) => {
    return this.http.post<Response<Item[]>>(environment.apiUrl + 'Item/FilterSearchResult', filterModel);

  }
  FilterSearchResult = (filterModel: any) => {
    return this.http.post<Response<any>>(environment.apiUrl + 'Item/FilterSearchResult', filterModel);
  }
  getFavorites = (clientId: number) => {
    return this.http.get<Response<ClientFavoite[]>>(environment.apiUrl + 'ClientFavorite/GetAllItemFavoritesByClientId?ClientId=' + clientId);
  }
  UnFavourite = (clientId: number,itemId:number) => {
    return this.http.get<Response<ClientFavoite>>(environment.apiUrl + 'ClientFavorite/UnFavourite?clientId=' + clientId + '&itemId='+itemId);
  }
  addFavorite = (clientFavoite: ClientFavoite) => {
    return this.http.post<Response<ClientFavoite>>(environment.apiUrl + 'ClientFavorite/AddClientFavorite', clientFavoite);
  }

  SendPriceMatchingLink = (url: string, comment: string) => {
    return this.http.get<Response<string>>(environment.apiUrl + 'Common/SendPriceMatchingLink?url=' + url + "&comment=" + comment)
  }

  GetItemsFavoritesByClientId = (clientId: number) => {
    return this.http.get<Response<Item[]>>(environment.apiUrl + 'ClientFavorite/GetItemsFavoritesByClientId?ClientId=' + clientId);
  }

  addToCompareSourse = (item: Item) => {
    this.itemsToCompare.push(item);
    this.itemsToCompareSourse.next(this.itemsToCompare)
  }

  removeFromCompareSourse = (item: Item) => {
    this.itemsToCompare.splice(this.itemsToCompare.indexOf(item),1);
    this.itemsToCompareSourse.next(this.itemsToCompare)
  }

  clearCompareSourse = () => {
    this.itemsToCompare= [];
    this.itemsToCompareSourse.next(this.itemsToCompare)
  }
  addItemRate(itemRate : ItemRate){
        return this.http.post<Response<ItemRate>>(environment.apiUrl + 'ItemRate/AddItemRate', itemRate);
  }

  editItemRate(itemRate : ItemRate){
    return this.http.post<Response<ItemRate>>(environment.apiUrl + 'ItemRate/UpdateItemRate', itemRate);
}

SearhItems = (searchText: string) => {
  return this.http.get<Response<Item[]>>(environment.apiUrl + 'Item/SearchItem?searchText='+searchText);
}

  LoadItemsbyIdS = (ids:number[]) => {
    return this.http.post<Response<Item[]>>(environment.apiUrl + 'Item/LoadItemsbyIdS', ids);
  }

  LoadRelatedItems = (id: number) => {
    return this.http.get<Response<Item[]>>(environment.apiUrl + 'Item/LoadRelatedItems?Id=' + id);
  }

  GetItemsRelatedAccessories = (id: number) => {
    return this.http.get<Response<Item[]>>(environment.apiUrl + 'ItemsAccessory/GetItemsRelatedAccessories?itemID=' + id);
  }

  AddMultipleItemsAccessory = (items: ItemsAccessory[]) => {
    return this.http.post<Response<boolean>>(environment.apiUrl + 'ItemsAccessory/AddMultipleItemsAccessory', items)
  }

  DeleteItemAccessoryByParentAndChild = (parentid: number,childId:number) => {
    return this.http.get<Response<boolean>>(environment.apiUrl + 'ItemsAccessory/DeleteItemAccessoryByParentAndChild?parentid=' + parentid+'&childId='+childId);
  }
}
