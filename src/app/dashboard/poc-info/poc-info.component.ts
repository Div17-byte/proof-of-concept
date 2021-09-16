import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Tags {
  name: string;
}
@Component({
  selector: 'app-poc-info',
  templateUrl: './poc-info.component.html',
  styleUrls: ['./poc-info.component.scss'],
})
export class PocInfoComponent implements OnInit {
  @ViewChild('form', { static: true }) form!: NgForm;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tags[] = [];
  editId = '';
  isEditMode = false;
  poc: any = {};
  constructor(
    private service: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editId = this.route.snapshot.params.editId;
    if (this.editId) {
      this.isEditMode = true;
      this.getPocById();
    } else this.isEditMode = false;
  }

  getPocById(): void {
    this.service.apiGetPocById(this.editId).subscribe((res) => {
      console.log('res:', res);
      this.poc = res;
      this.setInfo();
      this.tags = this.poc.tags;
    });
  }

  setInfo(): void {
    this.form.form.patchValue({
      title: this.poc.title,
      codeLink: this.poc.codeLink,
      hostedLink: this.poc.hostedLink,
    });
    this.markdown = this.poc.description;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;
    console.log(form.value);
    console.log(this.tags);
    const obj = {
      ...form.value,
      tags: this.tags,
      requestId: null,
    };
    console.log('obj:', obj);

    if (this.isEditMode) {
      this.service.apiUpdatePoc(this.editId, obj).subscribe((res) => {
        this.router.navigate(['/dashboard']);
        this.snackBar.open('Poc updated successfully', 'close', {
          duration: 2000,
        });
      });
      return;
    }
    this.service.apiPostPoc(obj).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/dashboard']);
      this.snackBar.open('Poc created successfully', 'close', {
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

  // Placeholder markdown for user to get some idea for syntax
  markdown = `## Markdown __rulez__!
  ---

  ### Syntax highlight
  \`\`\`js
  const language = 'javascript';
  const getRandomNumbers = ()=> Math.random()
  getRandomNumbers() // Call function
  \`\`\`

  ### Lists
  1. Ordered list
  2. Another bullet point
     - Unordered list
     - Another unordered bullet

  ### Blockquote
  > Blockquote to the max`;
}
