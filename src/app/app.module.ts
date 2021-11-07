import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AppRoutingModule} from './app-routing';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DeviceDetectorModule} from 'ngx-device-detector';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        HttpClientModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        DeviceDetectorModule.forRoot()
    ],
    bootstrap: [AppComponent],
    entryComponents: [
    ]
})
export class AppModule {
}
