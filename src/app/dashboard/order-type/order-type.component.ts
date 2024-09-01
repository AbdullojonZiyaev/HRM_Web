import { Component, OnInit } from '@angular/core';
import { OrderType } from 'src/app/shared/interfaces/Base.interface';
import { AddOrderTypeDialogComponent } from './add-order-type-dialog/add-order-type-dialog.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrl: './order-type.component.css'
})
export class OrderTypeComponent implements OnInit {
  orderType: OrderType[] = [];
  displayedColumns: string[] = ['id','name', 'description', 'orderCategory', 'actions'];

  constructor(private baseService: BaseService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadOrderType();
  }

  loadOrderType(): void {
    this.baseService.getOrderType().subscribe((data: OrderType[]) => {
      this.orderType = data;
    });
  }
  openAddOrderDialog(): void {
    const dialogRef = this.dialog.open(AddOrderTypeDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.addOrderType(result).subscribe(() => this.loadOrderType());
      }
    });
  }
  deleteOrderType(id: number): void {
    this.baseService.deleteOrderType(id).subscribe(() => this.loadOrderType());
  }
}
