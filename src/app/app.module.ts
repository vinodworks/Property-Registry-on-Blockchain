import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {MetaModule} from './meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgxQRCodeModule } from 'ngx-qrcode2';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {LandDepartmentComponent, SafePipe} from './land-department/land-department.component';
import { VehicleDepartmentComponent } from './vehicle-department/vehicle-department.component';
import { FinalHomeComponent } from './final/home/final-home.component';
import {DemoMaterialModule} from './app.material.module';
import { FinalSideComponent } from './final-side/final-side.component';
import { FinalMainComponent } from './final-main/final-main.component';
import { FinalAdminComponent } from './final-admin/final-admin.component';
import { FinalSuadminComponent } from './final-suadmin/final-suadmin.component';
import { FinalCreateUserComponent } from './final-create-user/final-create-user.component';
import { FinalSearchUserComponent } from './final-search-user/final-search-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LandDepartmentComponent,
    VehicleDepartmentComponent,
    FinalHomeComponent,
    FinalSideComponent,
    FinalMainComponent,
    SafePipe,
    FinalAdminComponent,
    FinalSuadminComponent,
    FinalCreateUserComponent,
    FinalSearchUserComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule,
    AppRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
