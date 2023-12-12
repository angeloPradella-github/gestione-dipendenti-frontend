import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  employees: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.http.get<any[]>('http://localhost:8080/users') // Sostituisci con l'URL del tuo endpoint per ottenere i dipendenti
      .subscribe(
        (response) => {
          this.employees = response;
        },
        (error) => {
          console.error('Si è verificato un errore durante il recupero dei dipendenti:', error);
        }
      );
  }

  deleteEmployee(employeeId: number): void {
    if (confirm('Sei sicuro di voler eliminare questo dipendente?')) {
      this.http.delete<any>(`http://localhost:8080/deleteUser/${employeeId}`)
        .subscribe(
          () => {
            this.fetchEmployees(); // Aggiorna la lista dei dipendenti dopo l'eliminazione
            console.log(`Dipendente con ID ${employeeId} eliminato con successo.`);
          },
          (error) => {
            console.error(`Si è verificato un errore durante l'eliminazione del dipendente con ID ${employeeId}:`, error);
          }
        );
    }
  }
}
