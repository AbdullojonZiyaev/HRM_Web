import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Division, MinimalEmployee } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { EmployeeInfoDialogComponent } from '../../employee-info-dialog/employee-info-dialog.component';

@Component({
  selector: 'app-info-division-dialog',
  templateUrl: './info-division-dialog.component.html',
  styleUrls: ['./info-division-dialog.component.css']
})
export class InfoDivisionDialogComponent implements OnInit {
  employees: MinimalEmployee[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Division,
    private baseService: BaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.baseService.getMinimalEmployeesByDivisionId(this.data.id).subscribe(data => {
      this.employees = data;
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
