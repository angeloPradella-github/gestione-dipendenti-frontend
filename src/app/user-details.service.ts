// user-details.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsServce {
  constructor(private http: HttpClient) {}

  getUserDetails(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/users/${userId}`);
  }
}
