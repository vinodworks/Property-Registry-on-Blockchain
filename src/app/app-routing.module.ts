import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'admin', component: AdminComponent },
// ];


import {FinalHomeComponent} from './final/home/final-home.component';

const routes: Routes = [
  { path: '', component: FinalHomeComponent },
  { path: 'home', component: FinalHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
