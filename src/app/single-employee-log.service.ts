import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingleEmployeeLogService {
  mockUserData = [
    {
      id: 1,
      entry_time: '2023-01-03T08:30:00.000Z',
      exit_time: '2023-01-03T17:30:00.000Z',
      user_id: 1,
    },
    {
      id: 2,
      entry_time: '2023-02-10T08:00:00.000Z',
      exit_time: '2023-02-10T16:45:00.000Z',
      user_id: 1,
    },
    {
      id: 3,
      entry_time: '2023-03-15T09:15:00.000Z',
      exit_time: '2023-03-15T18:00:00.000Z',
      user_id: 1,
    },
    {
      id: 4,
      entry_time: '2023-04-20T08:45:00.000Z',
      exit_time: '2023-04-20T17:20:00.000Z',
      user_id: 1,
    },
    {
      id: 5,
      entry_time: '2023-05-25T08:30:00.000Z',
      exit_time: '2023-05-25T17:30:00.000Z',
      user_id: 1,
    },
    {
      id: 6,
      entry_time: '2023-06-07T08:15:00.000Z',
      exit_time: '2023-06-07T17:00:00.000Z',
      user_id: 1,
    },
    {
      id: 7,
      entry_time: '2023-07-12T08:45:00.000Z',
      exit_time: '2023-07-12T17:45:00.000Z',
      user_id: 1,
    },
    {
      id: 8,
      entry_time: '2023-08-18T08:30:00.000Z',
      exit_time: '',
      user_id: 1,
    },
    {
      id: 9,
      entry_time: '2023-09-22T08:00:00.000Z',
      exit_time: '2023-09-22T18:00:00.000Z',
      user_id: 1,
    },
    {
      id: 10,
      entry_time: '2023-10-28T08:30:00.000Z',
      exit_time: '2023-10-28T17:45:00.000Z',
      user_id: 1,
    },
    {
      id: 11,
      entry_time: '2023-11-15T08:15:00.000Z',
      exit_time: null,
      user_id: 1,
    },
    {
      id: 12,
      entry_time: '2023-11-15T15:15:00.000Z',
      exit_time: null,
      user_id: 1,
    },
  ];
  private apiUrl = 'http://localhost:8080/logs/user';

  constructor(private http: HttpClient) {}

  getUserEntries(userId: number): Observable<any[]> {
    console.log(userId);
    return this.http
      .get<any[]>(`${this.apiUrl}/${userId}`)
      .pipe(
        map((entries) => entries.map((entry) => this.normalizeEntryData(entry)))
      );

    //return of(this.mockUserData);
  }
  private normalizeEntryData(entry: any) {
    //perche i frontend ha le chiavi con nomi diversi da quello che avevo mockato io
    return {
      id: entry.id,
      entry_time: entry.entryTime,
      exit_time: entry.exitTime,
      user_id: entry.userId,
    };
  }
}
