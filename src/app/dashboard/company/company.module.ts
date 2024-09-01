import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompanyComponent } from './company.component';
import { AddCompanyDialogComponent } from './add-company-dialog/add-company-dialog.component';
import { EditCompanyDialogComponent } from './edit-company-dialog/edit-company-dialog.component';


const routes: Routes = [{ path: '', component: CompanyComponent }];

@NgModule({
  declarations: [CompanyComponent, AddCompanyDialogComponent, EditCompanyDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,],
})
export class CompanyModule {}
