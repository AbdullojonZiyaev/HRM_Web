import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserUpdateDto, Company } from 'src/app/shared/interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add/add-user-dialog.component';
import { EditUserDialogComponent } from './edit/edit-user-dialog.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'roleName', 'firstName', 'secondName', 'surname', 'username', 'phone', 'address', 'position', 'companyName', 'isActived', 'actions'];
  dataSource = new MatTableDataSource<User>();
  totalItemsCount: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  companies: Company[] = [];
  filterValues = {
    username: '',
    companyName: '',
    isActived: 'all'
  };

  constructor(private baseService: BaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const searchString = JSON.parse(filter);
      const matchesUsername = data.username.toLowerCase().includes(searchString.username);
      const matchesCompanyName = data.companyName.toLowerCase().includes(searchString.companyName);
      const matchesActiveStatus = 
        searchString.isActived === 'all' || 
        (searchString.isActived === 'true' && data.isActived) || 
        (searchString.isActived === 'false' && !data.isActived);
      return matchesUsername && matchesCompanyName && matchesActiveStatus;
    };
    this.loadUsers();
    this.loadCompanies();
  }

  loadUsers(): void {
    this.baseService.getUsers('', this.pageIndex + 1, this.pageSize).subscribe(data => {
      this.dataSource.data = data.items;
      this.totalItemsCount = data.totalCount;
    });
  }

  loadCompanies(): void {
    this.baseService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => {
      console.error('Error loading companies:', error);
    });
  }

  onPageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  applyFilter(event: Event | string, type: string): void {
    let filterValue = '';
  
    if (type === 'isActived' && typeof event === 'string') {
      filterValue = event;
    } else if (typeof event !== 'string' && event instanceof Event) {
      const inputElement = event.target as HTMLInputElement;
      filterValue = inputElement.value.trim().toLowerCase();
    } else if (typeof event === 'string') {
      filterValue = event.trim().toLowerCase();
    }
  
    if (type === 'username') {
      this.filterValues.username = filterValue;
    } else if (type === 'companyName') {
      this.filterValues.companyName = filterValue;
    } else if (type === 'isActived') {
      this.filterValues.isActived = filterValue;
    }
  
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.baseService.addUser(result).subscribe(response => {
          this.loadUsers();
        }, error => {
          console.error('Error adding user:', error);
        });
      }
    });
  }  

  openEditUserDialog(user: UserUpdateDto): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { isEdit: true, user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.editUser(result).subscribe(response => {
          this.loadUsers();
        }, error => {
          console.error('Error editing user:', error);
        });
      }
    });
  }

  openDeleteUserDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseService.deleteUser(id).subscribe(response => {
          this.loadUsers();
        }, error => {
          console.error('Error deleting user:', error);
        });
      }
    });
  }
}
