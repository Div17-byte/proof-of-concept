import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private service: DataService, private router: Router) {}

  ngOnInit(): void {
    if (!this.service.isLoggedIn) this.router.navigate(['/']);

    // Get notification

    this.service.apiGetNotifications().subscribe((res) => {
      this.service.notificaiton.next(res);
    });
  }
}
