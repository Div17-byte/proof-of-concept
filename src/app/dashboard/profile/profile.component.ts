import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private service: DataService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  userInfo: any = {};
  myPoc: any[] = [];
  savedPoc: any[] = [];
  isLoggedInUser = false;
  ngOnInit(): void {
    // this.route.snapshot.url;
    this.route.snapshot.url[0].path === 'me'
      ? (this.isLoggedInUser = true)
      : (this.isLoggedInUser = false);

    this.getLoggedInUser();
    this.getOwnPoc();
    this.getSavedPoc();
  }

  getSavedPoc(): void {
    this.service.apiGetSavedPoc().subscribe((res) => {
      this.savedPoc = res;
    });
  }

  editProfile(): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      width: '500px',
      height: '750px',
      panelClass: 'dialog-custom',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.getLoggedInUser();
    });
  }

  changeProfileImage(): void {
    this.service.apiChangeProfileImage().subscribe((res) => {
      this.getLoggedInUser();
    });
  }
  getOwnPoc(): void {
    this.service.apiGetOwnPoc().subscribe((res) => {
      this.myPoc = res;
      console.log(' this.myPoc:', this.myPoc);
    });
  }
  getLoggedInUser(): void {
    this.service.apiGetUser().subscribe((res) => {
      this.service.ownProfile = res;
      this.userInfo = res;
      this.service.editProfileData.next(res);
      this.service.updateProfile.next(this.userInfo);
      console.log('this.userInfo:', this.userInfo);
    });
  }
}
