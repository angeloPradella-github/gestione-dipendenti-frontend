import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EmployeeEntryTableComponent } from './employee-entry-table/employee-entry-table.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AllEmployeesTableComponent } from './all-employees-table/all-employees-table.component';
import { AuthGuard } from './auth.guard';
import { AdminViewsEmployeeLogComponent } from './admin-views-employee-log/admin-views-employee-log.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'employee-records-view/:id',
    component: EmployeeEntryTableComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin', component: HomeAdminComponent, canActivate: [AuthGuard] },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-employee',
    component: EditEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'all-employees',
    component: AllEmployeesTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-views-employee-log',
    component: AdminViewsEmployeeLogComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
