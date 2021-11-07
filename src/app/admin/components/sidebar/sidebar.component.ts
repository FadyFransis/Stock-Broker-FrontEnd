import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/SliderList', title: 'Home Page Slider',  icon:'touch_app', class: '' },
    { path: '/StockList', title: 'Stocks ',  icon:'bubble_chart', class: '' },
    { path: '/Categories', title: 'Categories',  icon:'bubble_chart', class: '' },
    { path: '/Items', title: 'Items',  icon:'settings', class: '' },
    { path: '/Clients', title: 'Manage Customers ',  icon:'person', class: '' },
    { path: '/Orders', title: 'Orders',  icon:'content_paste', class: '' },
    { path: '/BrandList', title: 'Brands',  icon:'library_books', class: '' },
    { path: '/VoucherList', title: 'Vouchers',  icon:'bubble_chart', class: '' },
    { path: '/NationList', title: 'Nations',  icon:'question_answer', class: '' },
    { path: '/LatestNewsList', title: 'Latest News',  icon:'bubble_chart', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
