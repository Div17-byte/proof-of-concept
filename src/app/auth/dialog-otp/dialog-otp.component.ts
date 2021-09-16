import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-otp',
  templateUrl: './dialog-otp.component.html',
  styleUrls: ['./dialog-otp.component.scss'],
})
export class DialogOtpComponent implements OnInit {
  constructor(
    private service: DataService,
    public dialogRef: MatDialogRef<any>,
    private router: Router
  ) {}
  userInfo: any;
  otp = 0;
  ngOnInit(): void {
    this.userInfo = this.service.currentUser;
  }

  verifyOtp(): void {
    const obj = {
      emailId: this.userInfo.emailId,
      oneTimePassword: this.otp,
      oneTimePasswordContext: 'ACCOUNT_CONFIRMATION',
    };
    this.service.apiPutOtp(obj).subscribe(
      (res) => {
        console.log('res:', res);
        this.dialogRef.close();
        this.router.navigate(['/']);
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
  onOtpChange(ev: any): void {
    console.log(ev);
    this.otp = ev;
  }
}
