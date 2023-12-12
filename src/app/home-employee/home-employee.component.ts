import { SingleEmployeeLogService } from './../single-employee-log.service';
import { Component, OnInit } from '@angular/core';
import { TimeEmployeeService } from '../time-employee.service';
import { LogUpdateService } from '../log-update.service';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css'],
})
export class HomeEmployeeComponent implements OnInit {
  public currentTime: Date = new Date();
  public isEntered: boolean = false;
  idUtente: number | undefined;
  datiUtente: any;
  logId: number | undefined;

  constructor(
    private timeEmployeeService: TimeEmployeeService,
    private singleEmployeeLogService: SingleEmployeeLogService,
    private logUpdateService: LogUpdateService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.updateTime();
    }, 1000);

    const userData = localStorage.getItem('utenteLoggato');

    if (userData) {
      this.datiUtente = JSON.parse(userData);
      this.idUtente = this.datiUtente.id;
    } else {
      console.log('Nessun dato utente trovato nella Local Storage');
    }
  }

  enter() {
    console.log('Entra');
    this.isEntered = true;

    if (this.idUtente) {
      this.saveEntryTime(this.idUtente);
    } else {
      console.error('ID utente non definito');
    }
  }

  saveEntryTime(userId: number) {
    this.timeEmployeeService.saveEntryTime(userId).subscribe(
      (response: any) => {
        this.logId = response.id;
        console.log(
          'Ora di entrata salvata nel database con ID del log:',
          this.logId
        );
        this.logUpdateService.notifyLogUpdate();
      },
      (error: any) => {
        console.error(
          "Errore durante il salvataggio dell'ora di entrata:",
          error
        );
      }
    );
  }

  exit() {
    console.log('Esce');
    this.isEntered = false;

    if (this.logId) {
      const exitTime = this.getFormattedDateTime(new Date());
      console.log('Data di uscita formattata:', exitTime);

      const exitTimeData = {
        exitTime: this.getFormattedDateTime(new Date()),
      };
      this.saveExitTime(this.logId, exitTimeData);
    } else {
      console.error('ID del log non definito');
    }
  }

  saveExitTime(logId: number, exitTimeData: any) {
    this.timeEmployeeService.saveExitTime(logId, exitTimeData).subscribe(
      (response: any) => {
        console.log(
          'Ora di uscita salvata nel database per il log con ID:',
          logId
        );
        this.logUpdateService.notifyLogUpdate();
      },
      (error: any) => {
        console.error(
          'Errore durante il salvataggio dellora di uscita:',
          error
        );
      }
    );
  }

  getFormattedDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  updateTime() {
    this.currentTime = new Date();
  }
}
