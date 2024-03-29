import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: DataService, private router: Router) {}
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  ngOnInit(): void {
    if (this.service.isLoggedIn) this.router.navigate(['/dashboard']);
  }
}
