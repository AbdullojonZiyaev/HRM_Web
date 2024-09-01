import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit-news-dialog',
  templateUrl: './edit-news-dialog.component.html',
  styleUrls: ['./edit-news-dialog.component.css']
})
export class EditNewsDialogComponent implements OnInit {
  editNewsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditNewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: News,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.editNewsForm = this.fb.group({
      id: [this.data.id, Validators.required],
      title: [this.data.title, Validators.required],
      content: [this.data.content, Validators.required],
      tags: [this.data.tags],
      isPublished: [this.data.isPublished]
    });
  }

  onSubmit(): void {
    if (this.editNewsForm.valid) {
      const updatedNews: News = {
        ...this.data,
        ...this.editNewsForm.value,
      };

      this.baseService.updateNews(updatedNews).subscribe(
        () => this.dialogRef.close(updatedNews),
        error => console.error('Error updating news', error)
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
