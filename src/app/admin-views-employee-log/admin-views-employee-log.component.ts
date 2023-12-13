import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsServce } from '../user-details.service';

@Component({
  selector: 'app-admin-views-employee-log',
  templateUrl: './admin-views-employee-log.component.html',
  styleUrls: ['./admin-views-employee-log.component.css'],
})
export class AdminViewsEmployeeLogComponent implements OnInit {
  userId?: number;
  userDetails: any;
  constructor(
    private route: ActivatedRoute,
    private userDetailsServce: UserDetailsServce
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      const idSegment = segments[segments.length - 1];
      if (idSegment) {
        this.userId = parseInt(idSegment.path, 10);
        if (!isNaN(this.userId)) {
          this.userDetailsServce
            .getUserDetails(this.userId)
            .subscribe((details) => {
              this.userDetails = details;
            });
        }
      }
    });
  }
}
