import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/shared/interfaces/Base.interface';
import { EmployeeInfoDialogComponent } from '../../employee-info-dialog/employee-info-dialog.component';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-info-order-dialog',
  templateUrl: './info-order-dialog.component.html',
  styleUrls: ['./info-order-dialog.component.css']
})
export class InfoOrderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private baseService: BaseService,
    private dialog: MatDialog // Injected order data
  ) {}
  ngOnInit(){
    console.log(this.order);
  }
  onClose(): void {
    this.dialogRef.close();
  }
  openEmployeeDialog(order: Order): void {
    this.baseService.getEmployeeById(order.employeeId).subscribe(fullEmployeeData => {
      this.dialog.open(EmployeeInfoDialogComponent, {
        data: fullEmployeeData,
        width: '400px'
      });
    });
  }
}
