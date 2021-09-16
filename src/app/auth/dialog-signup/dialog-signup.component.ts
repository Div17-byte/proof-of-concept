import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { DialogOtpComponent } from '../dialog-otp/dialog-otp.component';

@Component({
  selector: 'app-dialog-signup',
  templateUrl: './dialog-signup.component.html',
  styleUrls: ['./dialog-signup.component.scss'],
})
export class DialogSignupComponent implements OnInit {
  constructor(
    private service: DataService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private snackbar: MatSnackBar
  ) {}
  iAgree: boolean = false;
  ngOnInit(): void {}

  signUp(form: NgForm): void {
    if (form.invalid) return;
    console.log('form:', form.value);

    this.service.apiSignup(form.value).subscribe(
      (res) => {
        console.log(res);
        this.service.currentUser = form.value;

        const dialogRef = this.dialog.open(DialogOtpComponent, {
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((res) => {
          this.dialogRef.close();
        });
        this.snackbar.open('User registered successfully', 'close', {
          duration: 3000,
        });
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
}
