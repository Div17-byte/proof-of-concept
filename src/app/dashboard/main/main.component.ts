import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fadeAnimation, listAnimation } from 'src/app/animations/app.animation';
import { DataService } from 'src/app/services/data.service';
import { ReportUserComponent } from './report-user/report-user.component';
import { RequestPocComponent } from './request-poc/request-poc.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeAnimation, listAnimation],
})
export class MainComponent implements OnInit {
  test = new Array(5);
  constructor(
    private service: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  selectedChip = 0;
  allPoc: any[] = [];
  byTags: any[] = [];
  byTitle: any[] = [];
  byUser: any[] = [];
  requestedPoc: any[] = [];
  filterEnabled = false;
  searchInput = '';
  ngOnInit(): void {
    this.getAllPoc();
    this.getRequestedPoc();
  }

  requestPoc(): void {
    this.dialog.open(RequestPocComponent, {
      width: '400px',
      panelClass: 'dialog-custom',
    });
  }

  createRequestedPoc(id: string): void {
    this.router.navigate(['/poc/create/' + id]);
  }

  getRequestedPoc(): void {
    this.service.apiGetAllRequestPoc().subscribe((res) => {
      this.requestedPoc = res;
    });
  }

  listenKey(ev: any): void {
    if (this.searchInput.length === 0) {
      this.filterEnabled = false;
    }
    console.log(ev);
  }

  reportPoc(id: any, name: string): void {
    const dialogRef = this.dialog.open(ReportUserComponent, {
      data: { id, name },
      width: '400px',
      panelClass: 'dialog-custom',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.getAllPoc();
    });
  }
  search(): void {
    this.service.apiSearch(this.searchInput).subscribe((res) => {
      this.selectedChip = 1;
      this.filterEnabled = true;
      this.byTags = res.proofOfConceptsByTags;
      this.byTitle = res.proofOfConceptsByTitle;
      this.byUser = res.users;
    });
  }

  onChipChange(ev: number): void {
    if (ev === 0) {
      this.allPoc = [];
      this.searchInput = '';
      this.filterEnabled = false;
      this.getAllPoc();
    }
    this.selectedChip = ev;
  }

  getAllPoc(): void {
    this.service.apiGetPoc().subscribe((res) => {
      this.allPoc = res;
      console.log('this.allPoc:', this.allPoc);
    });
  }

  viewPoc(id: string): void {
    console.log('id:', id);
    this.router.navigate(['/dashboard/poc/view/' + id]);
  }
  editPoc(id: string): void {
    this.router.navigate(['/dashboard/poc/edit/' + id]);
    console.log('id:', id);
  }
}
