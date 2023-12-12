import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditEmployeeService {
  employee: any;

  id: any;

  private employeeSubject = new BehaviorSubject<any>(null);

  employee$ = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchEmployeeById(employeeId: number): void {
    this.id = employeeId;

    const url = `http://localhost:8080/users/${employeeId}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        this.employee = response;
        console.log(this.employee);
        this.employeeSubject.next(this.employee);
      },
      (error) => {
        console.error(
          `Si è verificato un errore durante il recupero dell'utente con ID ${employeeId}:`,
          error
        );
      }
    );
  }

  updateEmployeeData(data: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/users/update/${data.id}`,
      data
    );
  }
}
