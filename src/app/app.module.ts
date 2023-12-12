import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EmployeeEntryTableComponent } from './employee-entry-table/employee-entry-table.component';
import { AllEmployeesTableComponent } from './all-employees-table/all-employees-table.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmpoyeeInfoComponent } from './empoyee-info/empoyee-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    HomeEmployeeComponent,
    HomeAdminComponent,
    AddUserComponent,
    EmployeeEntryTableComponent,
    AllEmployeesTableComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmpoyeeInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
