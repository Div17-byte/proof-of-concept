import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DialogOtpComponent } from '../dialog-otp/dialog-otp.component';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss'],
})
export class DialogLoginComponent implements OnInit {
  constructor(
    private service: DataService,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm): void {
    this.service.currentUser = form.value;
    this.service.apiLogin(form.value).subscribe(
      (res) => {
        const token = res.headers.get('authorization').split(' ')[1];
        localStorage.setItem('token', token);
        this.service.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
        this.dialogRef.close();
        this.snackBar.open('User logged In successfully', 'close', {
          duration: 3000,
        });
      },
      (err) => {
        console.log('err:', err);
        if (err.status === 425) {
          const obj = {
            emailId: form.value.emailId,
            oneTimePasswordContext: 'ACCOUNT_CONFIRMATION',
          };
          this.service.apiPostOtp(obj).subscribe((res) => {
            console.log('OTP Sent:', res);
            const dialogRef = this.dialog.open(DialogOtpComponent);
            dialogRef.afterClosed().subscribe((res) => {
              this.dialogRef.close();
            });
          });
        } else {
          form.controls.password.setErrors({ invalid: true });
        }
      }
    );
  }
}
