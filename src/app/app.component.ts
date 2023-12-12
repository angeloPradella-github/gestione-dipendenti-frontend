import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from './global-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Staff Monitor';
  isUserLoggedIn: boolean = false;

  constructor(private globalVariablesService: GlobalVariablesService) {}

  ngOnInit(): void {
    this.globalVariablesService.isLogged$.subscribe((isLogged) => {
      this.isUserLoggedIn = isLogged;
    });
  }
}
