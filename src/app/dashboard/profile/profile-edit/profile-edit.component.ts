import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, AfterViewInit {
  constructor(
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    private service: DataService
  ) {}
  profile: any = {};
  countrylist: any[] = [];
  isLoading = true;
  @ViewChild('editForm', { static: true }) editForm!: NgForm;
  ngOnInit(): void {
    this.service.apiGetCountry().subscribe((res) => {
      this.isLoading = false;
      this.countrylist = res;
      this.service.editProfileData.subscribe((res) => {
        this.profile = res;
        this.editForm.form.patchValue({
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          gender: this.profile.gender,
          status: this.profile.status,
          description: this.profile.description,
          countryId: this.profile.countryId,
          github: this.profile?.socials[0]?.url || '',
          stack: this.profile?.socials[1]?.url || '',
        });
      });
    });
    console.log('res:', this.service.ownProfile);
  }

  getSocialUrl(): any {}
  ngAfterViewInit(): void {}

  get controls(): any {
    return this.editForm.controls;
  }

  onSave(form: NgForm): void {
    if (form.invalid) return;
    const preparedObj = {
      ...form.value,
      socials: form.value.github
        ? [
            {
              socialType: 'GITHUB',
              url: form.value.github,
            },
          ]
        : [],
    };

    delete preparedObj['github'];

    console.log('preparedObj:', preparedObj);

    this.service.apiPutUser(preparedObj).subscribe(
      (res) => {
        console.log('User updated', res);
        this.dialogRef.close(true);
      },
      () => {
        this.dialogRef.close(true);
      }
    );
  }
}
