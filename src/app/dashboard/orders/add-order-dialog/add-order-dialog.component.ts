import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';
import { Company, Department, Division, MinimalEmployee, OrderType } from 'src/app/shared/interfaces/Base.interface';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.css']
})
export class AddOrderDialogComponent implements OnInit {
  orderForm!: FormGroup;
  employees: MinimalEmployee[] = [];
  orderTypes: OrderType[] = [];
  companies: Company[] = [];
  departments: Department[] = [];
  divisions: Division[] = [];

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private dialogRef: MatDialogRef<AddOrderDialogComponent>
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      employeeId: ['', Validators.required],
      orderTypeId: ['', Validators.required],
      description: ['', Validators.required],
      activationDate: ['', Validators.required],
      userId: ['', Validators.required],
      approved: [false], // Not required, default is false
      signedBy: ['', Validators.required],
      companyId: ['', Validators.required],
      departmentId: ['', Validators.required],
      divisionId: ['', Validators.required] // Division is optional based on your model, consider making this non-required
    });
    this.loadDropdownData();
    this.loadCurrentUser(); // Load current user's ID to populate the user dropdown
  }

  loadDropdownData(): void {
    // Load employees, order types, companies, departments, and divisions for dropdowns
    this.baseService.getEmployeesMin().subscribe(data => this.employees = data);
    this.baseService.getOrderType().subscribe(data => this.orderTypes = data);
    this.baseService.getCompanies().subscribe(data => this.companies = data);
    this.baseService.getDepartments().subscribe(data => this.departments = data);
    this.baseService.getDivisions().subscribe(data => this.divisions = data);
  }
  loadCurrentUser(): void {
    this.baseService.getCurrentUser().subscribe(
      (user) => {
        this.orderForm.patchValue({ userId: user.id });
      },
      (error) => {
        console.error('Failed to load current user', error);
      }
    );
  }
  onSubmit() {
    if (this.orderForm.valid) {
      this.dialogRef.close(this.orderForm.value);
    }
  }
  

  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog without doing anything
  }
}
