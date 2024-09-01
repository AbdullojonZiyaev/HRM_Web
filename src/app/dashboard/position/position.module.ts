import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { PositionComponent } from './position.component';
import { AddPositionDialogComponent } from './add-position-dialog/add-position-dialog.component';
import { EditPositionDialogComponent } from './edit-position-dialog/edit-position-dialog.component';
import { InfoPositionDialogComponent } from './info-position-dialog/info-position-dialog.component';



const routes: Routes = [{ path: '', component: PositionComponent }];

@NgModule({
  declarations: [PositionComponent, AddPositionDialogComponent, EditPositionDialogComponent, InfoPositionDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,]
})
export class PositionModule {}
