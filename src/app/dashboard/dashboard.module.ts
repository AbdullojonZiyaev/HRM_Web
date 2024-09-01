import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { ChangePasswordComponent } from './nav/change-password/change-password.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeInfoDialogComponent } from './employee-info-dialog/employee-info-dialog.component';
import { AddNewsDialogComponent } from './nav/add-news-dialog/add-news-dialog.component';
import { EditNewsDialogComponent } from './nav/edit-news-dialog/edit-news-dialog.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        canActivate: [AuthGuard],
        title: 'Пользователи',
        loadChildren: () =>
          import('../dashboard/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    ChangePasswordComponent,
    DialogDeleteComponent,
    EmployeeInfoDialogComponent,
    AddNewsDialogComponent,
    EditNewsDialogComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,],
})
export class DashboardModule {}
