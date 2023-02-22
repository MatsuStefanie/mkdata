import { SimpleTableComponent } from './simple-table/simple-table.component';
import { TableComponent } from './table.component';
import { TableListComponent } from './table-list/table-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { ActionsTableComponent } from './actions-table/actions-table.component';
import { FilterTableListComponent } from './filter-table-list/filter-table-list.component';
import { EditSimpleTableComponent } from './edit-simple-table/edit-simple-table.component';

@NgModule({
  declarations: [
    TableComponent,
    TableListComponent,
    FilterTableListComponent,
    ActionsTableComponent,
    SimpleTableComponent,
    EditSimpleTableComponent
  ],
  exports: [TableComponent, SimpleTableComponent,EditSimpleTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class TableModule {}
