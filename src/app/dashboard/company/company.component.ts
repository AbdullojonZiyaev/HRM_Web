import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from 'src/app/shared/services/base.service';
import { Company, CompanyUpdateDto, City } from 'src/app/shared/interfaces/Base.interface';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddCompanyDialogComponent } from './add-company-dialog/add-company-dialog.component';
import { EditCompanyDialogComponent } from './edit-company-dialog/edit-company-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'fullname',
    'address',
    'cityName',
    'inn',
    'director',
    'dataContract',
    'actions'
  ];
  dataSource = new MatTableDataSource<Company>();
  totalItemsCount: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  filterValues: any = {
    companyName: '',
    cityName: ''
  };
  cities: City[] = [];

  constructor(private baseService: BaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Company, filter: string) => {
      const searchString = JSON.parse(filter);
      const fullname = searchString.fullname || ''; // Ensure default empty string
      const cityName = searchString.cityName || ''; // Ensure default empty string
  
      const matchesUsername = data.fullname.toLowerCase().includes(fullname.toLowerCase());
      const matchesCompanyName = data.cityName ? data.cityName.toLowerCase().includes(cityName.toLowerCase()) : false;
  
      return matchesUsername && matchesCompanyName;
    };
    this.loadCompanies();
    this.loadCities();
  }

  loadCompanies(): void {
    this.baseService.getCompany('', this.pageIndex + 1, this.pageSize).subscribe(data => {
      this.dataSource.data = data.items;
      this.totalItemsCount = data.totalCount;
    });
  }
  loadCities(): void {
    this.baseService.getCities().subscribe(data => {
      this.cities = data;
    }, error => {
      console.error('Error loading cities:', error);
      // Consider adding user feedback here
    });
  }
  
  onPageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCompanies();
  }

  applyFilter(event: Event | string, type: string): void {
    let filterValue = '';

    if (typeof event === 'string') {
      filterValue = event.toLowerCase();
    } else if (event instanceof Event) {
      const inputElement = event.target as HTMLInputElement;
      filterValue = inputElement.value.trim().toLowerCase();
    }

    if (type === 'companyName') {
      this.filterValues.fullname = filterValue;
    } else if (type === 'cityName') {
      this.filterValues.cityName = filterValue;
    }

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openAddCompanyDialog(): void {
    const dialogRef = this.dialog.open(AddCompanyDialogComponent, {
      width: '500px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.baseService.addCompany(result).subscribe(response => {
          this.loadCompanies();
        }, error => {
          console.error('Error adding user:', error);
        });
      }
    });
  }  
  openEditCompanyDialog(company: CompanyUpdateDto): void {
    const dialogRef = this.dialog.open(EditCompanyDialogComponent, {
      width: '400px',
      data: { isEdit: true, company}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.updateCompany(result).subscribe(response => {
          this.loadCompanies();
        }, error => {
          console.error('Error editing user:', error);
        });
      }
    });
  }

  openDeleteCompanyDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.deleteCompany(id).subscribe(response => {
          this.loadCompanies();
        }, error => {
          console.error('Error deleting user:', error);
        });
      }
    });
  }
  }
