import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, Department, Division } from 'src/app/shared/interfaces/Base.interface';

@Component({
  selector: 'app-add-position-dialog',
  templateUrl: './add-position-dialog.component.html',
  styleUrls: ['./add-position-dialog.component.css']
})
export class AddPositionDialogComponent {
  positionForm: FormGroup;
  companies: Company[];
  departments: Department[];
  divisions: Division[];
  employmentTypes: string[] = ['Full-Time', 'Part-Time', 'Contract'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.companies = data.companies;
    this.departments = data.departments;
    this.divisions = data.divisions;

    this.positionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      employmentType: ['', Validators.required],
      responsibilities: ['', Validators.required],
      requirements: ['', Validators.required],
      qualifications: ['', Validators.required],
      companyId: ['', Validators.required],
      departmentId: ['', Validators.required],
      divisionId: ['', Validators.required],
      isActive: [true]
    });
  }

  onSubmit() {
    if (this.positionForm.valid) {
      this.dialogRef.close(this.positionForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
