import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyCreateDto, City, Company, DepartmentCreateDto } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-department-dialog.component.html',
  styleUrls: ['./add-department-dialog.component.css']
})
export class AddDepartmentDialogComponent implements OnInit {
  form!: FormGroup;
  companies: Company[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      headOfDepartment: new FormControl(''),
      companyID: new FormControl('', Validators.required)
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
      const formValues: DepartmentCreateDto = {
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
