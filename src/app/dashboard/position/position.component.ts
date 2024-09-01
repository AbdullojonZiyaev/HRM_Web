import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Position, Company, Department, Division } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { AddPositionDialogComponent } from './add-position-dialog/add-position-dialog.component';
import { EditPositionDialogComponent } from './edit-position-dialog/edit-position-dialog.component';
import { InfoPositionDialogComponent } from './info-position-dialog/info-position-dialog.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'salary',
    'employmentType',
    'company',
    'department',
    'division',
    'isActive',
    'actions'
  ];
  dataSource = new MatTableDataSource<Position>();
  companies: Company[] = [];
  departments: Department[] = [];
  divisions: Division[] = [];
  selectedIsActive: string = 'all'; // Changing to a string to handle "all" as well

  filterValues: any = {
    title: '',
    companyName: 'all',
    departmentName: 'all',
    divisionName: 'all',
    isActive: 'all' // Changing to string to handle "all"
  };

  constructor(private baseService: BaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Position, filter: string): boolean => {
      try {
        const searchString = JSON.parse(filter);
        const title = searchString.title || '';
        const companyName = searchString.companyName || 'all';
        const departmentName = searchString.departmentName || 'all';
        const divisionName = searchString.divisionName || 'all';

        const matchesTitle = data && data.title ? data.title.toLowerCase().includes(title.toLowerCase()) : false;
        const matchesCompanyName = companyName === 'all' || (data && data.companyName ? data.companyName.toLowerCase().includes(companyName.toLowerCase()) : false);
        const matchesDepartmentName = departmentName === 'all' || (data && data.departmentName ? data.departmentName.toLowerCase().includes(departmentName.toLowerCase()) : false);
        const matchesDivisionName = divisionName === 'all' || (data && data.divisionName ? data.divisionName.toLowerCase().includes(divisionName.toLowerCase()) : false);
        const matchesIsActive = searchString.isActive === 'all' || data.isActive.toString() === searchString.isActive;

        return matchesTitle && matchesCompanyName && matchesDepartmentName && matchesDivisionName && matchesIsActive;
      } catch (e) {
        console.error('Error parsing filter:', e);
        return false;
      }
    };

    this.loadPositions();
    this.loadCompanies();
    this.loadDepartments();
    this.loadDivisions();
  }

  loadPositions(): void {
    this.baseService.getPositions().subscribe(data => {
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

    if (type === 'title') {
      this.filterValues.title = filterValue;
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
    this.filterValues.isActive = this.selectedIsActive;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPositionDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.addPosition(result).subscribe(() => this.loadPositions());
      }
    });
  }

  openEditDialog(position: Position): void {
    const dialogRef = this.dialog.open(EditPositionDialogComponent, {
      width: '600px',
      data: position
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.updatePosition(result).subscribe(() => this.loadPositions());
      }
    });
  }

  openInfoDialog(position: Position): void {
    this.dialog.open(InfoPositionDialogComponent, {
      data: position,
      width: '600px'
    });
  }
  

  deletePosition(id: number): void {
    this.baseService.deletePosition(id).subscribe(() => this.loadPositions());
  }
}
