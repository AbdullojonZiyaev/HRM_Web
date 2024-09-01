import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, Department, Division, Position } from 'src/app/shared/interfaces/Base.interface';

@Component({
  selector: 'app-edit-position-dialog',
  templateUrl: './edit-position-dialog.component.html',
  styleUrls: ['./edit-position-dialog.component.css']
})
export class EditPositionDialogComponent {
  positionForm: FormGroup;
  companies: Company[];
  departments: Department[];
  divisions: Division[];
  employmentTypes: string[] = ['Full-Time', 'Part-Time', 'Contract'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { position: Position, companies: Company[], departments: Department[], divisions: Division[] }
  ) {
    this.companies = data.companies;
    this.departments = data.departments;
    this.divisions = data.divisions;

    this.positionForm = this.fb.group({
      title: [data.position.title, Validators.required],
      description: [data.position.description, Validators.required],
      salary: [data.position.salary, [Validators.required, Validators.min(0)]],
      employmentType: [data.position.employmentType, Validators.required],
      responsibilities: [data.position.responsibilities, Validators.required],
      requirements: [data.position.requirements, Validators.required],
      qualifications: [data.position.qualifications, Validators.required],
      companyId: [data.position.companyId, Validators.required],
      departmentId: [data.position.departmentId, Validators.required],
      divisionId: [data.position.divisionId, Validators.required],
      isActive: [data.position.isActive]
    });
  }

  onSubmit() {
    if (this.positionForm.valid) {
      const updatedPosition = { ...this.data.position, ...this.positionForm.value };
      this.dialogRef.close(updatedPosition);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
