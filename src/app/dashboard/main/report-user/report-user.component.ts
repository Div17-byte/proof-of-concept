import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss'],
})
export class ReportUserComponent implements OnInit {
  comment = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: DataService,
    private dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  onSave(): void {
    const obj = {
      contextType: 'POC',
      contextId: this.data.id,
      comment: this.comment,
    };
    this.service.apiReportPoc(obj).subscribe((res) => {
      this.dialogRef.close(true);
    });
  }
}
