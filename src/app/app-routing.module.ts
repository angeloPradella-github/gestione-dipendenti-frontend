import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EmployeeEntryTableComponent } from './employee-entry-table/employee-entry-table.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AllEmployeesTableComponent } from './all-employees-table/all-employees-table.component';

const routes: Routes = [
  { path: '', component: HomeEmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee-records-view/:id', component: EmployeeEntryTableComponent },
  { path: 'admin', component: HomeAdminComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee', component: EditEmployeeComponent },
  { path: 'all-employees', component: AllEmployeesTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
