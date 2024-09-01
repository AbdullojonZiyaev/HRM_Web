import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { DepartmentComponent } from './department.component';
import { AddDepartmentDialogComponent } from './add-department-dialog/add-department-dialog.component';
import { EditDepartmentDialogComponent } from './edit-department-dialog/edit-department-dialog.component';
import { InfoDepartmentDialogComponent } from './info-department-dialog/info-department-dialog.component';


const routes: Routes = [{ path: '', component: DepartmentComponent }];

@NgModule({
  declarations: [DepartmentComponent, AddDepartmentDialogComponent, EditDepartmentDialogComponent, InfoDepartmentDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,],
})
export class DepartmentModule {}
