import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MinimalEmployee, Company, Department, Employee, Position } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { EditEmployeeDialogComponent } from './edit-employee-dialog/edit-employee-dialog.component';
import { EmployeeInfoDialogComponent } from '../employee-info-dialog/employee-info-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'positionTitle', 'departmentName', 'companyName','divisionName', 'isInReserve', 'actions'];
  dataSource = new MatTableDataSource<MinimalEmployee>();
  companies: Company[] = [];
  departments: Department[] = [];
  positions: Position[] = [];
  selectedIsInReserve: boolean = false;

  filterValues: any = {
    name: '',
    companyName: 'all',
    departmentId: 'all',
    positionTitle: 'all',
    isInReserve: false,
  };

  constructor(private baseService: BaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: MinimalEmployee, filter: string): boolean => {
      try {
        const searchString = JSON.parse(filter);
        const fullname = searchString.fullname || '';
        const companyName = searchString.companyName || 'all';
        const departmentName = searchString.departmentName || 'all';
        const positionTitle = searchString.positionTitle || 'all';

      
        const matchesFullname = data && data.fullname ? data.fullname.toLowerCase().includes(fullname.toLowerCase()) : false;
        const matchesCompanyName = companyName === 'all' || (data && data.companyName ? data.companyName.toLowerCase().includes(companyName.toLowerCase()) : false);
        const matchesDepartmentName = departmentName === 'all' || (data && data.departmentName ? data.departmentName.toLowerCase().includes(departmentName.toLowerCase()) : false);
        const matchesPositionTitle = positionTitle === 'all' || (data && data.positionTitle ? data.positionTitle.toLowerCase().includes(positionTitle.toLowerCase()) : false);
        const matchesIsInReserve = !searchString.isInReserve || data.isInReserve === searchString.isInReserve;

        return matchesFullname && matchesCompanyName && matchesDepartmentName && matchesPositionTitle && matchesIsInReserve;
      } catch (e) {
        console.error('Error parsing filter:', e);
        return false;
      }
    };

    this.loadEmployees();
    this.loadCompanies();
    this.loadDepartments();
    this.loadPositions();
  }

  loadEmployees(): void {
    this.baseService.getEmployeesMin().subscribe(data => {
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
  loadPositions(): void {
    this.baseService.getPositions().subscribe(data => {
      this.positions = data;
   
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

    if (type === 'fullname') {
      this.filterValues.fullname = filterValue;
    } else if (type === 'companyName') {
      this.filterValues.companyName = filterValue;
    } else if (type === 'departmentName'){
      this.filterValues.departmentName = filterValue;
    }else if (type === 'positionTitle') {
      this.filterValues.positionTitle = filterValue;
    }

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  applyFilters(): void {
    this.filterValues.isInReserve = this.selectedIsInReserve;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.addEmployee(result).subscribe(() => this.loadEmployees());
      }
    });
  }

  openEditDialog(minimalEmployee: MinimalEmployee): void {
    this.baseService.getEmployeeById(minimalEmployee.id).subscribe((employee: Employee) => {
      const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
        width: '600px',
        data: employee // Pass the full Employee object
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.baseService.updateEmployee(result).subscribe(() => this.loadEmployees());
        }
      });
    });
  }
  

  deleteEmployee(id: number): void {
    this.baseService.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  openInfoDialog(employee: MinimalEmployee): void {
    this.baseService.getEmployeeById(employee.id).subscribe(fullEmployeeData => {
      this.dialog.open(EmployeeInfoDialogComponent, {
        data: fullEmployeeData,
        width: '400px'
      });
    });
  }
}
