import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { SingleEmployeeLogService } from '../single-employee-log.service';

@Component({
  selector: 'app-employee-entry-table',
  templateUrl: './employee-entry-table.component.html',
  styleUrls: ['./employee-entry-table.component.css'],
})
export class EmployeeEntryTableComponent implements OnInit {
  userId: number = 1;
  displayedColumns: string[] = ['entry_time', 'exit_time'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private route: ActivatedRoute,
    private dataService: SingleEmployeeLogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.loadDataForUser(this.userId);
    });
  }

  loadDataForUser(userId: number): void {
    // Chiamata al servizio per ottenere i dati di entrata/uscita dell'utente
    this.dataService.getUserEntries(userId).subscribe((data: any[]) => {
      // Assume che i dati ottenuti dal servizio siano simili alla struttura che hai fornito
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }

  // Metodo per applicare il filtro per il mese corrente
  applyMonthFilter(month: number): void {
    const filteredData = this.dataSource.data.filter((entry) => {
      const entryDate = new Date(entry.entry_time);
      return entryDate.getMonth() === month;
    });
    this.dataSource = new MatTableDataSource<any>(filteredData);
  }

  // Metodo per ordinare i dati dalla data più recente alla meno recente
  sortDataByEntryTime(): void {
    this.dataSource.data.sort((a, b) => {
      const dateA = new Date(a.entry_time);
      const dateB = new Date(b.entry_time);
      return dateB.getTime() - dateA.getTime();
    });
    this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
  }
}
