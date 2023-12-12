import { Component, OnInit } from '@angular/core';
import { TimeEmployeeService } from '../time-employee.service';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})

export class HomeEmployeeComponent implements OnInit {
  
  public currentTime: Date = new Date();
  public isEntered: boolean = false;

  constructor(private TimeEmployeeService: TimeEmployeeService) { }

  enter() {
    console.log('Entra');
    this.isEntered = true;
    this.saveEntryTime(); // Chiama il metodo per salvare l'ora di entrata
  }

  exit() {
    console.log('Esci');
    this.isEntered = false;
    this.saveExitTime(); // Chiama il metodo per salvare l'ora di uscita
  }

  // Metodo per salvare l'ora di entrata tramite chiamata API
  saveEntryTime() {
    // Esegui la chiamata API per salvare l'ora di entrata
    // Utilizza il servizio ApiService per eseguire la chiamata
    this.TimeEmployeeService.saveEntryTime().subscribe(
      (response:any) => {
        // Gestisci la risposta se necessario
        console.log('Ora di entrata salvata nel database');
      },
      (error:any) => {
        // Gestisci l'errore se la chiamata fallisce
        console.error('Errore durante il salvataggio dell\'ora di entrata:', error);
      }
    );
  }

  // Metodo per salvare l'ora di uscita tramite chiamata API
  saveExitTime() {
    // Esegui la chiamata API per salvare l'ora di uscita
    // Utilizza il servizio ApiService per eseguire la chiamata
    this.TimeEmployeeService.saveExitTime().subscribe(
      (response:any) => {
        // Gestisci la risposta se necessario
        console.log('Ora di uscita salvata nel database');
      },
      (error:any) => {
        // Gestisci l'errore se la chiamata fallisce
        console.error('Errore durante il salvataggio dell\'ora di uscita:', error);
      }
    );
  }
  
  datiUtente: any;

  ngOnInit(): void {
    // Aggiorna l'orologio ogni secondo
    setInterval(() => {
      this.updateTime();
    }, 1000);

    const userData = localStorage.getItem('utenteLoggato');
    if (userData) {
      // Converte la stringa JSON in un oggetto JavaScript
      this.datiUtente = JSON.parse(userData);
    } else {
      console.log('Nessun dato utente trovato nella Local Storage');
    }
  }

  updateTime() {
    this.currentTime = new Date();
  }
}