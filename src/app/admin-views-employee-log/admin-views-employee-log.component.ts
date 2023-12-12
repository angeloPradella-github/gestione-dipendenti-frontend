import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-views-employee-log',
  templateUrl: './admin-views-employee-log.component.html',
  styleUrls: ['./admin-views-employee-log.component.css']
})
export class AdminViewsEmployeeLogComponent  implements OnInit  {
  datiUtente: any;
  idUtente: number | undefined;

  ngOnInit(): void {

    const userData = localStorage.getItem('utenteLoggato');

    if (userData) {
      this.datiUtente = JSON.parse(userData);
      this.idUtente = this.datiUtente.id;
    } else {
      console.log('Nessun dato utente trovato nella Local Storage');
    }
  }
}
