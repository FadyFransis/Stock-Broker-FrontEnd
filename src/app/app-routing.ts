import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './shared/not-found/not-found.component';


const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    },
    {
        path: 'NotFound', component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {
}
