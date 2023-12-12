// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalVariablesService } from './global-variables.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private globalVariablesService: GlobalVariablesService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.globalVariablesService.isLogged$.pipe(
      map((isLogged) => {
        if (isLogged) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
