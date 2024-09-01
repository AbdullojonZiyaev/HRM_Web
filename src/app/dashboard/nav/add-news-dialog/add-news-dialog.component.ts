import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';
import { News } from 'src/app/shared/interfaces/Base.interface';

@Component({
  selector: 'app-add-news-dialog',
  templateUrl: './add-news-dialog.component.html',
  styleUrls: ['./add-news-dialog.component.css']
})
export class AddNewsDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddNewsDialogComponent>,
    private baseService: BaseService
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      isPublished: new FormControl(true),
      tags: new FormControl(''),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newNews: News = this.form.value;
      this.baseService.addNews(newNews).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Failed to add news:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
