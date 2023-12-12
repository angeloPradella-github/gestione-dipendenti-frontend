import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private utentiMockati = [
    {
      id: 1,
      email: 'user@user',
      nome: 'User',
      password: 'user',
      ruolo: 'user',
    },
    {
      id: 2,
      email: 'admin@admin',
      nome: 'Admin',
      password: 'admin',
      ruolo: 'admin',
    },
  ];
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.apiUrl, body);
  }

  mockedLogin(email: string, password: string) {
    return this.utentiMockati.find(
      (utente) => utente.email === email && utente.password === password
    );
  }
}
