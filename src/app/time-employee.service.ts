import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimeEmployeeService {
  private baseUrl = 'https://api.example.com'; // Imposta la tua URL API

  constructor(private http: HttpClient) { }

  saveEntryTime(): Observable<any> {
    // Esegui la chiamata API per salvare l'ora di entrata
    const entryTimeData = {}; // Inserisci i dati necessari per l'ora di entrata

    return this.http.post(`${this.baseUrl}/entry-time`, entryTimeData);
  }

  saveExitTime(): Observable<any> {
    // Esegui la chiamata API per salvare l'ora di uscita
    const exitTimeData = {}; // Inserisci i dati necessari per l'ora di uscita

    return this.http.post(`${this.baseUrl}/exit-time`, exitTimeData);
  }
}