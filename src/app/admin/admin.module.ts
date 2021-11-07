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

import { LanguagePipe } from '../admin/pipes/lang-pipe';

import { NationsListComponent } from './components/Nations/list/nations-list.component';
import { NationsFormComponent } from './components/Nations/form/nations-form.component';

import {CategoriesComponent} from './components/mange-Categories/list/categories.component';
import {CategoryFormComponent} from './components/mange-Categories/form/category-form.component';

import { AuthGuard } from './../services/config/auth.guard';

import { FileUploadComponent } from './components/file-upload/file-upload.component';

import { FilterPipe } from './pipes/filter-pipe';

import { StocksListComponent } from './components/stocks/list/stocks-list.component';
import { StocksFormComponent } from './components/stocks/form/stocks-form.component';

@NgModule({
  declarations: [    
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    AdminLayoutComponent,
  
    LanguagePipe,

    NationsListComponent,
    NationsFormComponent,
    CategoriesComponent,
    CategoryFormComponent,
    FileUploadComponent,

    FilterPipe,

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
