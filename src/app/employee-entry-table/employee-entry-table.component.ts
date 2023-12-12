import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleEmployeeLogService } from '../single-employee-log.service';

@Component({
  selector: 'app-employee-entry-table',
  templateUrl: './employee-entry-table.component.html',
  styleUrls: ['./employee-entry-table.component.css'],
})
export class EmployeeEntryTableComponent implements OnInit {
  userEntries: any[] = [];
  userId: any;

  constructor(
    private route: ActivatedRoute,
    private employeeLogService: SingleEmployeeLogService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      const idSegment = segments[segments.length - 1];
      if (idSegment) {
        this.userId = parseInt(idSegment.path, 10);
        if (!isNaN(this.userId)) {
          this.employeeLogService
            .getUserEntries(this.userId)
            .subscribe((entries) => {
              this.userEntries = this.sortEntries(entries);
            });
        }
      }
    });
  }

  calculateWorkingHours(entryTime: string, exitTime: string | null): string {
    if (!exitTime) return 'In progress...';
    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
    const totalMilliseconds = exit.getTime() - entry.getTime();
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.round(((totalMilliseconds % 3600000) % 60000) / 1000);
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  }

  sortEntries(entries: any[]): any[] {
    return entries.sort((a, b) => {
      const dateA = new Date(a.entry_time);
      const dateB = new Date(b.entry_time);
      return dateB.getTime() - dateA.getTime();
    });
  }

  isDifferentDay(currentEntryTime: string, previousEntryTime: string): boolean {
    const currentDay = new Date(currentEntryTime).toDateString();
    const previousDay = new Date(previousEntryTime).toDateString();
    return currentDay !== previousDay;
  }

  calculateTotalHoursForDay(entryTime: string): string {
    const day = new Date(entryTime).toLocaleDateString();
    let totalMilliseconds = 0;
    this.userEntries.forEach((entry) => {
      if (new Date(entry.entry_time).toLocaleDateString() === day) {
        totalMilliseconds += entry.exit_time
          ? new Date(entry.exit_time).getTime() -
            new Date(entry.entry_time).getTime()
          : 0;
      }
    });
    const totalHours = totalMilliseconds / 3600000;
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.round(((totalMilliseconds % 3600000) % 60000) / 1000);
    if (totalHours > 0) {
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
        seconds < 10 ? '0' + seconds : seconds
      }`;
    } else {
      return 'In progress...';
    }
  }

  formatHours(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}:${m < 10 ? '0' + m : m}`;
  }
}
