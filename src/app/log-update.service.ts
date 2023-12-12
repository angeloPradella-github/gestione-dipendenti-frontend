import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogUpdateService {
  private logUpdateSubject = new BehaviorSubject<boolean>(false);

  logUpdate$ = this.logUpdateSubject.asObservable();

  notifyLogUpdate() {
    this.logUpdateSubject.next(true);
  }
}
