import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariablesService {
  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  private utenteLoggatoSubject = new BehaviorSubject<any>(null);

  isLogged$ = this.isLoggedSubject.asObservable();
  utenteLoggato$ = this.utenteLoggatoSubject.asObservable();

  constructor() {
    this.initFromLocalStorage();
    window.addEventListener('storage', (event) => {
      if (event.key === 'utenteLoggato') {
        this.initFromLocalStorage();
      }
    });
  }

  private initFromLocalStorage(): void {
    const storedUtenteLoggato = localStorage.getItem('utenteLoggato');
    if (storedUtenteLoggato) {
      this.utenteLoggatoSubject.next(JSON.parse(storedUtenteLoggato));
      this.isLoggedSubject.next(true);
    } else {
      this.utenteLoggatoSubject.next(null);
      this.isLoggedSubject.next(false);
    }
  }

  updateIsLogged(value: boolean): void {
    this.isLoggedSubject.next(value);
  }

  updateUtenteLoggato(value: any): void {
    this.utenteLoggatoSubject.next(value);
    if (value) {
      localStorage.setItem('utenteLoggato', JSON.stringify(value));
      this.isLoggedSubject.next(true);
    } else {
      localStorage.removeItem('utenteLoggato');
      this.isLoggedSubject.next(false);
    }
  }
}
