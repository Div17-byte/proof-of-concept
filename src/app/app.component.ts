import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  ngOnInit():void {
    this.service.pingServer()
  }
  constructor(private service: DataService) {
    if (localStorage.getItem('token')) {
      this.service.isLoggedIn = true;
    }
  }
  title = 'Proof of Requirement';
}
