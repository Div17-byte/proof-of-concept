import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { Tags } from '../../poc-info/poc-info.component';

@Component({
  selector: 'app-request-poc',
  templateUrl: './request-poc.component.html',
  styleUrls: ['./request-poc.component.scss'],
})
export class RequestPocComponent implements OnInit {
  title = '';
  description = '';
  tags: any[] = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor(
    private service: DataService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {}

  requestPoc(): void {
    const obj = {
      title: this.title,
      description: this.description,
      tags: this.tags,
    };
    this.service.apiRequestPoc(obj).subscribe((res) => {
      console.log('Poc requested');
      this.dialogRef.close();
      this.snackbar.open('Poc requested successfully', 'close', {
        duration: 2000,
      });
    });
  }

  // Tag to array
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push({ name: value });
    }
    // Clear the input value
    event.chipInput!.clear();
  }
  // Remove tags from array
  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
