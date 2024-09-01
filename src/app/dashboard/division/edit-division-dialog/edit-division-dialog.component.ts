import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department, Division } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit-division-dialog',
  templateUrl: './edit-division-dialog.component.html',
  styleUrls: ['./edit-division-dialog.component.css']
})
export class EditDivisionDialogComponent implements OnInit {
  divisionForm!: FormGroup;
  departments: Department[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditDivisionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, division: Division },
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.divisionForm = new FormGroup({
      id: new FormControl(this.data.division.id),
      fullname: new FormControl(this.data.division.fullname, Validators.required),
      email: new FormControl(this.data.division.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data.division.phone, Validators.required),
      headOfDivision: new FormControl(this.data.division.headOfDivision, Validators.required),
      departmentId: new FormControl(this.data.division.departmentId || '')
    });

    this.loadDepartments();
  }

  loadDepartments(): void {
    this.baseService.getDepartments().subscribe(data => {
      this.departments = data;
    }, error => {
      console.error('Error loading departments:', error);
    });
  }

  onSubmit(): void {
    if (this.divisionForm.valid) {
      const formValues = this.divisionForm.value;
      this.dialogRef.close(formValues);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
