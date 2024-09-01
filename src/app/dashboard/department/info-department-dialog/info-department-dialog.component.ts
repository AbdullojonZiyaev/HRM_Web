import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Department, MinimalDivision, MinimalEmployee, MinimalVacancy, Employee } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { EmployeeInfoDialogComponent } from '../../employee-info-dialog/employee-info-dialog.component';

@Component({
  selector: 'app-info-department-dialog',
  templateUrl: './info-department-dialog.component.html',
  styleUrls: ['./info-department-dialog.component.css']
})
export class InfoDepartmentDialogComponent implements OnInit {
  divisions: MinimalDivision[] = [];
  employees: MinimalEmployee[] = [];
  vacancies: MinimalVacancy[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Department,
    private baseService: BaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDivisions();
    this.loadEmployees();
    this.loadVacancies();
  }

  loadDivisions(): void {
    this.baseService.getMinimalDivisionsByDepartmentId(this.data.id).subscribe(data => {
      this.divisions = data;
    });
  }

  loadEmployees(): void {
    this.baseService.getMinimalEmployeesByDepartmentId(this.data.id).subscribe(data => {
      this.employees = data;
    });
  }

  loadVacancies(): void {
    this.baseService.getMinimalVacanciesByDepartmentId(this.data.id).subscribe(data => {
      this.vacancies = data;
    });
  }

  openEmployeeDialog(employee: MinimalEmployee): void {
    this.baseService.getEmployeeById(employee.id).subscribe(fullEmployeeData => {
      this.dialog.open(EmployeeInfoDialogComponent, {
        data: fullEmployeeData,
        width: '400px'
      });
    });
  }
}
