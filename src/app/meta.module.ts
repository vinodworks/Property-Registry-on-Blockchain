import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetaSenderComponent} from './meta/meta-sender/meta-sender.component';
import {UtilModule} from './util/util.module';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './app.material.module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule,
    UtilModule,
    DemoMaterialModule
  ],
  declarations: [MetaSenderComponent],
  exports: [MetaSenderComponent]
})
export class MetaModule {
}
