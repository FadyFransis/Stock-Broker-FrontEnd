import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../services/config/can-deactivate-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

import { ManageClientsComponent } from './components/manage-clients/manage-clients.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
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
import { CategoriesComponent } from './components/mange-Categories/list/categories.component';
import { CategoryFormComponent } from './components/mange-Categories/form/category-form.component';
import { AuthGuard } from './../services/config/auth.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { ItemAccessoriesComponent } from './components/item-accessories/item-accessories.component';
import { LatestNewsListComponent } from './components/manage-news/list/latest-news-list.component';
import { LatestNewsFormComponent } from './components/manage-news/form/latest-news-form.component';
import { SliderListComponent } from './components/mange-slider/list/slider-list.component';
import { SliderFormComponent } from './components/mange-slider/form/slider-form.component';
import { MangeCurrenciesComponent } from './components/mange-currencies/mange-currencies.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { StocksListComponent } from './components/stocks/list/stocks-list.component';
import { StocksFormComponent } from './components/stocks/form/stocks-form.component';



const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'Clients', component: ManageClientsComponent },
      { path: 'Orders', component: ManageOrdersComponent },
      { path: 'Items', component: ManageItemsComponent },
      { path: 'BrandList', component: BrandsListComponent },
      { path: 'BrandList/:Id', component: BrandsFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'VoucherList', component: VouchersListComponent },
      { path: 'VoucherList/:id', component: VouchersFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'SpecList', component: SpecsListComponent },
      { path: 'SpecList/:id', component: SpecsFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'NationList', component: NationsListComponent },
      { path: 'NationList/:id', component: NationsFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'ItemDetails/:id', component: ItemDetailsComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'Categories', component: CategoriesComponent },
      { path: 'Categories/:id', component: CategoryFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'ItemAccessories/:id', component: ItemAccessoriesComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'LatestNewsList', component: LatestNewsListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'LatestNewsList/:id', component: LatestNewsFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'SliderList', component: SliderListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'SliderList/:id', component: SliderFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'CurrenciesRates', component: MangeCurrenciesComponent, canDeactivate: [CanDeactivateGuard] },

      { path: 'StockList', component: StocksListComponent },
      { path: 'StockList/:id', component: StocksFormComponent, canDeactivate: [CanDeactivateGuard] },

      { path: 'MyProfile', component: MyprofileComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'ChangePassword', component: ChangePasswordComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'ClientDetail/:id', component: ClientDetailsComponent, canDeactivate: [CanDeactivateGuard] },
      { path: '**', component: NotFoundComponent }, // wiledcard path used when no other path match
    ], canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [CanDeactivateGuard]
})
export class AdminRoutingModule { }
