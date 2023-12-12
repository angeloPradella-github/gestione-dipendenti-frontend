import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private globalVariablesService: GlobalVariablesService,
    private router: Router
  ) {}

  formReattivo!: FormGroup;

  ngOnInit(): void {
    this.formReattivo = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  onLogin(): void {
    if (this.formReattivo.valid) {
      const email = this.formReattivo.get('email')?.value;
      const password = this.formReattivo.get('password')?.value;

      this.loginService.login(email, password).subscribe(
        (user) => {
          console.log('Utente loggato:', user);
          localStorage.setItem('utenteLoggato', JSON.stringify(user));
          this.globalVariablesService.updateUtenteLoggato(user);
          this.formReattivo.reset();
          if (user.role=="admin") {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate([`/home-employee/${user.id}`]);
          }
        },
        (error: any) => {
          console.error('Errore durante la chiamata:', error);
        }
      );
    } else {
      console.log('Form non valido');
    }
  }

  onMockedLogin() {
    if (this.formReattivo.valid) {
      const email = this.formReattivo.get('email')?.value;
      const password = this.formReattivo.get('password')?.value;

      let utenteTrovato = this.loginService.mockedLogin(email, password);
      if (utenteTrovato) {
        console.log('Utente loggato:', utenteTrovato);
        localStorage.setItem('utenteLoggato', JSON.stringify(utenteTrovato));
        this.globalVariablesService.updateUtenteLoggato(utenteTrovato);
        this.formReattivo.reset();
        if (utenteTrovato.ruolo == 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      } else {
        console.log('Credenziali non valide ');
      }
    } else {
      console.log('Form non valido');
      this.formReattivo.reset();
    }
  }
}
