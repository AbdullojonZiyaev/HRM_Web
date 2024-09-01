import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { OrderTypeComponent } from './order-type.component';
import { AddOrderTypeDialogComponent } from './add-order-type-dialog/add-order-type-dialog.component';




const routes: Routes = [{ path: '', component: OrderTypeComponent }];

@NgModule({
  declarations: [OrderTypeComponent, AddOrderTypeDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatDialogModule,
    MatFormFieldModule,
    MatInputModule,]
})
export class OrderTypeModule {}
