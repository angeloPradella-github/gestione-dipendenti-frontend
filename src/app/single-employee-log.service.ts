import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingleEmployeeLogService {
  mockUserData = [
    {
      id: 2,
      entry_time: '2023-12-01T08:00:00.000+00:00',
      exit_time: '2023-12-01T17:00:00.000+00:00',
      user_id: 1,
    },
    {
      id: 3,
      entry_time: '2023-12-12T09:00:00.000+00:00',
      exit_time: null,
      user_id: 1,
    },
    {
      id: 3,
      entry_time: '2023-11-01T08:00:00.000+00:00',
      exit_time: '2023-12-01T17:00:00.000+00:00',
      user_id: 1,
    },
  ];

  constructor() {}

  getUserEntries(userId: number): Observable<any[]> {
    // Simuliamo una chiamata API che restituisce i dati delle entrate/uscite dell'utente
    // Qui potresti effettuare una chiamata HTTP effettiva al tuo backend
    // In questo esempio, stiamo semplicemente restituendo i dati mockati
    return of(this.mockUserData);
  }
}
