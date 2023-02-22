import { EditTelephoneComponent } from './edit-telephone/edit-telephone.component';
import { TableModule } from './../table/table.module';
import { TelephoneComponent } from './telephone/telephone.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../material.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [RegisterComponent, TelephoneComponent,EditTelephoneComponent],
  exports: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    TableModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class RegisterModule {}
