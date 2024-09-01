import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Division, Department } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { AddDivisionDialogComponent } from './add-division-dialog/add-division-dialog.component';
import { EditDivisionDialogComponent } from './edit-division-dialog/edit-division-dialog.component';
import { InfoDivisionDialogComponent } from './info-division-dialog/info-division-dialog.component';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'email', 'phone', 'headOfDivision', 'departmentName', 'actions'];
  dataSource = new MatTableDataSource<Division>();
  departments: Department[] = [];
  filterValues: any = {
    fullname: '',
    departmentName: 'all'
  };

  constructor(private baseService: BaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Division, filter: string): boolean => {
      try {
        const searchString = JSON.parse(filter);
        const fullname = searchString.fullname || '';
        const departmentName = searchString.departmentName || 'all';
    
        const matchesFullname = data && data.fullname ? data.fullname.toLowerCase().includes(fullname.toLowerCase()) : false;
        const matchesDepartmentName = departmentName === 'all' || (data && data.departmentName ? data.departmentName.toLowerCase().includes(departmentName.toLowerCase()) : false);
    
        return matchesFullname && matchesDepartmentName;
      } catch (e) {
        console.error('Error parsing filter:', e);
        return false;
      }
    };
    this.loadDivisions();
    this.loadDepartments();
  }

  loadDivisions(): void {
    this.baseService.getDivisions().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  loadDepartments(): void {
    this.baseService.getDepartments().subscribe(data => {
      this.departments = data;
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
    } else if (type === 'departmentName') {
      this.filterValues.departmentName = filterValue;
    }

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDivisionDialogComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.addDivision(result).subscribe(() => this.loadDivisions());
      }
    });
  }
  

  openEditDialog(division: Division): void {
    const dialogRef = this.dialog.open(EditDivisionDialogComponent, {
      width: '400px',
      data: { isEdit: true, division }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.updateDivision(result).subscribe(response => {
          this.loadDivisions();
        }, error => {
          console.error('Error editing division:', error);
        });
      }
    });
  }

  deleteDivision(id: number): void {
    this.baseService.deleteDivision(id).subscribe(() => {
      this.loadDivisions();
    });
  }

  openInfoDialog(division: Division): void {
    this.dialog.open(InfoDivisionDialogComponent, {
      width: '600px',
      data: division
    });
  }
  
}
