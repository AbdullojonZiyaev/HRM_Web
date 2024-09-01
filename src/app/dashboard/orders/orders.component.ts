import { Component, OnInit } from '@angular/core';
import { Company, Department, Division, Order } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { AddOrderDialogComponent } from './add-order-dialog/add-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InfoOrderDialogComponent } from './info-order-dialog/info-order-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = ['orderNumber', 'employee', 'orderType', 'company', 'department', 'division', 'actions'];
  dataSource = new MatTableDataSource<Order>();
  companies: Company[] = [];
  departments: Department[] = [];
  divisions: Division[] = [];
  selectedIsApproved: boolean = false;

  filterValues: any = {
    orderNumber: '',
    companyName: 'all',
    departmentName: 'all',
    divisionName: 'all',
    isApproved: false,
  };

  constructor(private baseService: BaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Order, filter: string): boolean => {
      try {
        const searchString = JSON.parse(filter);
        const orderNumber = searchString.orderNumber || '';
        const companyName = searchString.companyName || 'all';
        const departmentName = searchString.departmentName || 'all';
        const divisionName = searchString.divisionName || 'all';

        const matchesOrderNumber = data && data.orderNumber ? data.orderNumber.toLowerCase().includes(orderNumber.toLowerCase()) : false;
        const matchesCompanyName = companyName === 'all' || (data && data.companyName ? data.companyName.toLowerCase().includes(companyName.toLowerCase()) : false);
        const matchesDepartmentName = departmentName === 'all' || (data && data.departmentName ? data.departmentName.toLowerCase().includes(departmentName.toLowerCase()) : false);
        const matchesDivisionName = divisionName === 'all' || (data && data.divisionName ? data.divisionName.toLowerCase().includes(divisionName.toLowerCase()) : false);
        const matchesIsApproved = !searchString.isApproved || data.approved === searchString.isApproved;
        
        console.log(companyName, matchesCompanyName, departmentName, matchesDepartmentName, divisionName, matchesDivisionName)
        
        return matchesOrderNumber && matchesCompanyName && matchesDepartmentName && matchesDivisionName && matchesIsApproved;
      } catch (e) {
        console.error('Error parsing filter:', e);
        return false;
      }
    };
    this.loadOrders();
    this.loadCompanies();
    this.loadDepartments();
    this.loadDivisions();
  }

  loadOrders(): void {
    this.baseService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
      this.dataSource.data = data;
    });
  }

  loadCompanies(): void {
    this.baseService.getCompanies().subscribe(data => {
      this.companies = data;
    });
  }

  loadDepartments(): void {
    this.baseService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  loadDivisions(): void {
    this.baseService.getDivisions().subscribe(data => {
      this.divisions = data;
    });
  }

  applyFilter(event: Event | string, type: string): void {
    let filterValue = '';

    if (typeof event === 'string') {
      filterValue = event.toLowerCase();
    } else if (event instanceof Event) {
      const inputElement = event.target as HTMLInputElement;
      filterValue = inputElement.value.trim().toLowerCase();
    }
    if (type === 'orderNumber') {
      this.filterValues.orderNumber = filterValue;
    } else if (type === 'companyName') {
      this.filterValues.companyName = filterValue;
    } else if (type === 'departmentName') {
      this.filterValues.departmentName = filterValue;
    } else if (type === 'divisionName') {
      this.filterValues.divisionName = filterValue;
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  applyFilters(): void {
    this.filterValues.isApproved = this.selectedIsApproved;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openOrderInfoDialog(order: Order): void {
    this.dialog.open(InfoOrderDialogComponent, {
      width: '600px',
      data: order
    });}

  openAddOrderDialog(): void {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.addOrder(result).subscribe(() => this.loadOrders());
      }
    });
  }
  deleteOrder(id: number): void {
    this.baseService.deleteOrder(id).subscribe(() => this.loadOrders());
  }
}
