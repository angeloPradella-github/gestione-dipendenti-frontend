import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimeEmployeeService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  saveEntryTime(userId: number): Observable<any> {

    const entryTimeData = {
      entry_time: new Date().toISOString(), 
      idUtente: userId 
    };

    return this.http.post(`${this.baseUrl}/logs/new/${userId}`, entryTimeData);
  }

  saveExitTime(logId: number, exitTimeData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/log/update/${logId}`, exitTimeData);
  }
  
  
}