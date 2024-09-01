import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { AddUserDialogComponent } from './add/add-user-dialog.component';
import { EditUserDialogComponent } from './edit/edit-user-dialog.component';

const routes: Routes = [{ path: '', component: UserComponent }];

@NgModule({
  declarations: [UserComponent , EditUserDialogComponent ,AddUserDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,],
})
export class UserModule {}
