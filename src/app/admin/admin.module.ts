import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminRoutingModule } from './admin-routing.module';

import { ManageClientsComponent } from './components/manage-clients/manage-clients.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { LanguagePipe } from '../admin/pipes/lang-pipe';
import { ManageItemsComponent } from './components/manage-items/manage-items.component';
import { BrandsListComponent } from './components/brands/list/brands-list.component';
import { BrandsFormComponent } from './components/brands/form/brands-form.component';
import { VouchersListComponent } from './components/vouchers/list/vouchers-list.component';
import { VouchersFormComponent } from './components/vouchers/form/vouchers-form.component';
import { SpecsListComponent } from './components/Specs/list/specs-list.component';
import { SpecsFormComponent } from './components/Specs/form/specs-form.component';
import { NationsListComponent } from './components/Nations/list/nations-list.component';
import { NationsFormComponent } from './components/Nations/form/nations-form.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import {CategoriesComponent} from './components/mange-Categories/list/categories.component';
import {CategoryFormComponent} from './components/mange-Categories/form/category-form.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { AuthGuard } from './../services/config/auth.guard';
import { ItemAccessoriesComponent } from './components/item-accessories/item-accessories.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LatestNewsFormComponent } from './components/manage-news/form/latest-news-form.component';
import { LatestNewsListComponent } from './components/manage-news/list/latest-news-list.component';
import { FilterPipe } from './pipes/filter-pipe';
import { SliderFormComponent } from './components/mange-slider/form/slider-form.component';
import { SliderListComponent } from './components/mange-slider/list/slider-list.component';
import { MangeCurrenciesComponent } from './components/mange-currencies/mange-currencies.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { StocksListComponent } from './components/stocks/list/stocks-list.component';
import { StocksFormComponent } from './components/stocks/form/stocks-form.component';

@NgModule({
  declarations: [    
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    AdminLayoutComponent,
    ManageClientsComponent,
    ManageOrdersComponent,
    LanguagePipe,
    ManageItemsComponent,
    BrandsListComponent,
    BrandsFormComponent,
    VouchersListComponent,
    VouchersFormComponent,
    SpecsListComponent,
    SpecsFormComponent,
    NationsListComponent,
    NationsFormComponent,
    ItemDetailsComponent,
    CategoriesComponent,
    CategoryFormComponent,
    ImageUploadComponent,
    ItemAccessoriesComponent,
    FileUploadComponent,
    LatestNewsFormComponent,
    LatestNewsListComponent,
    FilterPipe,
    SliderFormComponent,
    SliderListComponent,
    MangeCurrenciesComponent,
    MyprofileComponent,
    ChangePasswordComponent,
    ClientDetailsComponent,
    StocksListComponent,
    StocksFormComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  providers:[AuthGuard]
})
export class AdminModule { }
