import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Tags } from '../poc-info/poc-info.component';

@Component({
  selector: 'app-poc-view',
  templateUrl: './poc-view.component.html',
  styleUrls: ['./poc-view.component.scss'],
})
export class PocViewComponent implements OnInit {
  constructor(
    private service: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  isFollowing = false;
  pocId: any;
  poc: any;
  pocLikedByUsers: any[] = [];
  pocComments: any[] = [];
  userComment = '';
  ngOnInit(): void {
    this.pocId = this.route.snapshot.params.id;
    if (!this.pocId) {
      this.router.navigateByUrl('/dashboard');
      return;
    }
    this.getPocById();
    this.likedByUsers();
    this.getPocComments();

    console.log('this.pocId:', this.pocId);
  }

  editPoc(): void {
    this.router.navigate(['/dashboard/poc/edit/' + this.pocId]);
  }

  savePoc(id: string): void {
    this.service.apiSavePoc(id).subscribe((res) => {
      this.getPocById();
    });
  }

  submitComment(): void {
    const obj = {
      text: this.userComment,
      contextType: 'POC',
      contextId: this.pocId,
    };
    this.service.apiPostComment(obj).subscribe((res) => {
      console.log('res:', res);
      this.userComment = '';
      this.getPocComments();
    });
  }

  getPocComments(): void {
    this.service.apiGetCommentsById(this.pocId).subscribe((res) => {
      this.pocComments = res.filter((val: any) => val.isActive);
      console.log('this.pocComments:', this.pocComments);
      console.log('Comments', res);
    });
  }
  deleteComment(): void {}

  getPocById(): void {
    this.service.apiGetPocById(this.pocId).subscribe((res) => {
      this.poc = res;
      this.isFollowing = res.isLikedByLoggedInUser;
      this.markdown = res.description;
      console.log('this.poc by ID:', this.poc);
    });
  }

  likePoc(): void {
    this.service.apiLikePoc(this.poc.proofOfConceptId).subscribe((res) => {
      console.log('LIKE TOGGLE');
      this.likedByUsers();
    });
    this.isFollowing = !this.isFollowing;
  }

  likedByUsers(): void {
    this.service.apiUserLikedPoc(this.pocId).subscribe((res) => {
      console.log('USERS LIKED res:', res);
      this.pocLikedByUsers = res;
    });
  }

  // Placeholder markdown for user to get some idea for syntax
  markdown = ``;
}
