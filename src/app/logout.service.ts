import { Injectable } from '@angular/core';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private globalVariablesService: GlobalVariablesService) {}

  logout() {
    localStorage.removeItem('utenteLoggato');
    this.globalVariablesService.updateIsLogged(false);
    this.globalVariablesService.updateUtenteLoggato(null);
  }
}
