import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';
import { Department } from 'src/app/shared/interfaces/Base.interface';

@Component({
  selector: 'app-add-division-dialog',
  templateUrl: './add-division-dialog.component.html',
  styleUrls: ['./add-division-dialog.component.css']
})
export class AddDivisionDialogComponent implements OnInit {
  divisionForm: FormGroup;
  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private dialogRef: MatDialogRef<AddDivisionDialogComponent>
  ) {
    this.divisionForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      headOfDivision: ['', Validators.required],
      departmentId: [null]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.baseService.getDepartments().subscribe((data: Department[]) => {
      this.departments = data;
    });
  }

  onSubmit(): void {
    if (this.divisionForm.valid) {
      const division = this.divisionForm.value;
      this.dialogRef.close(division);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
