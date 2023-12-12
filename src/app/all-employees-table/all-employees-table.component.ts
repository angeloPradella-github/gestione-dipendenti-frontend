import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EditEmployeeService } from '../edit-employee.service';

@Component({
  selector: 'app-all-employees-table',
  templateUrl: './all-employees-table.component.html',
  styleUrls: ['./all-employees-table.component.css'],
})
export class AllEmployeesTableComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private http: HttpClient,
    private editService: EditEmployeeService
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  getUserSingle(employeeId: number): void {
    this.editService.fetchEmployeeById(employeeId);
  }

  fetchEmployees(): void {
    this.http.get<any[]>('http://localhost:8080/users').subscribe(
      (response) => {
        this.employees = response;
      },
      (error) => {
        console.error(
          'Si è verificato un errore durante il recupero dei dipendenti:',
          error
        );
      }
    );
  }

  deleteEmployee(employeeId: number): void {
    if (confirm('Sei sicuro di voler eliminare questo dipendente?')) {
      this.http
        .delete<any>(`http://localhost:8080/deleteUser/${employeeId}`)
        .subscribe(
          () => {
            this.fetchEmployees();
            console.log(
              `Dipendente con ID ${employeeId} eliminato con successo.`
            );
          },
          (error) => {
            console.error(
              `Si è verificato un errore durante l'eliminazione del dipendente con ID ${employeeId}:`,
              error
            );
          }
        );
    }
  }
}
