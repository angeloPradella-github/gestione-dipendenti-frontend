import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditEmployeeService {

  private apiUrl = 'URL_DEL_TUO_API'; // Sostituisci con l'URL del tuo servizio API

  constructor(private http: HttpClient) { }

  updateEmployeeData(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/employee/${data.id}`, data);
  }
}
