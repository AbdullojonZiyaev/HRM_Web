import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentUpdateDto, Company } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit-department-dialog',
  templateUrl: './edit-department-dialog.component.html',
  styleUrls: ['./edit-department-dialog.component.css']
})
export class EditDepartmentDialogComponent implements OnInit {
  form!: FormGroup;
  companies: Company[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, department: DepartmentUpdateDto },
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.data.department.id),
      fullname: new FormControl(this.data.department.fullname, Validators.required),
      email: new FormControl(this.data.department.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data.department.phone),
      headOfDepartment: new FormControl(this.data.department.headOfDepartment),
      companyID: new FormControl(this.data.department.companyID, Validators.required),
    });

    this.loadCompanies();
  }

  loadCompanies(): void {
    this.baseService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => {
      console.error('Error loading cities:', error);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValues: DepartmentUpdateDto = {
        id: +this.form.value.id,
        fullname: this.form.value.fullname,
        email: this.form.value.email,
        phone: this.form.value.phone,
        headOfDepartment: this.form.value.headOfDepartment,
        companyID: +this.form.value.companyID // Convert to number
      };
      this.dialogRef.close(formValues);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
