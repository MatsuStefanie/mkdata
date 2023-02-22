import { DialogComponent } from './dialog/dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { RegisterModule } from './register/register.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from './table/table.module';
@NgModule({
  declarations: [
    AppComponent, DialogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    RegisterModule,
  ],
  exports: [MaterialModule],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },],
  bootstrap: [AppComponent],
})
export class AppModule {}
