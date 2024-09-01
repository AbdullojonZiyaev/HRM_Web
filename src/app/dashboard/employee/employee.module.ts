import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { EditEmployeeDialogComponent } from './edit-employee-dialog/edit-employee-dialog.component';
import { EmployeeComponent } from './employee.component';



const routes: Routes = [{ path: '', component: EmployeeComponent }];

@NgModule({
  declarations: [EmployeeComponent, AddEmployeeDialogComponent, EditEmployeeDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,]
})
export class EmployeeModule {}
