import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegComponent } from './reg/reg.component';

import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlimLoadingBarModule 
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
