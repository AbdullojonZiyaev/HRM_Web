import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Department, DepartmentUpdateDto, Company } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { AddDepartmentDialogComponent } from './add-department-dialog/add-department-dialog.component';
import { EditDepartmentDialogComponent } from './edit-department-dialog/edit-department-dialog.component';
import { InfoDepartmentDialogComponent } from './info-department-dialog/info-department-dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'email', 'phone', 'headOfDepartment', 'company', 'actions'];
  dataSource = new MatTableDataSource<Department>();
  departments: Department[] = [];
  companies: Company[] = [];
  filterValues: any = {
    fullname: '',
    companyName: 'all'
  };

  constructor(private baseService: BaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Department, filter: string): boolean => {
      try {
        const searchString = JSON.parse(filter);
        const fullname = searchString.fullname || '';
        const companyName = searchString.companyName || 'all';
    
        const matchesFullname = data && data.fullname ? data.fullname.toLowerCase().includes(fullname.toLowerCase()) : false;
        const matchesCompanyName = companyName === 'all' || (data && data.companyName ? data.companyName.toLowerCase().includes(companyName.toLowerCase()) : false);
    
        return matchesFullname && matchesCompanyName;
      } catch (e) {
        console.error('Error parsing filter:', e);
        return false;
      }
    };
    this.loadDepartments();
    this.loadCompanies();
  }

  loadDepartments(): void {
    this.baseService.getDepartments().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  loadCompanies(): void {
    this.baseService.getCompanies().subscribe(data => {
      this.companies = data;
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
    }

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDepartmentDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.addDepartment(result).subscribe(response => {
          this.loadDepartments();
        }, error => {
          console.error('Error adding department:', error);
        });
      }
    });
  }

  openEditDialog(department: DepartmentUpdateDto): void {
    const dialogRef = this.dialog.open(EditDepartmentDialogComponent, {
      width: '400px',
      data: { isEdit: true, department }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.updateDepartment(result).subscribe(response => {
          this.loadDepartments();
        }, error => {
          console.error('Error editing department:', error);
        });
      }
    });
  }

  deleteDepartment(id: number): void {
    this.baseService.deleteDepartment(id).subscribe(() => {
      this.loadDepartments();
    });
  }

  openInfoDialog(department: Department): void {
    this.dialog.open(InfoDepartmentDialogComponent, {
      width: '400px',
      data: department
    });
  }
}
