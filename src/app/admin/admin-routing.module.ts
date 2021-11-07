import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../services/config/can-deactivate-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

import { NationsListComponent } from './components/Nations/list/nations-list.component';
import { NationsFormComponent } from './components/Nations/form/nations-form.component';
import { CategoriesComponent } from './components/mange-Categories/list/categories.component';
import { CategoryFormComponent } from './components/mange-Categories/form/category-form.component';
import { AuthGuard } from './../services/config/auth.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { StocksListComponent } from './components/stocks/list/stocks-list.component';
import { StocksFormComponent } from './components/stocks/form/stocks-form.component';



const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'NationList', component: NationsListComponent },
      { path: 'NationList/:id', component: NationsFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'Categories', component: CategoriesComponent },
      { path: 'Categories/:id', component: CategoryFormComponent, canDeactivate: [CanDeactivateGuard] },

      { path: 'StockList', component: StocksListComponent },
      { path: 'StockList/:id', component: StocksFormComponent, canDeactivate: [CanDeactivateGuard] },

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
