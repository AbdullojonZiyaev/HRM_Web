import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { DivisionComponent } from './division.component';
import { AddDivisionDialogComponent } from './add-division-dialog/add-division-dialog.component';
import { EditDivisionDialogComponent } from './edit-division-dialog/edit-division-dialog.component';
import { InfoDivisionDialogComponent } from './info-division-dialog/info-division-dialog.component';


const routes: Routes = [{ path: '', component: DivisionComponent }];

@NgModule({
  declarations: [DivisionComponent, AddDivisionDialogComponent, EditDivisionDialogComponent, InfoDivisionDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,],
})
export class DivisionModule {}
