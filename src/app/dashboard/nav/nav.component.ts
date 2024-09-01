import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BaseService } from 'src/app/shared/services/base.service';
import { News } from 'src/app/shared/interfaces/Base.interface';
import { AddNewsDialogComponent } from './add-news-dialog/add-news-dialog.component';
import { FormControl } from '@angular/forms';
import { EditNewsDialogComponent } from './edit-news-dialog/edit-news-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  userName: string = '';
  newsList: News[] = [];
  filteredNewsList: News[] = [];
  titleFilter = new FormControl('');
  tagsFilter = new FormControl('');
  dateFilter = new FormControl('');
  sortOrder: 'asc' | 'desc' = 'desc'; // New property for sort order

  constructor(
    private router: Router,
    private auth: AuthService,
    public accessControlService: AccessControlService,
    private dialog: MatDialog,
    private baseService: BaseService
  ) {
    this.accessControlService
      .getUserInfo()
      .pipe(map((userInfo) => userInfo?.username || ''))
      .subscribe((username) => {
        this.userName = username;
      });
  }

  ngOnInit(): void {
    this.loadNews();
    this.applyFilters();
  }

  loadNews(): void {
    this.baseService.getNews().subscribe(data => {
      this.newsList = data;
      this.filterAndSortNews(); // Apply filter and sort initially
    });
  }

  applyFilters(): void {
    this.titleFilter.valueChanges.subscribe(() => this.filterAndSortNews());
    this.tagsFilter.valueChanges.subscribe(() => this.filterAndSortNews());
    this.dateFilter.valueChanges.subscribe(() => this.filterAndSortNews());
  }

  filterAndSortNews(): void {
    const title = this.titleFilter?.value?.toLowerCase() || '';
    const tags = this.tagsFilter?.value?.toLowerCase() || '';
    const date = this.dateFilter.value;

    // Filter news based on title, tags, and date
    this.filteredNewsList = this.newsList.filter(news =>
      (!title || news.title.toLowerCase().includes(title)) &&
      (!tags || news.tags.toLowerCase().includes(tags)) &&
      (!date || new Date(news.recordDate).toLocaleDateString() === new Date(date).toLocaleDateString())
    );

    // Sort news based on the selected order
    this.filteredNewsList.sort((a, b) => {
      const dateA = new Date(a.recordDate).getTime();
      const dateB = new Date(b.recordDate).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.filterAndSortNews(); // Reapply filter and sort
  }

  openAddNewsDialog(): void {
    const dialogRef = this.dialog.open(AddNewsDialogComponent, {
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadNews();
      }
    });
  }
  openEditDialog(news: News): void {
    const dialogRef = this.dialog.open(EditNewsDialogComponent, {
      width: '500px',
      data: news
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the updated news item, e.g., refresh the list
        this.loadNews();
      }
    });
  }
  deleteNews(id: number): void {
    this.baseService.deleteNews(id).subscribe(() => this.loadNews());
  }
  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

  logout() {
    this.auth.logout();
  }

  navigateToUserComponent() {
    this.router.navigate(['/user']);
  }
}
