import { TableComponent } from './table/table.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'new', component: RegisterComponent },
  { path: 'edit/:id', component: RegisterComponent },
  { path: '', component: TableComponent },
  { path: '**', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
