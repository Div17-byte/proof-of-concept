import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLoginComponent } from '../auth/dialog-login/dialog-login.component';
import { DialogSignupComponent } from '../auth/dialog-signup/dialog-signup.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  config: MatDialogConfig = {};
  userInfo: any = {};
  isLoggedIn = false;
  profileImg = '../../assets/images/user.png';
  notifications: any[] = [];
  notificationNumber = 0;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private service: DataService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.service.isLoggedIn;
    this.service.authListener.subscribe((res) => {
      this.isLoggedIn = res;
    });
    this.service.notificaiton.subscribe((res: any) => {
      this.notifications = res;
      this.notificationNumber = this.notifications.length;
      console.log('this.notifications:', this.notifications);
    });
    if (this.isLoggedIn) {
      this.service.apiGetUser().subscribe((res) => {
        this.service.currentUser = res;
        this.service.updateProfile.next(res);
      });
      // this.service.apiGetNotifications().subscribe((res) => {
      //   this.service.notificaiton.next(res);
      // });
      this.service.updateProfile.subscribe((res: any) => {
        this.userInfo = res;
        this.profileImg = res.profileImageUrl;
      });
    }
  }

  markAsRead(): void {
    this.service.apiMarkNotificationRead().subscribe((res) => {
      console.log('Notification marked as read');
      this.notifications = [];
      this.service.apiGetNotifications().subscribe((res) => {
        this.service.notificaiton.next(res);
      });
    });
  }

  goToHome(): void {
    if (this.isLoggedIn) this.router.navigate(['/dashboard']);
    else this.router.navigate(['/']);
  }
  logOut(): void {
    localStorage.clear();
    this.service.isLoggedIn = false;
    this.service.authListener.next(false);
    this.router.navigate(['/']);
  }

  openProfile(): void {
    this.router.navigate(['/dashboard/me']);
  }
  openLogin(): void {
    this.dialog.open(DialogLoginComponent, this.config);
  }

  openSignup(): void {
    this.dialog.open(DialogSignupComponent, this.config);
  }
}
