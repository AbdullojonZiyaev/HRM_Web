import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Position, MinimalEmployee } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { EmployeeInfoDialogComponent } from '../../employee-info-dialog/employee-info-dialog.component';

@Component({
  selector: 'app-info-position-dialog',
  templateUrl: './info-position-dialog.component.html',
  styleUrls: ['./info-position-dialog.component.css']
})
export class InfoPositionDialogComponent implements OnInit {
  employees: MinimalEmployee[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Position,
    private baseService: BaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.baseService.getMinimalEmployeesByPositionId(this.data.id).subscribe(data => {
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
